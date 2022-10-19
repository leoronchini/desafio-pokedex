import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';

@Entity()
export class PokemonEntity extends BaseEntity {
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

}
