import { Module } from '@nestjs/common';
import { DataInitService } from './data-init.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../../model/category/category.entity';
import { Answer } from '../../model/answer/answer.entity';
import { Question } from '../../model/question/question.entity';
import { Difficulty } from '../../model/difficulty/difficulty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Question,
      Answer,
      Category,
      Difficulty
    ])
  ],
  providers: [DataInitService],
  exports: [DataInitService]
})
export class DataInitModule {}
