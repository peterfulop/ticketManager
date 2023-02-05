/* eslint-disable */
import * as Types from '../graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ConfirmUserMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type ConfirmUserMutation = { __typename?: 'Mutation', confirmUser: { __typename?: 'ConfirmPayload', confirmed?: boolean | null, userErrors: Array<{ __typename?: 'UserError', message: string }> } };

export type VerifyUserQueryVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type VerifyUserQuery = { __typename?: 'Query', verifyUser: { __typename?: 'VerifyPayload', userErrors: Array<{ __typename?: 'UserError', message: string }>, user?: { __typename?: 'User', id: string, name: string, email: string } | null } };


export const ConfirmUserDocument = gql`
    mutation ConfirmUser($token: String!) {
  confirmUser(token: $token) {
    userErrors {
      message
    }
    confirmed
  }
}
    `;
export type ConfirmUserMutationFn = Apollo.MutationFunction<ConfirmUserMutation, ConfirmUserMutationVariables>;

/**
 * __useConfirmUserMutation__
 *
 * To run a mutation, you first call `useConfirmUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmUserMutation, { data, loading, error }] = useConfirmUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmUserMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmUserMutation, ConfirmUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmUserMutation, ConfirmUserMutationVariables>(ConfirmUserDocument, options);
      }
export type ConfirmUserMutationHookResult = ReturnType<typeof useConfirmUserMutation>;
export type ConfirmUserMutationResult = Apollo.MutationResult<ConfirmUserMutation>;
export type ConfirmUserMutationOptions = Apollo.BaseMutationOptions<ConfirmUserMutation, ConfirmUserMutationVariables>;
export const VerifyUserDocument = gql`
    query VerifyUser($token: String!) {
  verifyUser(token: $token) {
    userErrors {
      message
    }
    user {
      id
      name
      email
    }
  }
}
    `;

/**
 * __useVerifyUserQuery__
 *
 * To run a query within a React component, call `useVerifyUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyUserQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyUserQuery(baseOptions: Apollo.QueryHookOptions<VerifyUserQuery, VerifyUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyUserQuery, VerifyUserQueryVariables>(VerifyUserDocument, options);
      }
export function useVerifyUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyUserQuery, VerifyUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyUserQuery, VerifyUserQueryVariables>(VerifyUserDocument, options);
        }
export type VerifyUserQueryHookResult = ReturnType<typeof useVerifyUserQuery>;
export type VerifyUserLazyQueryHookResult = ReturnType<typeof useVerifyUserLazyQuery>;
export type VerifyUserQueryResult = Apollo.QueryResult<VerifyUserQuery, VerifyUserQueryVariables>;