import { IsString, IsNotEmpty } from 'class-validator';

export class UserMessageDto {
    @IsString()
    @IsNotEmpty()
    message: string;
}
