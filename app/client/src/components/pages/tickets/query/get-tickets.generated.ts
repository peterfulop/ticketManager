/* eslint-disable */
import * as Types from '../../../../apollo/graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyTicketsQueryVariables = Types.Exact<{
  ticketSearchParams?: Types.InputMaybe<Types.SearchTicketInput>;
}>;


export type GetMyTicketsQuery = { __typename?: 'Query', getMyTickets: { __typename?: 'TicketsPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, tickets?: Array<{ __typename?: 'Ticket', id: string, projectId: string, title: string, comment?: string | null, priority: Types.TicketPriority, type: Types.TicketType, status: Types.TicketStatus, references?: Array<string | null> | null, createdAt?: string | null, updatedAt?: string | null }> | null } };


export const GetMyTicketsDocument = gql`
    query GetMyTickets($ticketSearchParams: SearchTicketInput) {
  getMyTickets(input: $ticketSearchParams) {
    userErrors {
      message
      values
    }
    tickets {
      id
      projectId
      title
      comment
      priority
      type
      status
      references
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetMyTicketsQuery__
 *
 * To run a query within a React component, call `useGetMyTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyTicketsQuery({
 *   variables: {
 *      ticketSearchParams: // value for 'ticketSearchParams'
 *   },
 * });
 */
export function useGetMyTicketsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyTicketsQuery, GetMyTicketsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyTicketsQuery, GetMyTicketsQueryVariables>(GetMyTicketsDocument, options);
      }
export function useGetMyTicketsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyTicketsQuery, GetMyTicketsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyTicketsQuery, GetMyTicketsQueryVariables>(GetMyTicketsDocument, options);
        }
export type GetMyTicketsQueryHookResult = ReturnType<typeof useGetMyTicketsQuery>;
export type GetMyTicketsLazyQueryHookResult = ReturnType<typeof useGetMyTicketsLazyQuery>;
export type GetMyTicketsQueryResult = Apollo.QueryResult<GetMyTicketsQuery, GetMyTicketsQueryVariables>;