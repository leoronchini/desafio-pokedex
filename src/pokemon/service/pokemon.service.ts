import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PokemonEntity } from '../controller/entity/pokemon.entity';
import { PokemonDto } from '../controller/dto/pokemon.dto';
import { PokemonRepository } from '../controller/repository/pokemon.repository';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(PokemonEntity) private pokesEntity: Repository<PokemonEntity>,
    private readonly httpService: HttpService,
    private readonly pokemonRepository: PokemonRepository
  ) { }

  async getAllPokemon(): Promise<PokemonEntity[]> {
    return await this.pokesEntity.find();
  }

  async getPokemon(name: string): Promise<PokemonDto> {
    let pokemonDto: PokemonDto;

    pokemonDto = await this.getPokemonFromDatabase(name);
    if (pokemonDto == null) {
      pokemonDto = await this.getPokemonFromApi(name);
    }

    return pokemonDto;
  }

  async getPokemonFromDatabase(name: string): Promise<PokemonDto> {

    try {
      let pokemonResult: PokemonDto;

      await this.pokemonRepository.findByName(name).then(result => {
        if (!result)
          return null;

        pokemonResult = new PokemonDto(result.name, result.link);
      });

      return pokemonResult;

    } catch (err) {
      throw (`An error occurred while getting pokemon from database: ${err.message}`);
    }
  }

  async getPokemonFromApi(name: string): Promise<PokemonDto> {

    try {
      const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const pokemonName = response.data.name;
      const pokemonLink = response.data.sprites.other['official-artwork'].front_default;
      
      const pokemonResult: PokemonDto = new PokemonDto(pokemonName, pokemonLink);

      await this.savePokemonOnDatabase(pokemonResult);

      return pokemonResult;

    } catch (err) {
      throw (`An error occurred while getting pokemon from api: ${err.message}`);
    }
  }

  async savePokemonOnDatabase(pokemonResult: PokemonDto) {
    try {
      await this.pokemonRepository.save(pokemonResult);
    } catch (err) {
      throw (`An error occurred while saving pokemon on database: ${err.message}`);
    }
  }
}
