import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccessKeys } from './entities/access-keys.entity';
import { UpdateUserDto, CreateUserDto, DeleteKeyUserDto } from "@app/common";

@Injectable()
export class KeyManageServiceService {
  constructor(
    @InjectRepository(AccessKeys) private accessKeysRepository: Repository<AccessKeys>
  ) {} 

  async getAllUsers() {
    return await this.accessKeysRepository.find();
  }

  async getUserById(userId: string) {
    const foundUser = await this.accessKeysRepository.findOne({ where: { userId }});
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }

  async getUserByIdAndKey(userIdAndKey: DeleteKeyUserDto) {
    const foundUser = await this.accessKeysRepository.findOne({ where: { ...userIdAndKey }});
    if (!foundUser) {
      throw new Error('User not found');
    }
    return foundUser;
  }

  async createUser(createUserDto: CreateUserDto) {
      const newUser = this.accessKeysRepository.create(createUserDto);  
      const userCreated = await this.accessKeysRepository.save(newUser);
      return userCreated;
  }

  async updateUser(updateUserDto: UpdateUserDto) {
      const user = await this.getUserById(updateUserDto.userId);
      if (!user || user === null || user === undefined) {
          throw new Error('User not found');
      }
      Object.assign(user, updateUserDto);
      return await this.accessKeysRepository.save(user);
  }

  async deleteUser(deleteKeyUserDto: DeleteKeyUserDto) {
    try{
      const user = await this.getUserByIdAndKey(deleteKeyUserDto);
      return await this.accessKeysRepository.remove(user);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async deactivateKeyByUser(deactivateKeyUserDto: DeleteKeyUserDto) {
    try{
      const user = await this.getUserByIdAndKey(deactivateKeyUserDto);
      user.isActive = false;
      return await this.accessKeysRepository.save(user);
    } catch (error) {
      throw new Error('User not found');
    }
  }

  async activateKeyByUser(activateKeyUserDto: DeleteKeyUserDto) {
    try{
      const user = await this.getUserByIdAndKey(activateKeyUserDto);
      user.isActive = true;
      return await this.accessKeysRepository.save(user);
    } catch (error) {
      throw new Error('User not found');
    }
  }

}
