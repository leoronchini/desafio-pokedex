import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PokemonEntity } from './controller/entity/pokemon.entity';
import { PokemonController } from './controller/pokemon.controller';
import { PokemonRepository } from './controller/repository/pokemon.repository';
import { PokemonService } from './service/pokemon.service';

@Module({
  imports: [TypeOrmModule.forFeature([PokemonEntity]), HttpModule],
  controllers: [PokemonController],
  providers: [PokemonService, PokemonRepository],
})
export class PokemonModule {}
