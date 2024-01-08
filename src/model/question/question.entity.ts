import {
    Column,
    Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
  } from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { Category } from '../category/category.entity';
import { Difficulty } from '../difficulty/difficulty.entity';

@Entity()
export class Question {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

  @ManyToOne(() => Difficulty, difficulty => difficulty.questions)
  difficulty: Difficulty;

  @ManyToOne(() => Category, category => category.questions)
  category: Category;

  @OneToMany(() => Answer, answer => answer.question, { cascade: true })
  answers: Answer[];
}
