import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CharacterGender, CharacterStatus } from '../character.enums';

@ObjectType()
export class Character {
  @Field(() => ID)
  id!: number;

  @Field()
  image!: string;

  @Field()
  name!: string;

  @Field(() => CharacterStatus)
  status!: CharacterStatus;

  @Field(() => CharacterGender)
  gender!: CharacterGender;

  @Field()
  description!: string;
}

