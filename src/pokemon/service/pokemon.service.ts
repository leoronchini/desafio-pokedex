import { Injectable } from '@nestjs/common';
import { PokemonInterface } from '../controller/interface/pokemon.interface';

@Injectable()
export class PokemonService {
  private readonly pokemons: PokemonInterface[] = [];

  getPokemon(): PokemonInterface[] {
    console.log(this.pokemons)
    return this.pokemons;
  }

  createPokemon(pokemon: PokemonInterface) {
    console.log(pokemon);
    this.pokemons.push(pokemon);
  }
}
