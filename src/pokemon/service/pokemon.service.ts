import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PokemonDto } from '../controller/dto/pokemon.dto';
import { PokemonRepository } from '../controller/repository/pokemon.repository';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService,
    private readonly pokemonRepository: PokemonRepository
  ) { }


  async getPokemon(name: string): Promise<PokemonDto> {
    const pokemonDto = await this.getPokemonFromDatabase(name);
    if (pokemonDto) {
      console.log(`Pokemon has found on database: ${JSON.stringify(pokemonDto) }`);
      return pokemonDto;
    }
    
    const pokemonResult = await this.getPokemonFromApi(name);
    await this.pokemonRepository.save(pokemonResult);
    console.log(`Pokemon has found on api: ${JSON.stringify(pokemonResult)}`);
    console.log(`Pokemon inserted on database.`);

    return pokemonResult;
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

      return pokemonResult;

    } catch (err) {
      if (err.response.status === 404) {
        throw (`The pokemon "${name}" does not exist on api. Error: ${err.message}`);
      }
      throw (`An error occurred while getting pokemon from api: ${err.message}`);
    }
  }
}