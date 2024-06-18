import { IsDate, IsDateString, IsNumber, IsString, IsUUID, Length, Min } from "class-validator";

// This is internal call to the TIS service
export class CreateTisDto {
    @IsUUID()
    userId: string;

    @IsString()
    @Length(4, 20) 
    username: string;

    @IsUUID()
    accessKey: string;

    @IsNumber()
    @Min(1)
    reqPerMin: number;

    @IsDateString()
    keyExpireAt: Date;
}
