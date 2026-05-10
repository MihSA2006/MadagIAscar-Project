import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
// import { MarketModule } from './market/market.module';
import { ChecklistAIModule } from './checklist-ai/checklist-ai.module';
import { MessageModule } from './message/message.module';
import { AgendaModule } from './agenda/agenda.module';
import { ChatAiModule } from './chat-ai/chat-ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuration MySQL(XAMPP)
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   port: parseInt(process.env.DATABASE_PORT || '3306'),
    //   username: process.env.DATABASE_USER,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   autoLoadEntities: true,
    //   synchronize: true, // Désactiver en production
    // }),


    // Configuration Postgres (Commentée)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),


    UserModule,
    AuthModule,
    ChecklistAIModule,
    MessageModule,
    AgendaModule,
    ChatAiModule,
    // MarketModule,
  ],
})
export class AppModule { }