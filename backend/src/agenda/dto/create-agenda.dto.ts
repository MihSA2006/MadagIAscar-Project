import { IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateAgendaDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsString()
    @IsOptional()
    location?: string;

    @IsString()
    @IsOptional()
    category?: string;
}
