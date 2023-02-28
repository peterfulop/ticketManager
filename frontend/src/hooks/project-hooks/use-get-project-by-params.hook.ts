import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { useGetProjectQuery } from '../../apollo/graphql/project/project.generated';
import { EActionTypes } from '../../types/enums/common.enum';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetProjectByParams {
  projectId?: string;
  setActionType?: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setProjectInitialValues?: React.Dispatch<
    React.SetStateAction<ProjectCreateInput>
  >;
  callBackFn?: () => void;
}

export const useGetProjectByParams = (props: IUseGetProjectByParams) => {
  const location = useLocation();
  const { projectId, setActionType, setProjectInitialValues, callBackFn } =
    props;

  const { notFound, checkErrorMessage } = useUserErrorHandler();

  const {
    data: projectData,
    loading: getProjectLoading,
    error: getProjectError,
  } = useGetProjectQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: projectId as string,
    },
    skip: !projectId,
  });

  useEffect(() => {
    if (location.pathname.includes('update')) {
      const data = projectData?.getProject.project;
      if (!getProjectLoading) {
        checkErrorMessage({
          userErrors: projectData?.getProject.userErrors,
          graphqlError: getProjectError,
        });
        if (data) {
          setActionType && setActionType(EActionTypes.UPDATE);
          setProjectInitialValues && setProjectInitialValues(data);
          callBackFn && callBackFn();
        }
      }
    }
  }, [location, projectData, getProjectError]);

  return { notFound, getProjectError };
};
