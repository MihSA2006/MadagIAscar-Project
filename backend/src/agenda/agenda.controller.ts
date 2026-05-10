import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AgendaService } from './agenda.service';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserPayload } from '../auth/jwt.strategy';

interface RequestWithUser extends Request {
    user: UserPayload;
}

@Controller('agenda')
@UseGuards(JwtAuthGuard)
export class AgendaController {
    constructor(private readonly agendaService: AgendaService) { }

    @Post()
    create(@Request() req: RequestWithUser, @Body() createAgendaDto: CreateAgendaDto) {
        return this.agendaService.create(req.user.userId, createAgendaDto);
    }

    @Get()
    findAll(@Request() req: RequestWithUser) {
        return this.agendaService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Request() req: RequestWithUser, @Param('id') id: string) {
        return this.agendaService.findOne(req.user.userId, id);
    }

    @Patch(':id')
    update(
        @Request() req: RequestWithUser,
        @Param('id') id: string,
        @Body() updateAgendaDto: UpdateAgendaDto,
    ) {
        return this.agendaService.update(req.user.userId, id, updateAgendaDto);
    }

    @Delete(':id')
    remove(@Request() req: RequestWithUser, @Param('id') id: string) {
        return this.agendaService.remove(req.user.userId, id);
    }
}
