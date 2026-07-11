import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ?? 'http://localhost:sdadasd/graphql';

const client = new GraphQLClient(endpoint);

export function fetcher<TData, TVariables extends object>(
  document: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers'],
) {
  return async (): Promise<TData> => {
    if (!variables) {
      return client.request<TData>({ document, requestHeaders });
    }

    return client.request<TData>(document, variables as Record<string, unknown>, requestHeaders);
  };
}
