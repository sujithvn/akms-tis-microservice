import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional,  IsUUID, Min } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: '97ddbc98-1f6f-449b-b871-683c90efcfe3', required: true})
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @ApiProperty({ example: '20', required: false})
    @IsOptional()
    @IsNumber()
    @Min(1)
    reqPerMin?: number;

    @ApiProperty({ example: "2024-06-19T12:00:00.000Z", required: false})
    @IsOptional()
    @IsDateString()
    keyExpireAt?: Date;
}


