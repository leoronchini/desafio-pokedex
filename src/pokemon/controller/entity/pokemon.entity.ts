import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class PokemonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  name: string;

  @Column()
  @MinLength(1)
  @IsString()
  link: string;

  constructor(name: string, link: string) {
    this.name = name;
    this.link = link;
  }
}
