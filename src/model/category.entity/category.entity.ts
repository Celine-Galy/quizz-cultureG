import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Question } from "../question/question.entity";

@Entity()
export class Category {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category: string;

    @OneToMany(() => Question, question => question.category)
    questions: Question[];
}
