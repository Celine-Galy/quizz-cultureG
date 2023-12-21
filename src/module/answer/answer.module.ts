import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from '../../model/answer/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    Answer
  ])
  ],
  providers: [AnswerService],
  controllers: [AnswerController]
})
export class AnswerModule {}
