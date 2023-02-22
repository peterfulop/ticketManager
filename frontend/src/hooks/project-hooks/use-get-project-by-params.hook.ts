import { useEffect } from 'react';
import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { useGetMyProjectQuery } from '../../apollo/graphql/project/project.generated';
import { EActionTypes } from '../../types/enums/common.enum';
import { useUserErrorsHandler } from '../use-user-errors-handler.hook';

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

  const { notFound, checkErrorMessage } = useUserErrorsHandler();

  const {
    data: projectData,
    error: getProjectError,
    loading: getProjectDataLoading,
  } = useGetMyProjectQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: projectId as string,
    },
    skip: !projectId,
  });

  useEffect(() => {
    if (projectId) {
      const data = projectData?.getMyProject.project;
      const errors = projectData?.getMyProject.userErrors;
      if (!getProjectDataLoading && errors && errors?.length > 0) {
        checkErrorMessage(errors[0].message);
      }
      if (!getProjectDataLoading && data) {
        setActionType(EActionTypes.UPDATE);
        setProjectInitialValues(data);
        callBackFn && callBackFn();
      }
    } else {
    }
  }, [projectData]);

  return { notFound, getProjectError };
};
