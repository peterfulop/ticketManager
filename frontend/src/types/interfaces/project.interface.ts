import { ApolloQueryResult } from '@apollo/client';
import {
  Exact,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import { GetMyProjectsQuery } from '../../apollo/graphql/project/project.generated';
import { IMutationProps } from './common.interface';

export interface IProject {
  toggle?: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyProjectsQuery>>;
}

export interface IProjectMutation extends IMutationProps {
  setProjectInitialValues: React.Dispatch<
    React.SetStateAction<ProjectCreateInput>
  >;
}
