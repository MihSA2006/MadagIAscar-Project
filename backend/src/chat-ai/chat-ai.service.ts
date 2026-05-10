import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage, SenderType } from './entities/chat-message.entity';

@Injectable()
export class ChatAiService {
    constructor(
        @InjectRepository(ChatMessage)
        private chatMessageRepository: Repository<ChatMessage>,
    ) { }

    async getChatHistory(userId: string): Promise<ChatMessage[]> {
        return this.chatMessageRepository.find({
            where: { userId },
            order: { createdAt: 'ASC' },
        });
    }

    async sendMessage(userId: string, content: string): Promise<{ userMessage: ChatMessage, aiMessage: ChatMessage }> {
        try {
            // 1. Save user message
            const userMessage = this.chatMessageRepository.create({
                userId,
                sender: SenderType.USER,
                content,
            });
            await this.chatMessageRepository.save(userMessage);

            // 2. Contact n8n Webhook using native fetch API
            const n8nUrl = 'https://datazara.app.n8n.cloud/webhook/chatbot';

            const response = await fetch(n8nUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: content,
                    // session_id: userId,
                }),
            });

            if (!response.ok) {
                const errText = await response.text();
                throw new Error(`Erreur réseau: ${response.status} ${response.statusText} - ${errText}`);
            }

            const responseText = await response.text();
            let responseData;
            try {
                responseData = JSON.parse(responseText);
            } catch (e) {
                responseData = responseText;
            }

            // Extract message from n8n response safely.
            let aiContent = 'Tsy nahazo valiny avy amin’ny IA (No response).';

            if (responseData) {
                if (typeof responseData === 'string') {
                    aiContent = responseData;
                } else if (Array.isArray(responseData) && responseData.length > 0) {
                    aiContent = responseData[0]?.message || responseData[0]?.text || responseData[0]?.output || JSON.stringify(responseData[0]);
                } else {
                    aiContent = responseData.message || responseData.text || responseData.output || responseData.response || JSON.stringify(responseData);
                }
            }

            // 3. Save AI message
            const aiMessage = this.chatMessageRepository.create({
                userId,
                sender: SenderType.AI,
                content: aiContent,
            });
            await this.chatMessageRepository.save(aiMessage);

            return { userMessage, aiMessage };
        } catch (error) {
            console.error('Error in ChatAiService.sendMessage:', error);
            throw new InternalServerErrorException(`Tsy afaka nifandray tamin'ny AI. antsipiriany: ${error.message}`);
        }
    }
}
