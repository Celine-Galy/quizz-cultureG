import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../model/question/question.entity';
import { Repository } from 'typeorm';
import { Answer } from '../../model/answer/answer.entity';


@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(Question)
        private readonly questionRepository: Repository<Question>
    ) {}

    async findAll(): Promise<Question[]> {
        return await this.questionRepository.find({
            relations: ['answers', 'category', 'difficulty']
        });
    }

    async findOne(_id: number): Promise<Question> {
        return await this.questionRepository.findOne({
            where: { id: _id }
        })
    }

    async create(question: Question) {
        const newQuestion = new Question();
        newQuestion.question = question.question;
        newQuestion.category = question.category;
        newQuestion.difficulty = question.difficulty;
 
        const answer1 = new Answer();
        answer1.answer = question.answers[0].answer;
        answer1.isCorrect = question.answers[0].isCorrect;
        const answer2 = new Answer();
        answer2.answer = question.answers[1].answer;
        answer2.isCorrect = question.answers[1].isCorrect;
        const answer3 = new Answer();
        answer3.answer = question.answers[2].answer;
        answer3.isCorrect = question.answers[2].isCorrect;
        const answer4 = new Answer();
        answer4.answer = question.answers[3].answer;
        answer4.isCorrect = question.answers[3].isCorrect;

        newQuestion.answers = [answer1, answer2, answer3, answer4];
        return await this.questionRepository.save(newQuestion);
    }
}
