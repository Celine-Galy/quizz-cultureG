import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../model/category/category.entity';
import { Repository } from 'typeorm';
import { Question } from '../../model/question/question.entity';
import { Difficulty } from '../../model/difficulty/difficulty.entity';
import { Answer } from '../../model/answer/answer.entity';

@Injectable()
export class DataInitService implements OnModuleInit {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>,
        @InjectRepository(Question)
        private questionRepository: Repository<Question>,
        @InjectRepository(Difficulty)
        private difficultyRepository: Repository<Difficulty>,
        @InjectRepository(Answer)
        private answerRepository: Repository<Answer>,
    ) {}

    onModuleInit() {
        this.initData();
    }

    async createCategoryIfNotExists(category: Category) {
        const categoryExists = await this.categoryRepository.findOne({
            where: { category: category.category }
        });
        if (!categoryExists) {
            await this.categoryRepository.save(category);
        }
    }

    async createDifficultyIfNotExists(difficulty: Difficulty) {
        const difficultyExists = await this.difficultyRepository.findOne({
            where: { difficulty: difficulty.difficulty }
        });
        if (!difficultyExists) {
            await this.difficultyRepository.save(difficulty);
        }
    }

    async createQuestionIfNotExists(question: Question) {
        const questionExists = await this.questionRepository.findOne({
            where: { question: question.question }
        });
        if (!questionExists) {
            await this.questionRepository.save(question);
        }
    }
    async createAnswerIfNotExists(answer: Answer) {
        const answerExists = await this.answerRepository.findOne({
            where: { answer: answer.answer }
        });
        if (!answerExists) {
            await this.answerRepository.save(answer);
        }
    }

    async initData() {
        console.log('DataInitService.initializeData');

        const category1 = new Category();
        category1.category = 'Gastronomie';
        await this.createCategoryIfNotExists(category1);
        const category2 = new Category();
        category2.category = 'Sport';
        await this.createCategoryIfNotExists(category2);
        const category3 = new Category();
        category3.category = 'Société';
        await this.createCategoryIfNotExists(category3);
        const category4 = new Category();
        category4.category = 'Histoire';
        await this.createCategoryIfNotExists(category4);
        const category5 = new Category();
        category5.category = 'Géographie';
        await this.createCategoryIfNotExists(category5);
        const category6 = new Category();
        category6.category = 'Littérature';
        await this.createCategoryIfNotExists(category6);
        const category7 = new Category();
        category7.category = 'Musique';
        await this.createCategoryIfNotExists(category7);
        const category8 = new Category();
        category8.category = 'Cinéma';
        await this.createCategoryIfNotExists(category8);
        const category9 = new Category();
        category9.category = 'Nature';
        await this.createCategoryIfNotExists(category9);
        const category10 = new Category();
        category10.category = 'Sciences';
        await this.createCategoryIfNotExists(category10);
        const category11 = new Category();
        category11.category = 'Star Wars';
        await this.createCategoryIfNotExists(category11);

        const difficulty1 = new Difficulty();
        difficulty1.difficulty = 'Facile';
        await this.createDifficultyIfNotExists(difficulty1);
        const difficulty2 = new Difficulty();
        difficulty2.difficulty = 'Moyen';
        await this.createDifficultyIfNotExists(difficulty2);
        const difficulty3 = new Difficulty();
        difficulty3.difficulty = 'Difficile';
        await this.createDifficultyIfNotExists(difficulty3);

        const question1 = new Question();  
        question1.question = 'Qui est Jean-Baptiste Poquelin ?';
        question1.category = category6;
        question1.difficulty = difficulty1;
        await this.createQuestionIfNotExists(question1);

        const answer1 = new Answer();
        answer1.answer = 'Molière';
        answer1.isCorrect = true;
        answer1.question = question1;
        await this.createAnswerIfNotExists(answer1);
        const answer2 = new Answer();
        answer2.answer = 'Voltaire';
        answer2.isCorrect = false;
        answer2.question = question1;
        await this.createAnswerIfNotExists(answer2);
        const answer3 = new Answer();
        answer3.answer = 'Racine';
        answer3.isCorrect = false;
        answer3.question = question1;
        await this.createAnswerIfNotExists(answer3);
        const answer4 = new Answer();
        answer4.answer = 'Corneille';
        answer4.isCorrect = false;
        answer4.question = question1;
        await this.createAnswerIfNotExists(answer4);

        const question2 = new Question();
        question2.question = 'Quel est le nom du fils de Dark Vador ?';
        question2.category = category11;
        question2.difficulty = difficulty1;
        await this.createQuestionIfNotExists(question2);

        const answer5 = new Answer();
        answer5.answer = 'Luke Skywalker';
        answer5.isCorrect = true;
        answer5.question = question2;
        await this.createAnswerIfNotExists(answer5);
        const answer6 = new Answer();
        answer6.answer = 'Anakin Skywalker';
        answer6.isCorrect = false;
        answer6.question = question2;
        await this.createAnswerIfNotExists(answer6);
        const answer7 = new Answer();
        answer7.answer = 'Leia Skywalker';
        answer7.isCorrect = false;
        answer7.question = question2;
        await this.createAnswerIfNotExists(answer7);
        const answer8 = new Answer();
        answer8.answer = 'Han Solo';
        answer8.isCorrect = false;
        answer8.question = question2;
        await this.createAnswerIfNotExists(answer8);

}
}
