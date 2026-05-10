import { IsString, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ChecklistPriority, ChecklistStatus } from '../entities/checklist-ai.entity';

export class CreateChecklistAIDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsEnum(ChecklistPriority)
    @IsOptional()
    priority?: ChecklistPriority;

    @IsDateString()
    @IsOptional()
    deadline?: string;

    @IsEnum(ChecklistStatus)
    @IsOptional()
    status?: ChecklistStatus;
}
