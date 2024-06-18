import { BadRequestException, Body, Controller, Delete, Get, Inject, NotFoundException, Param, ParseUUIDPipe, Patch, Post, ValidationPipe } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UpdateUserDto, CreateUserDto, DeleteKeyUserDto } from "@app/common";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('KeyManagementSystem')
@Controller('kms')
export class KmsMicroserviceController {
	constructor(@Inject('NATS_SERVICE') private natsClient: ClientProxy) {}

	@Post()
	async createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
		try {
			const createdUser = await lastValueFrom(this.natsClient.send({ cmd: 'createUser' }, createUserDto));
			this.natsClient.emit('onUserCreated', createdUser);
			return createdUser;
		} catch (error) {
			throw new BadRequestException();
		}
	}

	@Patch()
	async updateUser(@Body(ValidationPipe) updateUser: UpdateUserDto) {
		try {
			const updatedUser = await lastValueFrom(this.natsClient.send({ cmd: 'updateUser' }, updateUser));
			this.natsClient.emit('onUserUpdated', updatedUser);
			return updatedUser;
		} catch (error) {
			throw new NotFoundException('User not found');
		}
	}

	@Delete()
	async deleteUser(@Body(ValidationPipe) deleteUserDto: DeleteKeyUserDto) {
		try {
			const deletedUser = await lastValueFrom(this.natsClient.send({ cmd: 'deleteUser' }, deleteUserDto));
			this.natsClient.emit('onUserDeleted', {userId: deleteUserDto.userId});
			return {userId: deleteUserDto.userId};
		} catch (error) {
			throw new NotFoundException('User not found');
		}
	}

	@Get()
	getAllUsers() {
		const allUsers = this.natsClient.send({ cmd: 'getAllUsers' }, {});
		return allUsers;
	}

	@Get(':userId')
	async getUserById(@Param('userId', ParseUUIDPipe) userId: string){
		try {
			const user = await lastValueFrom(this.natsClient.send({ cmd: 'getUserById' }, userId));
			return user;
		} catch (error) {
			throw new NotFoundException('User not found');
		}
	}

	@Post('/deactivate')
	async deactivateUserByKey(@Body(ValidationPipe) deactivateKeyByUser: DeleteKeyUserDto) {
		try {
			const user = await lastValueFrom(this.natsClient.send({ cmd: 'deactivateKeyByUser' }, deactivateKeyByUser));
			return user;
		} catch (error) {
			throw new NotFoundException('User not found');
		}
	}

	@Post('/activate')
	async activateUserByKey(@Body(ValidationPipe) activateKeyByUser: DeleteKeyUserDto) {
		try {
			const user = await lastValueFrom(this.natsClient.send({ cmd: 'activateKeyByUser' }, activateKeyByUser));
			return user;
		} catch (error) {
			throw new NotFoundException('User not found');
		}
	}
}
