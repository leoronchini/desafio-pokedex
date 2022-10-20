import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [TypeOrmModule.forRoot(
    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "12345678",
      "database": "pokemon",
      "entities": ["src/**/*.entity{.ts,.js}"],
      "synchronize": true
    }
  ), PokemonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
