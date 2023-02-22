import { useEffect, useState } from 'react';
import { Project } from '../../apollo/graphql-generated/types';
import { useGetMyProjectsQuery } from '../../apollo/graphql/project/project.generated';
import { useUserErrorsHandler } from '../use-user-errors-handler.hook';

export const useGetProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { checkErrorMessage } = useUserErrorsHandler();

  const {
    data: projectsData,
    loading: getProjectsDataLoading,
    error: getProjectsError,
    refetch: refetchProjects,
  } = useGetMyProjectsQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const data = projectsData?.getMyProjects.projects;
    const errors = projectsData?.getMyProjects.userErrors;

    if (!getProjectsDataLoading && errors && errors?.length > 0) {
      checkErrorMessage(errors[0].message);
    }
    if (!getProjectsDataLoading && data) {
      setProjects(data as Project[]);
    }
  }, [projectsData]);

  return {
    projects,
    getProjectsDataLoading,
    getProjectsError,
    refetchProjects,
  };
};
