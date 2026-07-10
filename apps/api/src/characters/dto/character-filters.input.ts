import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { CharacterGender, CharacterStatus } from '../character.enums';

@InputType()
export class CharacterFiltersInput {
  @Field(() => CharacterStatus, { nullable: true })
  @IsOptional()
  status?: CharacterStatus;

  @Field(() => CharacterGender, { nullable: true })
  @IsOptional()
  gender?: CharacterGender;

  @Field(() => String, {
    nullable: true,
    description: 'Case-insensitive text matched against name and description.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  search?: string;
}

