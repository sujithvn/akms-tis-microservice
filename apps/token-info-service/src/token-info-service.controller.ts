import { Controller, Get, Inject } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from "@nestjs/microservices";
import { TokenInfoServiceService } from './token-info-service.service';
import { CreateTisDto, GetTokenDto, UpdateTisFromKmsDto } from "@app/common";

@Controller()
export class TokenInfoServiceController {
  constructor(
    private readonly tokenInfoServiceService: TokenInfoServiceService
  ) {}

  @MessagePattern({ cmd: 'getTokenInfo' })
  async getTokenInfo(@Payload() getTokenReq: GetTokenDto) {
    return await this.tokenInfoServiceService.getTokenInfo(getTokenReq);
  }

  @EventPattern('onUserCreated')
  onUserCreated(@Payload() user: CreateTisDto) {
      return this.tokenInfoServiceService.createTis(user);
  }

  @EventPattern('onUserUpdated')
  onUserUpdated(@Payload() user: UpdateTisFromKmsDto) {
      return this.tokenInfoServiceService.updateTis(user.userId, user);
  }

  @EventPattern('onUserDeleted')
  onUserDeleed(@Payload() userId: string) {
      return this.tokenInfoServiceService.deleteTis(userId);
  }

}
