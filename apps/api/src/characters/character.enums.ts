import { registerEnumType } from '@nestjs/graphql';

export enum CharacterStatus {
  ALIVE = 'ALIVE',
  DEAD = 'DEAD',
  UNKNOWN = 'UNKNOWN',
}

export enum CharacterGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  UNKNOWN = 'UNKNOWN',
}

registerEnumType(CharacterStatus, {
  name: 'CharacterStatus',
  description: 'Whether a character is alive, dead, or has an unknown status.',
});

registerEnumType(CharacterGender, {
  name: 'CharacterGender',
  description: 'The reported gender of a character.',
});

