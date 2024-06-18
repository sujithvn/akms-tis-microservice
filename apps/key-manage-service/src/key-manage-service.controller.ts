import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KeyManageServiceService } from './key-manage-service.service';
import { UpdateUserDto, CreateUserDto, DeleteKeyUserDto } from "@app/common";

@Controller()
export class KeyManageServiceController {
  constructor(private readonly keyManageServiceService: KeyManageServiceService) {}

  @MessagePattern({ cmd: 'createUser' })
  createUser(@Payload() data: CreateUserDto){
    return this.keyManageServiceService.createUser(data);
  }

  @MessagePattern({ cmd: 'getAllUsers' })
  getAllUsers(){
    return this.keyManageServiceService.getAllUsers();
  }
  
  @MessagePattern({ cmd: 'getUserById' })
  getUserById(@Payload() data: string){
    return this.keyManageServiceService.getUserById(data);
  }

  @MessagePattern({ cmd: 'updateUser' })
  updateUser(@Payload() data: UpdateUserDto){
    return this.keyManageServiceService.updateUser(data);
  }

  @MessagePattern({ cmd: 'deleteUser' })
  deleteUser(@Payload() data: DeleteKeyUserDto){
    return this.keyManageServiceService.deleteUser(data);
  }

  @MessagePattern({ cmd: 'deactivateKeyByUser' })
  deactivateKeyByUser(@Payload() data: DeleteKeyUserDto){
    return this.keyManageServiceService.deactivateKeyByUser(data);
  }

  @MessagePattern({ cmd: 'activateKeyByUser' })
  activateKeyByUser(@Payload() data: DeleteKeyUserDto){
    return this.keyManageServiceService.activateKeyByUser(data);
  }
}
