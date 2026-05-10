import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChecklistAIService } from '../checklist-ai/checklist-ai.service';

@Injectable()
export class MessageService {
    private readonly webhookUrl: string;

    constructor(
        private readonly configService: ConfigService,
        private readonly checklistAIService: ChecklistAIService,
    ) {
        const baseUrl = this.configService.get<string>('AI_BASE_URL');
        if (!baseUrl) {
            throw new Error('AI_BASE_URL is not defined in environment variables');
        }
        this.webhookUrl = `${baseUrl.replace(/\/$/, '')}/webhook-test/question`;
    }

    async sendMessage(userId: string, message: string) {
        console.log(`[MessageService] Received message from user ${userId}: "${message}"`);
        try {
            console.log(`[MessageService] Forwarding to n8n webhook: ${this.webhookUrl}`);

            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    session_id: userId,
                    message: message,
                }),
            });

            console.log(`[MessageService] n8n response status: ${response.status} ${response.statusText}`);
            const responseText = await response.text();

            if (!response.ok) {
                console.error(`[MessageService] n8n error response: ${responseText}`);
                throw new Error(`AI Webhook returned error ${response.status}: ${responseText}`);
            }

            console.log(`[MessageService] n8n raw response: ${responseText}`);

            if (!responseText || responseText.trim() === '') {
                console.warn('[MessageService] Received empty response from n8n');
                return { message: 'Success (empty body)', status: response.status };
            }

            try {
                const data = JSON.parse(responseText);
                console.log(`[MessageService] Successfully parsed JSON. termine: ${data.termine}`);

                // If the process is finished (termine: true), save the business plan and tasks
                if (data.termine === true && data.data) {
                    console.log('[MessageService] "termine" is true. Triggering storage of business plan and tasks...');
                    try {
                        const planContent = data.data.plan_etapes?.texte_brut;
                        const tasks = data.data.checklist?.taches || [];

                        console.log(`[MessageService] Data to save: Plan length: ${planContent?.length || 0}, Tasks: ${tasks.length}`);

                        if (planContent || tasks.length > 0) {
                            await this.checklistAIService.saveBusinessPlanAndTasks(userId, planContent, tasks);
                            console.log('[MessageService] ChecklistAIService.saveBusinessPlanAndTasks completed successfully');
                        } else {
                            console.log('[MessageService] No content-to-save found in data');
                        }
                    } catch (saveError) {
                        console.error('[MessageService] Error during automatic saving:', saveError);
                    }
                }

                return data;
            } catch (e) {
                console.warn('[MessageService] AI Webhook response is not valid JSON. Returning raw text.');
                return { message: responseText };
            }
        } catch (error) {
            console.error('[MessageService] Critical error in sendMessage:', error);
            throw new InternalServerErrorException('Failed to communicate with AI service');
        }
    }
}
