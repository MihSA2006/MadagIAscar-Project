import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ChecklistAIService } from './checklist-ai.service';
import { CreateChecklistAIDto } from './dto/create-checklist-ai.dto';
import { UpdateChecklistAIDto } from './dto/update-checklist-ai.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/jwt.strategy';

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('checklist-ai')
@UseGuards(JwtAuthGuard)
export class ChecklistAIController {
    constructor(private readonly checklistAiService: ChecklistAIService) { }

    @Post()
    create(@Request() req: RequestWithUser, @Body() createChecklistAIDto: CreateChecklistAIDto) {
        return this.checklistAiService.create(req.user.userId, createChecklistAIDto);
    }

    @Get()
    findAll(@Request() req: RequestWithUser) {
        return this.checklistAiService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
        return this.checklistAiService.findOne(req.user.userId, id);
    }

    @Patch(':id')
    update(
        @Request() req: RequestWithUser,
        @Param('id') id: string,
        @Body() updateChecklistAIDto: UpdateChecklistAIDto,
    ) {
        return this.checklistAiService.update(req.user.userId, id, updateChecklistAIDto);
    }

    @Delete(':id')
    remove(@Request() req: RequestWithUser, @Param('id') id: string) {
        return this.checklistAiService.remove(req.user.userId, id);
    }
}
