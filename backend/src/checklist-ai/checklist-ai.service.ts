import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChecklistAI, ChecklistPriority, ChecklistStatus } from './entities/checklist-ai.entity';
import { BusinessPlan } from './entities/business-plan.entity';
import { CreateChecklistAIDto } from './dto/create-checklist-ai.dto';
import { UpdateChecklistAIDto } from './dto/update-checklist-ai.dto';

@Injectable()
export class ChecklistAIService {
    constructor(
        @InjectRepository(ChecklistAI)
        private checklistRepository: Repository<ChecklistAI>,
        @InjectRepository(BusinessPlan)
        private businessPlanRepository: Repository<BusinessPlan>,
    ) { }

    async saveBusinessPlanAndTasks(userId: string, planContent: string, tasks: any[]) {
        console.log(`[ChecklistAIService] Starting saveBusinessPlanAndTasks for user: ${userId}`);
        console.log(`[ChecklistAIService] Raw tasks data received: ${JSON.stringify(tasks, null, 2)}`);

        // Save business plan
        let plan: BusinessPlan | null = null;
        if (planContent) {
            console.log(`[ChecklistAIService] Saving business plan content (length: ${planContent.length})`);
            const newPlan = this.businessPlanRepository.create({
                content: planContent,
                userId,
            });
            plan = await this.businessPlanRepository.save(newPlan);
            console.log(`[ChecklistAIService] Business plan saved successfully. ID: ${plan.id}`);
        } else {
            console.log(`[ChecklistAIService] No business plan content provided.`);
        }

        // Save tasks
        if (tasks && tasks.length > 0) {
            console.log("**************")
            console.log(`[ChecklistAIService] Saving ${tasks.length} tasks...`);
            const checklistItems = tasks.map((t, index) => {
                let priority = ChecklistPriority.MEDIUM;

                // Handle Malagasy priority terms from AI
                const p = String(t.priorite).toLowerCase();
                if (p === 'avo' || p === 'haute') priority = ChecklistPriority.HIGH;
                if (p === 'ambany' || p === 'basse') priority = ChecklistPriority.LOW;
                if (p === 'antonony') priority = ChecklistPriority.MEDIUM;

                console.log(`[ChecklistAIService] Mapping task ${index + 1}: "${t.tache}" - Priority: ${p} -> ${priority}`);

                let status = ChecklistStatus.TODO;
                const s = String(t.statut || '').toLowerCase();
                if (s.includes('vita') || s.includes('termin')) status = ChecklistStatus.DONE;
                else if (s.includes('andeha') || s.includes('cours')) status = ChecklistStatus.IN_PROGRESS;
                else status = ChecklistStatus.TODO;

                return this.checklistRepository.create({
                    userId,
                    title: t.tache || `Task ${index + 1}`,
                    priority: priority,
                    status: status,
                    description: t.conseil_ia || t.description || '', // Use conseil_ia if available
                    deadline: t.deadline_jours ? new Date(Date.now() + t.deadline_jours * 24 * 60 * 60 * 1000) : undefined,
                });
            });

            const savedTasks = await this.checklistRepository.save(checklistItems);
            console.log(`[ChecklistAIService] ${savedTasks.length} tasks saved successfully in DB.`);
        } else {
            console.log(`[ChecklistAIService] No tasks provided in the 'tasks' array.`);
        }

        return plan;
    }

    async create(userId: string, createChecklistAIDto: CreateChecklistAIDto): Promise<ChecklistAI> {
        const newItem = this.checklistRepository.create({
            ...createChecklistAIDto,
            userId,
        });
        return await this.checklistRepository.save(newItem);
    }

    async findAll(userId: string): Promise<ChecklistAI[]> {
        return await this.checklistRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
        });
    }

    async findOne(userId: string, id: string): Promise<ChecklistAI> {
        const item = await this.checklistRepository.findOne({
            where: { id, userId },
        });
        if (!item) {
            throw new NotFoundException(`Checklist item with ID ${id} not found`);
        }
        return item;
    }

    async update(userId: string, id: string, updateChecklistAIDto: UpdateChecklistAIDto): Promise<ChecklistAI> {
        const item = await this.findOne(userId, id);
        const updatedItem = Object.assign(item, updateChecklistAIDto);
        return await this.checklistRepository.save(updatedItem);
    }

    async remove(userId: string, id: string): Promise<void> {
        const item = await this.findOne(userId, id);
        await this.checklistRepository.remove(item);
    }
}
