import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { TokenInfoService } from './schema/tis.schema';
import { TokenInfoServiceRepository } from './token-info-service.repository';
import { CreateTisDto, GetTokenDto, UpdateTisFromKmsDto, UpdateTisForTokenDto } from "@app/common";


@Injectable()
export class TokenInfoServiceService {
  constructor(private readonly tokenInfoRepository: TokenInfoServiceRepository) {}


  async getTokenInfo(getTokenReq: GetTokenDto): Promise<any> {
    const currentDateTime = new Date();
    const { username, accessKey, tokenId } = getTokenReq;
    
    // get the record for the username and accessKey from the TIS repository
    // if no record found, return an error message
    // if found, get the keyExpiryDate, lastAccessAt, requestCount, reqPerMin from the record
    // compare the current datetime with the keyExpiryDate in the record and if current datetime is greater than keyExpiryDate, return an error message
    // Check the time duration between current datetime and lastAccessAt
    // if the duration is more than 1 minute, reset requestCount=1, update lastAccessAt to current datetime and return the token info
    // if duration is less than 1 minute, check if the requestCount >= reqPerMin. If yes, return error mentioning 'rate limited'
    // if requestCount < reqPerMin  increment the requestCount by 1 and return token info
    
    const userInfoFromDb = await this.getTisByIdName(username, accessKey);
    if (!userInfoFromDb) {
      return { errorCode: 1, errorMessage: 'No user found with the given username and accessKey'};
    }
    
    const { keyExpireAt, lastAccessAt, requestCount, reqPerMin } = userInfoFromDb;

    if (currentDateTime > keyExpireAt) {
      return { errorCode: 2, errorMessage: 'AccessKey Expired'};
    }

    const timeDiff = currentDateTime.getTime() - lastAccessAt.getTime();
    const timeDiffInMinutes = timeDiff / 60000;
    if (timeDiffInMinutes > 1) {
      userInfoFromDb.requestCount = 1;
      userInfoFromDb.lastAccessAt = currentDateTime;
      await this.updateTisForToken(userInfoFromDb);
      const finalTokenInfo = { message: 'Returning Token Info', ...getTokenReq}
      return finalTokenInfo;
    }

    if (requestCount >= reqPerMin) {
      return { errorCode: 3, errorMessage: 'You are Rate Limited'};
    }
    
    userInfoFromDb.requestCount = requestCount + 1;
    userInfoFromDb.lastAccessAt = currentDateTime;
    await this.updateTisForToken(userInfoFromDb);
        
    const finalTokenInfo = { message: 'Returning Token Info', ...getTokenReq}
    return finalTokenInfo;
  }

  async getTisByIdName(username: string, accessKey: string): Promise<TokenInfoService> {
    return await this.tokenInfoRepository.findOne({ username, accessKey })
  }

  async getAllTis(): Promise<TokenInfoService[]> {
      return this.tokenInfoRepository.find({});
  }

  async createTis(newTis: CreateTisDto): Promise<TokenInfoService> {
      return this.tokenInfoRepository.create({
          id: uuidv4(),
          lastAccessAt: new Date("1970-01-01T00:00:00.000Z"),
          requestCount: 0,
          ...newTis
      })
  }

  async updateTis(userId: string, tisUpdates: UpdateTisFromKmsDto): Promise<TokenInfoService> {
      // reset the lastAccessAt to 1970 and requestCount to 0 before updating
      const lastAccessAt = new Date("1970-01-01T00:00:00.000Z");
      const requestCount = 0;
      const updateObject = { lastAccessAt, requestCount , ...tisUpdates };
      return this.tokenInfoRepository.findOneAndUpdate({ userId }, updateObject);
  }

  async updateTisForToken(tisUpdates: UpdateTisForTokenDto): Promise<TokenInfoService> {
    return this.tokenInfoRepository.findOneAndUpdate({ username: tisUpdates.username, accessKey: tisUpdates.accessKey }, tisUpdates);
  }

  async deleteTis(userId: string): Promise<TokenInfoService> {
      return this.tokenInfoRepository.findOneAndDelete({ userId });
  }    
}
