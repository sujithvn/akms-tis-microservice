import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString, Length, Min } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Your Name (4-20 in length)', required: true})
    @IsNotEmpty()
    @IsString()
    @Length(4, 20) 
    username: string;

    @ApiProperty({ example: '20', required: true})
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    reqPerMin: number;

    @ApiProperty({ example: "2024-06-19T12:00:00.000Z", required: true})
    @IsNotEmpty()
    @IsDateString()
    keyExpireAt: Date;
}
