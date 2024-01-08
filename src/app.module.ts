import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import typeorm from './config/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './module/question/question.module';
import { DataInitModule } from './module/data-init/data-init.module';
import { AnswerModule } from './module/answer/answer.module';
import { CategoryModule } from './module/category/category.module';
import { DifficultyModule } from './module/difficulty/difficulty.module';
import { AuthModule } from './module/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ...configService.get('typeorm'),
      }),
      inject: [ConfigService],
    }),
    DataInitModule,
    QuestionModule,
    AnswerModule,
    CategoryModule,
    DifficultyModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {}
