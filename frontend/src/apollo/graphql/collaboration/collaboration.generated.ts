/* eslint-disable */
import * as Types from '../../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetProjectCollaborationsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetProjectCollaborationsQuery = { __typename?: 'Query', getProjectCollaborations: { __typename?: 'ProjectsPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, projects: Array<{ __typename?: 'Project', id: string, name: string, shared: boolean, createdAt?: string | null, updatedAt?: string | null, tickets: Array<{ __typename?: 'Ticket', id: string, status: Types.TicketStatus }> }> } };

export type CollaborationCreateMutationVariables = Types.Exact<{
  input: Types.CollaborationCreateInput;
}>;


export type CollaborationCreateMutation = { __typename?: 'Mutation', collaborationCreate: { __typename?: 'BooleanPayload', success?: boolean | null, userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }> } };

export type CollaborationDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CollaborationDeleteMutation = { __typename?: 'Mutation', collaborationDelete: { __typename?: 'BooleanPayload', success?: boolean | null, userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }> } };


export const GetProjectCollaborationsDocument = gql`
    query GetProjectCollaborations {
  getProjectCollaborations {
    userErrors {
      message
      values
    }
    projects {
      id
      name
      shared
      createdAt
      updatedAt
      tickets {
        id
        status
      }
    }
  }
}
    `;

/**
 * __useGetProjectCollaborationsQuery__
 *
 * To run a query within a React component, call `useGetProjectCollaborationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectCollaborationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectCollaborationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProjectCollaborationsQuery(baseOptions?: Apollo.QueryHookOptions<GetProjectCollaborationsQuery, GetProjectCollaborationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectCollaborationsQuery, GetProjectCollaborationsQueryVariables>(GetProjectCollaborationsDocument, options);
      }
export function useGetProjectCollaborationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectCollaborationsQuery, GetProjectCollaborationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectCollaborationsQuery, GetProjectCollaborationsQueryVariables>(GetProjectCollaborationsDocument, options);
        }
export type GetProjectCollaborationsQueryHookResult = ReturnType<typeof useGetProjectCollaborationsQuery>;
export type GetProjectCollaborationsLazyQueryHookResult = ReturnType<typeof useGetProjectCollaborationsLazyQuery>;
export type GetProjectCollaborationsQueryResult = Apollo.QueryResult<GetProjectCollaborationsQuery, GetProjectCollaborationsQueryVariables>;
export const CollaborationCreateDocument = gql`
    mutation CollaborationCreate($input: CollaborationCreateInput!) {
  collaborationCreate(input: $input) {
    userErrors {
      message
      values
    }
    success
  }
}
    `;
export type CollaborationCreateMutationFn = Apollo.MutationFunction<CollaborationCreateMutation, CollaborationCreateMutationVariables>;

/**
 * __useCollaborationCreateMutation__
 *
 * To run a mutation, you first call `useCollaborationCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollaborationCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collaborationCreateMutation, { data, loading, error }] = useCollaborationCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCollaborationCreateMutation(baseOptions?: Apollo.MutationHookOptions<CollaborationCreateMutation, CollaborationCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CollaborationCreateMutation, CollaborationCreateMutationVariables>(CollaborationCreateDocument, options);
      }
export type CollaborationCreateMutationHookResult = ReturnType<typeof useCollaborationCreateMutation>;
export type CollaborationCreateMutationResult = Apollo.MutationResult<CollaborationCreateMutation>;
export type CollaborationCreateMutationOptions = Apollo.BaseMutationOptions<CollaborationCreateMutation, CollaborationCreateMutationVariables>;
export const CollaborationDeleteDocument = gql`
    mutation CollaborationDelete($id: ID!) {
  collaborationDelete(id: $id) {
    userErrors {
      message
      values
    }
    success
  }
}
    `;
export type CollaborationDeleteMutationFn = Apollo.MutationFunction<CollaborationDeleteMutation, CollaborationDeleteMutationVariables>;

/**
 * __useCollaborationDeleteMutation__
 *
 * To run a mutation, you first call `useCollaborationDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCollaborationDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [collaborationDeleteMutation, { data, loading, error }] = useCollaborationDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCollaborationDeleteMutation(baseOptions?: Apollo.MutationHookOptions<CollaborationDeleteMutation, CollaborationDeleteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CollaborationDeleteMutation, CollaborationDeleteMutationVariables>(CollaborationDeleteDocument, options);
      }
export type CollaborationDeleteMutationHookResult = ReturnType<typeof useCollaborationDeleteMutation>;
export type CollaborationDeleteMutationResult = Apollo.MutationResult<CollaborationDeleteMutation>;
export type CollaborationDeleteMutationOptions = Apollo.BaseMutationOptions<CollaborationDeleteMutation, CollaborationDeleteMutationVariables>;