import { IsNotEmpty, IsUUID } from "class-validator";

export class DeleteKeyUserDto {
    @IsNotEmpty()
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsUUID()
    accessKey: string;
}


