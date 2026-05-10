import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { MessageService } from './message.service';
import { UserMessageDto } from './dto/user-message.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/jwt.strategy';

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('api/message')
@UseGuards(JwtAuthGuard)
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    async create(@Request() req: RequestWithUser, @Body() userMessageDto: UserMessageDto) {
        return this.messageService.sendMessage(req.user.userId, userMessageDto.message);
    }
}
