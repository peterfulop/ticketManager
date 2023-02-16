/* eslint-disable */
import * as Types from '../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyTicketsQueryVariables = Types.Exact<{
  input?: Types.InputMaybe<Types.SearchTicketInput>;
}>;


export type GetMyTicketsQuery = { __typename?: 'Query', getMyTickets: { __typename?: 'TicketsPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, tickets?: Array<{ __typename?: 'Ticket', id: string, projectId: string, title: string, comment?: string | null, priority: Types.TicketPriority, storyPoints?: number | null, type: Types.TicketType, description?: string | null, status: Types.TicketStatus, references?: Array<string | null> | null, sequenceId: string, createdAt?: string | null, updatedAt?: string | null }> | null } };

export type GetTicketQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetTicketQuery = { __typename?: 'Query', getTicket: { __typename?: 'TicketPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, ticket?: { __typename?: 'Ticket', id: string, projectId: string, title: string, comment?: string | null, priority: Types.TicketPriority, storyPoints?: number | null, type: Types.TicketType, description?: string | null, status: Types.TicketStatus, references?: Array<string | null> | null, sequenceId: string, createdAt?: string | null, updatedAt?: string | null } | null } };

export type TicketCreateMutationVariables = Types.Exact<{
  input: Types.TicketCreateInput;
}>;


export type TicketCreateMutation = { __typename?: 'Mutation', ticketCreate: { __typename?: 'TicketPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, ticket?: { __typename?: 'Ticket', id: string, projectId: string, title: string, description?: string | null, comment?: string | null, priority: Types.TicketPriority, type: Types.TicketType, storyPoints?: number | null, status: Types.TicketStatus, sequenceId: string, references?: Array<string | null> | null, createdAt?: string | null, updatedAt?: string | null } | null } };

export type TicketDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type TicketDeleteMutation = { __typename?: 'Mutation', ticketDelete: { __typename?: 'TicketDeletePayload', success?: boolean | null, userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }> } };

export type TicketUpdateMutationVariables = Types.Exact<{
  input: Types.TicketUpdateInput;
}>;


export type TicketUpdateMutation = { __typename?: 'Mutation', ticketUpdate: { __typename?: 'TicketPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, ticket?: { __typename?: 'Ticket', id: string, projectId: string, title: string, description?: string | null, comment?: string | null, priority: Types.TicketPriority, status: Types.TicketStatus, references?: Array<string | null> | null, createdAt?: string | null, updatedAt?: string | null } | null } };

export type TicketStatusUpdateMutationVariables = Types.Exact<{
  input: Types.TicketStatusUpdateInput;
}>;


export type TicketStatusUpdateMutation = { __typename?: 'Mutation', ticketStatusUpdate: { __typename?: 'TicketPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, ticket?: { __typename?: 'Ticket', id: string, projectId: string, title: string, description?: string | null, comment?: string | null, priority: Types.TicketPriority, status: Types.TicketStatus, references?: Array<string | null> | null, createdAt?: string | null, updatedAt?: string | null } | null } };


export const GetMyTicketsDocument = gql`
    query GetMyTickets($input: SearchTicketInput) {
  getMyTickets(input: $input) {
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
      storyPoints
      type
      description
      status
      references
      sequenceId
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
 *      input: // value for 'input'
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
export const GetTicketDocument = gql`
    query GetTicket($id: ID!) {
  getTicket(id: $id) {
    userErrors {
      message
      values
    }
    ticket {
      id
      projectId
      title
      comment
      priority
      storyPoints
      type
      description
      status
      references
      sequenceId
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
 *      id: // value for 'id'
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
export const TicketCreateDocument = gql`
    mutation TicketCreate($input: TicketCreateInput!) {
  ticketCreate(input: $input) {
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
      type
      storyPoints
      status
      sequenceId
      references
      createdAt
      updatedAt
    }
  }
}
    `;
export type TicketCreateMutationFn = Apollo.MutationFunction<TicketCreateMutation, TicketCreateMutationVariables>;

/**
 * __useTicketCreateMutation__
 *
 * To run a mutation, you first call `useTicketCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketCreateMutation, { data, loading, error }] = useTicketCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTicketCreateMutation(baseOptions?: Apollo.MutationHookOptions<TicketCreateMutation, TicketCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TicketCreateMutation, TicketCreateMutationVariables>(TicketCreateDocument, options);
      }
export type TicketCreateMutationHookResult = ReturnType<typeof useTicketCreateMutation>;
export type TicketCreateMutationResult = Apollo.MutationResult<TicketCreateMutation>;
export type TicketCreateMutationOptions = Apollo.BaseMutationOptions<TicketCreateMutation, TicketCreateMutationVariables>;
export const TicketDeleteDocument = gql`
    mutation TicketDelete($id: ID!) {
  ticketDelete(id: $id) {
    userErrors {
      message
      values
    }
    success
  }
}
    `;
export type TicketDeleteMutationFn = Apollo.MutationFunction<TicketDeleteMutation, TicketDeleteMutationVariables>;

/**
 * __useTicketDeleteMutation__
 *
 * To run a mutation, you first call `useTicketDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketDeleteMutation, { data, loading, error }] = useTicketDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTicketDeleteMutation(baseOptions?: Apollo.MutationHookOptions<TicketDeleteMutation, TicketDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TicketDeleteMutation, TicketDeleteMutationVariables>(TicketDeleteDocument, options);
      }
export type TicketDeleteMutationHookResult = ReturnType<typeof useTicketDeleteMutation>;
export type TicketDeleteMutationResult = Apollo.MutationResult<TicketDeleteMutation>;
export type TicketDeleteMutationOptions = Apollo.BaseMutationOptions<TicketDeleteMutation, TicketDeleteMutationVariables>;
export const TicketUpdateDocument = gql`
    mutation TicketUpdate($input: TicketUpdateInput!) {
  ticketUpdate(input: $input) {
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
export type TicketUpdateMutationFn = Apollo.MutationFunction<TicketUpdateMutation, TicketUpdateMutationVariables>;

/**
 * __useTicketUpdateMutation__
 *
 * To run a mutation, you first call `useTicketUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketUpdateMutation, { data, loading, error }] = useTicketUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTicketUpdateMutation(baseOptions?: Apollo.MutationHookOptions<TicketUpdateMutation, TicketUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TicketUpdateMutation, TicketUpdateMutationVariables>(TicketUpdateDocument, options);
      }
export type TicketUpdateMutationHookResult = ReturnType<typeof useTicketUpdateMutation>;
export type TicketUpdateMutationResult = Apollo.MutationResult<TicketUpdateMutation>;
export type TicketUpdateMutationOptions = Apollo.BaseMutationOptions<TicketUpdateMutation, TicketUpdateMutationVariables>;
export const TicketStatusUpdateDocument = gql`
    mutation TicketStatusUpdate($input: TicketStatusUpdateInput!) {
  ticketStatusUpdate(input: $input) {
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
export type TicketStatusUpdateMutationFn = Apollo.MutationFunction<TicketStatusUpdateMutation, TicketStatusUpdateMutationVariables>;

/**
 * __useTicketStatusUpdateMutation__
 *
 * To run a mutation, you first call `useTicketStatusUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTicketStatusUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ticketStatusUpdateMutation, { data, loading, error }] = useTicketStatusUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTicketStatusUpdateMutation(baseOptions?: Apollo.MutationHookOptions<TicketStatusUpdateMutation, TicketStatusUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TicketStatusUpdateMutation, TicketStatusUpdateMutationVariables>(TicketStatusUpdateDocument, options);
      }
export type TicketStatusUpdateMutationHookResult = ReturnType<typeof useTicketStatusUpdateMutation>;
export type TicketStatusUpdateMutationResult = Apollo.MutationResult<TicketStatusUpdateMutation>;
export type TicketStatusUpdateMutationOptions = Apollo.BaseMutationOptions<TicketStatusUpdateMutation, TicketStatusUpdateMutationVariables>;