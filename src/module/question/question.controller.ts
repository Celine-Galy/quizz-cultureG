import { Controller, Get, Post, Body } from '@nestjs/common';
import { QuestionService } from './question.service';
import { Question } from '../../model/question/question.entity';

@Controller('question')
export class QuestionController {
    constructor(
        private readonly questionService: QuestionService,
    ) {}

    @Get()
    async getQuestions(): Promise<Question[]> {
        return await this.questionService.findAll();
    }

    @Post()
    async createQuestion(@Body() question: Question) {
        return await this.questionService.create(question);
    }
}
