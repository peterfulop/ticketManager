import { useEffect, useState } from 'react';
import { Project } from '../../apollo/graphql-generated/types';
import { useGetMyProjectsQuery } from '../../apollo/graphql/project/project.generated';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

export const useGetProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { checkErrorMessage } = useUserErrorHandler();

  const {
    data: projectsData,
    loading: getProjectsDataLoading,
    error: getProjectsError,
    refetch: refetchProjects,
  } = useGetMyProjectsQuery();

  useEffect(() => {
    const data = projectsData?.getMyProjects.projects;
    if (!getProjectsDataLoading) {
      checkErrorMessage({
        userErrors: projectsData?.getMyProjects.userErrors,
        graphqlError: getProjectsError,
      });
      if (data) setProjects(data as Project[]);
    }
  }, [projectsData, getProjectsError]);

  return {
    projects,
    getProjectsDataLoading,
    getProjectsError,
    refetchProjects,
  };
};
