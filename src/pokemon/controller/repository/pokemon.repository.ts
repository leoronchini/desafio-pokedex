import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonDto } from '../dto/pokemon.dto';
import { PokemonEntity } from '../entity/pokemon.entity';

@Injectable()
export class PokemonRepository {
    constructor(
        @InjectRepository(PokemonEntity)
        private pokemonRepository: Repository<PokemonEntity>,
    ) { }

    async save(pokemon: PokemonDto) {
        await this.pokemonRepository.save(pokemon);
    }

    async findByName(name: string): Promise<PokemonEntity> {
        return await this.pokemonRepository
            .createQueryBuilder('pokemon')
            .where('pokemon.name = :name', { name })
            .getOne();
    }
}