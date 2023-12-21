import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../question/question.entity";

@Entity()
export class Difficulty {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    difficulty: string;

    @Column()
    value: number;

    @ManyToOne(() => Question, question => question.difficulty)
    questions: Question[];
}
