import { Injectable } from '@nestjs/common';
import { Difficulty } from '../../model/difficulty/difficulty.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DifficultyService {

    constructor(
        @InjectRepository(Difficulty)
        private readonly difficultyRepository: Repository<Difficulty>
    ) { }

    async findAll(): Promise<Difficulty[]> {
        return await this.difficultyRepository.find();
    }
}
