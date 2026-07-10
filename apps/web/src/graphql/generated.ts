import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetcher } from '../lib/graphql-client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  description: Scalars['String']['output'];
  gender: CharacterGender;
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: CharacterStatus;
};

export type CharacterFiltersInput = {
  gender?: InputMaybe<CharacterGender>;
  /** Case-insensitive text matched against name and description. */
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<CharacterStatus>;
};

/** The reported gender of a character. */
export enum CharacterGender {
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

/** Whether a character is alive, dead, or has an unknown status. */
export enum CharacterStatus {
  Alive = 'ALIVE',
  Dead = 'DEAD',
  Unknown = 'UNKNOWN'
}

export type Query = {
  __typename?: 'Query';
  /** Returns characters after applying optional server-side filters. */
  characters: Array<Character>;
};


export type QueryCharactersArgs = {
  filters?: InputMaybe<CharacterFiltersInput>;
};

export type CharactersQueryVariables = Exact<{
  filters?: InputMaybe<CharacterFiltersInput>;
}>;


export type CharactersQuery = { __typename?: 'Query', characters: Array<{ __typename?: 'Character', id: string, image: string, name: string, status: CharacterStatus, gender: CharacterGender, description: string }> };



export const CharactersDocument = `
    query Characters($filters: CharacterFiltersInput) {
  characters(filters: $filters) {
    id
    image
    name
    status
    gender
    description
  }
}
    `;

export const useCharactersQuery = <
      TData = CharactersQuery,
      TError = unknown
    >(
      variables?: CharactersQueryVariables,
      options?: Omit<UseQueryOptions<CharactersQuery, TError, TData>, 'queryKey'> & { queryKey?: UseQueryOptions<CharactersQuery, TError, TData>['queryKey'] }
    ) => {
    
    return useQuery<CharactersQuery, TError, TData>(
      {
    queryKey: variables === undefined ? ['Characters'] : ['Characters', variables],
    queryFn: fetcher<CharactersQuery, CharactersQueryVariables>(CharactersDocument, variables),
    ...options
  }
    )};

useCharactersQuery.getKey = (variables?: CharactersQueryVariables) => variables === undefined ? ['Characters'] : ['Characters', variables];


useCharactersQuery.fetcher = (variables?: CharactersQueryVariables, options?: RequestInit['headers']) => fetcher<CharactersQuery, CharactersQueryVariables>(CharactersDocument, variables, options);
