import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from './entities/agenda.entity';
import { CreateAgendaDto } from './dto/create-agenda.dto';
import { UpdateAgendaDto } from './dto/update-agenda.dto';

@Injectable()
export class AgendaService {
    constructor(
        @InjectRepository(Agenda)
        private agendaRepository: Repository<Agenda>,
    ) { }

    async create(userId: string, createAgendaDto: CreateAgendaDto): Promise<Agenda> {
        const newEntry = this.agendaRepository.create({
            ...createAgendaDto,
            userId,
        });
        return await this.agendaRepository.save(newEntry);
    }

    async findAll(userId: string): Promise<Agenda[]> {
        return await this.agendaRepository.find({
            where: { userId },
            order: { startDate: 'ASC' },
        });
    }

    async findOne(userId: string, id: string): Promise<Agenda> {
        const entry = await this.agendaRepository.findOne({
            where: { id, userId },
        });
        if (!entry) {
            throw new NotFoundException(`Agenda entry with ID ${id} not found`);
        }
        return entry;
    }

    async update(userId: string, id: string, updateAgendaDto: UpdateAgendaDto): Promise<Agenda> {
        const entry = await this.findOne(userId, id);
        const updatedEntry = Object.assign(entry, updateAgendaDto);
        return await this.agendaRepository.save(updatedEntry);
    }

    async remove(userId: string, id: string): Promise<void> {
        const entry = await this.findOne(userId, id);
        await this.agendaRepository.remove(entry);
    }
}
