import { Args, Query, Resolver } from '@nestjs/graphql';
import { CharacterFiltersInput } from './dto/character-filters.input';
import { Character } from './models/character.model';
import { CharactersService } from './characters.service';

@Resolver(() => Character)
export class CharactersResolver {
  constructor(private readonly charactersService: CharactersService) {}

  @Query(() => [Character], {
    description: 'Returns characters after applying optional server-side filters.',
  })
  characters(
    @Args('filters', { type: () => CharacterFiltersInput, nullable: true })
    filters?: CharacterFiltersInput,
  ): Promise<Character[]> {
    return this.charactersService.findAll(filters);
  }
}

