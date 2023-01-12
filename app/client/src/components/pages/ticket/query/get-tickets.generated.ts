/* eslint-disable */
import * as Types from '../../../../apollo/graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetTicketQueryVariables = Types.Exact<{
  getTicketId: Types.Scalars['ID'];
}>;


export type GetTicketQuery = { __typename?: 'Query', getTicket: { __typename?: 'TicketPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, ticket?: { __typename?: 'Ticket', id: string, projectId: string, title: string, description?: string | null, comment?: string | null, priority: Types.TicketPriority, status: Types.TicketStatus, references?: Array<string | null> | null, createdAt?: string | null, updatedAt?: string | null } | null } };


export const GetTicketDocument = gql`
    query GetTicket($getTicketId: ID!) {
  getTicket(id: $getTicketId) {
    userErrors {
      message
      values
    }
    ticket {
      id
      projectId
      title
      description
      comment
      priority
      status
      references
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetTicketQuery__
 *
 * To run a query within a React component, call `useGetTicketQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTicketQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTicketQuery({
 *   variables: {
 *      getTicketId: // value for 'getTicketId'
 *   },
 * });
 */
export function useGetTicketQuery(baseOptions: Apollo.QueryHookOptions<GetTicketQuery, GetTicketQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, options);
      }
export function useGetTicketLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTicketQuery, GetTicketQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTicketQuery, GetTicketQueryVariables>(GetTicketDocument, options);
        }
export type GetTicketQueryHookResult = ReturnType<typeof useGetTicketQuery>;
export type GetTicketLazyQueryHookResult = ReturnType<typeof useGetTicketLazyQuery>;
export type GetTicketQueryResult = Apollo.QueryResult<GetTicketQuery, GetTicketQueryVariables>;