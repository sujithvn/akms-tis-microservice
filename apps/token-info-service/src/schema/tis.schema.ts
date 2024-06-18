import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TokenInfoServiceDocument = TokenInfoService & Document;

@Schema()
export class TokenInfoService {
  @Prop()
  id: string;

  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  accessKey: string;

  @Prop()
  requestCount: number;

  @Prop()
  reqPerMin: number;

  @Prop()
  keyExpireAt: Date;

  @Prop()
  lastAccessAt: Date;
}

export const TokenInfoServiceSchema = SchemaFactory.createForClass(TokenInfoService);
