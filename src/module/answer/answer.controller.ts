import { Body, Controller, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { Answer } from '../../model/answer/answer.entity';

@Controller('answer')
export class AnswerController {
    constructor(
        private readonly answerService: AnswerService,
    ) {}

    @Post()
    async createAnswer(@Body() answer: Answer) {
        return await this.answerService.create(answer);
    }
}
