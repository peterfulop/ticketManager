import { useEffect } from 'react';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { useGetProjectQuery } from '../../apollo/graphql/project/project.generated';
import { EActionTypes } from '../../types/enums/common.enum';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetProjectByParams {
  projectId?: string;
  setActionType: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setProjectInitialValues: React.Dispatch<
    React.SetStateAction<ProjectCreateInput>
  >;
  callBackFn?: () => void;
}

export const useGetProjectByParams = (props: IUseGetProjectByParams) => {
  const { projectId, setActionType, setProjectInitialValues, callBackFn } =
    props;

  const { notFound, checkErrorMessage } = useUserErrorHandler();

  const {
    data: projectData,
    error: getProjectError,
    loading: getProjectDataLoading,
  } = useGetProjectQuery({
    variables: {
      id: projectId as string,
    },
    skip: !projectId,
  });

  useEffect(() => {
    if (projectId) {
      const data = projectData?.getProject.project;
      if (!getProjectDataLoading) {
        checkErrorMessage({
          userErrors: projectData?.getProject.userErrors,
          graphqlError: getProjectError,
        });
        if (data) {
          setActionType(EActionTypes.UPDATE);
          setProjectInitialValues(data);
          callBackFn && callBackFn();
        }
      }
    }
  }, [projectData, getProjectError]);

  return { notFound, getProjectError };
};
