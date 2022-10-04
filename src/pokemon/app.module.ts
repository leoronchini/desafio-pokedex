import { Module } from '@nestjs/common';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonService } from './service/pokemon.service';

@Module({
  imports: [],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class AppModule {}
