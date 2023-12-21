import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../question/question.entity";

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    answer: string;

    @Column()
    isCorrect: boolean;

    @ManyToOne(() => Question, question => question.answers )
    question: Question;
    
}
