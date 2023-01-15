/* eslint-disable */
import * as Types from '../../../../apollo/graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type SigninMutationVariables = Types.Exact<{
  signinInput: Types.CredentialsInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthPayload', token?: string | null, userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }> } };

export type ConfirmResendMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
}>;


export type ConfirmResendMutation = { __typename?: 'Mutation', confirmResend: { __typename?: 'AuthPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }> } };


export const SigninDocument = gql`
    mutation Signin($signinInput: CredentialsInput!) {
  signin(input: $signinInput) {
    userErrors {
      message
      values
    }
    token
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      signinInput: // value for 'signinInput'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const ConfirmResendDocument = gql`
    mutation ConfirmResend($email: String!) {
  confirmResend(email: $email) {
    userErrors {
      message
      values
    }
  }
}
    `;
export type ConfirmResendMutationFn = Apollo.MutationFunction<ConfirmResendMutation, ConfirmResendMutationVariables>;

/**
 * __useConfirmResendMutation__
 *
 * To run a mutation, you first call `useConfirmResendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmResendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmResendMutation, { data, loading, error }] = useConfirmResendMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useConfirmResendMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmResendMutation, ConfirmResendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmResendMutation, ConfirmResendMutationVariables>(ConfirmResendDocument, options);
      }
export type ConfirmResendMutationHookResult = ReturnType<typeof useConfirmResendMutation>;
export type ConfirmResendMutationResult = Apollo.MutationResult<ConfirmResendMutation>;
export type ConfirmResendMutationOptions = Apollo.BaseMutationOptions<ConfirmResendMutation, ConfirmResendMutationVariables>;