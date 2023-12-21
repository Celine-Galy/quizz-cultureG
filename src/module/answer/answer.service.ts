import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from '../../model/answer/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(Answer)
        private readonly answerRepository: Repository<Answer>
    ) {}

    async findAll(): Promise<Answer[]> {
        return await this.answerRepository.find();
    }

    async findOne(_id: number): Promise<Answer> {
        return await this.answerRepository.findOne({
            where: { id: _id }
        })
    }

    async create(answer: Answer) {
        await this.answerRepository.save(answer);
    }

    async update(answer: Answer) {
        await this.answerRepository.update(answer.id, answer);
    }

}
