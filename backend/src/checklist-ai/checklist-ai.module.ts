import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistAIService } from './checklist-ai.service';
import { ChecklistAIController } from './checklist-ai.controller';
import { ChecklistAI } from './entities/checklist-ai.entity';
import { BusinessPlan } from './entities/business-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistAI, BusinessPlan])],
  controllers: [ChecklistAIController],
  providers: [ChecklistAIService],
  exports: [ChecklistAIService],
})
export class ChecklistAIModule { }
