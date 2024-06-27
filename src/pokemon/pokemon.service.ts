import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { paginationDto } from 'src/common/dto/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {

  private defaultLimit: number 

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService,

  ) {

    this.defaultLimit = configService.get<number>('defaultLimit')
  
  }


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }

  }

  findAll( paginationDto: paginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto
    // const pokemons: Pokemon[] = this.pokemonModel.finAll();
    return this.pokemonModel.find()
    .limit( limit )
    .skip( offset )
    .sort({
      no: 1
    })
    .select('-__v')
  }

  async findOne(terminoBusqueda: string) {

    let pokemon: Pokemon

    // By No
    if ( !isNaN(+terminoBusqueda) ) {
      pokemon = await this.pokemonModel.findOne({ no: terminoBusqueda });
    }

    // By Mongo ID
    if ( !pokemon && isValidObjectId(terminoBusqueda) ) {
      pokemon = await this.pokemonModel.findById(terminoBusqueda);
    }

    // By Name
    if ( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: terminoBusqueda.toLowerCase().trim() });
    }

    if ( !pokemon )
    throw new NotFoundException (
      `Pokemon with id, no or name "${ terminoBusqueda }" not found`
    )

    return pokemon;
  }

  async update(terminoBusqueda: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(terminoBusqueda);

    if (updatePokemonDto.name)  {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
    } catch (error) {
      this.handleExceptions(error);
    }
    
    return { ...pokemon.toJSON(), ...updatePokemonDto };
  }

  async remove(id: string) {

    // const pokemon = await this.findOne(id);

    // try {
    //   await pokemon.deleteOne();
    // } catch (error) {
    //   this.handleExceptions(error);
    // }

    // const result = await this.pokemonModel.findByIdAndDelete( id );

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if ( deletedCount === 0 ) {
      throw new NotFoundException (
        `Pokemon with "id" ${ id } not found`
      )
    }

    return;

  }




  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify(error.keyValue) }`)
    } 
    console.log(error);

    throw new InternalServerErrorException(`Cant update Pokemon - Check Server logs`)
    
  }
}
