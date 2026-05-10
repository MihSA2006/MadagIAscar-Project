import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

import { ChecklistAIModule } from '../checklist-ai/checklist-ai.module';

@Module({
    imports: [ChecklistAIModule],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],
})
export class MessageModule { }
