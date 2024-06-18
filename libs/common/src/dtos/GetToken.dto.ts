import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Length, } from "class-validator";

export class GetTokenDto {
    @ApiProperty({ example: 'Your Name (4-20 in length)', required: true})
    @IsNotEmpty()
    @IsString()
    @Length(4, 20) 
    username: string;

    @ApiProperty({ example: '97ddbc98-1f6f-449b-b871-683c90efcfe3', required: true})
    @IsUUID()
    accessKey: string;

    @ApiProperty({ example: '1234', required: true})
    @IsNumber()
    tokenId: number;
}