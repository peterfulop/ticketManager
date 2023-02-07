/* eslint-disable */
import * as Types from '../../../apollo/graphql-generated/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetMyProjectsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetMyProjectsQuery = { __typename?: 'Query', getMyProjects: { __typename?: 'ProjectsPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, projects?: Array<{ __typename?: 'Project', id: string, name: string, createdAt?: string | null, updatedAt?: string | null } | null> | null } };

export type GetMyProjectQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetMyProjectQuery = { __typename?: 'Query', getMyProject: { __typename?: 'ProjectPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, project?: { __typename?: 'Project', id: string, name: string, createdAt?: string | null, updatedAt?: string | null } | null } };

export type ProjectCreateMutationVariables = Types.Exact<{
  input: Types.ProjectCreateInput;
}>;


export type ProjectCreateMutation = { __typename?: 'Mutation', projectCreate: { __typename?: 'ProjectPayload', userErrors: Array<{ __typename?: 'UserError', message: string, values?: Array<string | null> | null }>, project?: { __typename?: 'Project', id: string, name: string, createdAt?: string | null, updatedAt?: string | null } | null } };


export const GetMyProjectsDocument = gql`
    query GetMyProjects {
  getMyProjects {
    userErrors {
      message
      values
    }
    projects {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetMyProjectsQuery__
 *
 * To run a query within a React component, call `useGetMyProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProjectsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProjectsQuery(baseOptions?: Apollo.QueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
      }
export function useGetMyProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProjectsQuery, GetMyProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProjectsQuery, GetMyProjectsQueryVariables>(GetMyProjectsDocument, options);
        }
export type GetMyProjectsQueryHookResult = ReturnType<typeof useGetMyProjectsQuery>;
export type GetMyProjectsLazyQueryHookResult = ReturnType<typeof useGetMyProjectsLazyQuery>;
export type GetMyProjectsQueryResult = Apollo.QueryResult<GetMyProjectsQuery, GetMyProjectsQueryVariables>;
export const GetMyProjectDocument = gql`
    query GetMyProject($id: ID!) {
  getMyProject(id: $id) {
    userErrors {
      message
      values
    }
    project {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetMyProjectQuery__
 *
 * To run a query within a React component, call `useGetMyProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMyProjectQuery(baseOptions: Apollo.QueryHookOptions<GetMyProjectQuery, GetMyProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMyProjectQuery, GetMyProjectQueryVariables>(GetMyProjectDocument, options);
      }
export function useGetMyProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyProjectQuery, GetMyProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMyProjectQuery, GetMyProjectQueryVariables>(GetMyProjectDocument, options);
        }
export type GetMyProjectQueryHookResult = ReturnType<typeof useGetMyProjectQuery>;
export type GetMyProjectLazyQueryHookResult = ReturnType<typeof useGetMyProjectLazyQuery>;
export type GetMyProjectQueryResult = Apollo.QueryResult<GetMyProjectQuery, GetMyProjectQueryVariables>;
export const ProjectCreateDocument = gql`
    mutation ProjectCreate($input: ProjectCreateInput!) {
  projectCreate(input: $input) {
    userErrors {
      message
      values
    }
    project {
      id
      name
      createdAt
      updatedAt
    }
  }
}
    `;
export type ProjectCreateMutationFn = Apollo.MutationFunction<ProjectCreateMutation, ProjectCreateMutationVariables>;

/**
 * __useProjectCreateMutation__
 *
 * To run a mutation, you first call `useProjectCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProjectCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [projectCreateMutation, { data, loading, error }] = useProjectCreateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProjectCreateMutation(baseOptions?: Apollo.MutationHookOptions<ProjectCreateMutation, ProjectCreateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProjectCreateMutation, ProjectCreateMutationVariables>(ProjectCreateDocument, options);
      }
export type ProjectCreateMutationHookResult = ReturnType<typeof useProjectCreateMutation>;
export type ProjectCreateMutationResult = Apollo.MutationResult<ProjectCreateMutation>;
export type ProjectCreateMutationOptions = Apollo.BaseMutationOptions<ProjectCreateMutation, ProjectCreateMutationVariables>;