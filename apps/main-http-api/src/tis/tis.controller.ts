import { Body, Controller,  HttpException, HttpStatus, Inject, NotFoundException, Post, UnauthorizedException, ValidationPipe, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { GetTokenDto } from "@app/common";
import { lastValueFrom } from "rxjs";
import { ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';

@ApiTags('TokenInformationSystem')
@Controller('tis')
export class TisMicroserviceController {
  constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

  private logger = new Logger(TisMicroserviceController.name);

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully returned.'})
  @ApiResponse({ status: 404, description: 'Username + AccessKey combination not valid.'})
  @ApiResponse({ status: 401, description: 'AccessKey has expired.'})
  @ApiResponse({ status: 429, description: 'Too many API requests.'})
  @ApiBody({ type: GetTokenDto, description: 'This endpoint returns the Token details' })

  async getTokenInfo(@Body(ValidationPipe) getTokenReq: GetTokenDto): Promise<any> {
    try {
      const tokenResponse = await lastValueFrom(this.natsClient.send({ cmd: 'getTokenInfo' }, getTokenReq));
      if (tokenResponse.errorCode) {
        switch (tokenResponse.errorCode) {
          case 1:
            this.logger.error(`Error: Invalid User: ${getTokenReq.username}!`);
            throw new NotFoundException(tokenResponse.errorMessage);
          case 2:
            this.logger.warn(`Warning: User: ${getTokenReq.username} made attempt with expired key!`);
            throw new UnauthorizedException(tokenResponse.errorMessage);
          case 3:
            this.logger.warn(`Warning: User: ${getTokenReq.username} has reached Rate limit!`);
            throw new HttpException(tokenResponse.errorMessage, HttpStatus.TOO_MANY_REQUESTS);
          default:
            this.logger.error(`Error: Unexpected error occurred while processing request for User: ${getTokenReq.username}!`);
            throw new HttpException(tokenResponse.errorMessage, HttpStatus.BAD_REQUEST);
        }
      }
      this.logger.log(`Info: Token request processed for User: ${getTokenReq.username} with Key: ${getTokenReq.accessKey}`);
      return tokenResponse;
    } catch (error) {
      // this.logger.error(`Warning: Unexpected error occurred while processing request for User: ${getTokenReq.username}!`);
      throw error;
    }
  }
}