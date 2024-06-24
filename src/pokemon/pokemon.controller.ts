import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { paginationDto } from 'src/common/dto/pagination.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll( @Query() paginationDto: paginationDto ) {
    
    return this.pokemonService.findAll( paginationDto );
  }

  @Get(':terminoBusqueda')
  findOne(@Param('terminoBusqueda') terminoBusqueda: string) {
    return this.pokemonService.findOne(terminoBusqueda);
  }

  @Patch(':terminoBusqueda')
  update(@Param('terminoBusqueda') terminoBusqueda: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(terminoBusqueda, updatePokemonDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe ) id: string) {
    return this.pokemonService.remove(id);
  }
}
