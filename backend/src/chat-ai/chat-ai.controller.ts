import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ChatAiService } from './chat-ai.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/jwt.strategy';

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('chat-ai')
@UseGuards(JwtAuthGuard)
export class ChatAiController {
    constructor(private readonly chatAiService: ChatAiService) { }

    @Get()
    async getChatHistory(@Request() req: RequestWithUser) {
        return this.chatAiService.getChatHistory(req.user.userId);
    }

    @Post()
    async sendMessage(@Request() req: RequestWithUser, @Body('message') message: string) {
        return this.chatAiService.sendMessage(req.user.userId, message);
    }
}

