import { useEffect, useState } from 'react';
import { useGetProjectQuery } from '../../apollo/graphql/project/project.generated';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetProjectData {
  projectId: string;
}

export const useGetProjectData = (props: IUseGetProjectData) => {
  const { projectId } = props;
  const [projectName, setProjectName] = useState<string>('');
  const { checkErrorMessage } = useUserErrorHandler();

  const {
    data: projectData,
    loading: getProjectLoading,
    error: getProjectError,
  } = useGetProjectQuery({
    fetchPolicy: 'no-cache',
    variables: {
      id: projectId as string,
    },
  });

  useEffect(() => {
    const data = projectData?.getProject.project;
    if (!getProjectLoading) {
      checkErrorMessage({
        userErrors: projectData?.getProject.userErrors,
        graphqlError: getProjectError,
      });
      if (data) setProjectName(data.name);
    }
  }, [projectData, getProjectError]);

  return {
    projectName,
    getProjectLoading,
    getProjectError,
  };
};
