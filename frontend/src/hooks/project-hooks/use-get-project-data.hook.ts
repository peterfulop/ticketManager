import { useEffect, useState } from 'react';
import { Project } from '../../apollo/graphql-generated/types';
import { useGetProjectQuery } from '../../apollo/graphql/project/project.generated';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

interface IUseGetProjectData {
  projectId: string;
}

export const useGetProjectData = (props: IUseGetProjectData) => {
  const { projectId } = props;
  const [project, setProject] = useState<Project | undefined>();
  const { errorMessage, checkErrorMessage } = useUserErrorHandler();

  const {
    data: projectData,
    loading: getProjectLoading,
    error: getProjectError,
    refetch: refetchProjectData,
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
      if (data) {
        setProject(data as Project);
      }
    }
  }, [projectData, getProjectError]);

  return {
    project,
    errorMessage,
    getProjectLoading,
    getProjectError,
    refetchProjectData,
  };
};
