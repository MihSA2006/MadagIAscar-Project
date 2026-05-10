import { PartialType } from '@nestjs/mapped-types';
import { CreateChecklistAIDto } from './create-checklist-ai.dto';

export class UpdateChecklistAIDto extends PartialType(CreateChecklistAIDto) { }
