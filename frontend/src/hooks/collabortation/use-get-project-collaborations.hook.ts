import { useEffect, useState } from 'react';
import { Project } from '../../apollo/graphql-generated/types';
import { useGetProjectCollaborationsQuery } from '../../apollo/graphql/collaboration/collaboration.generated';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

export const useGetProjectCollabroations = () => {
  const [projectCollabs, setProjectCollabs] = useState<Project[]>([]);
  const { checkErrorMessage } = useUserErrorHandler();

  const {
    data: projectsData,
    loading: getProjectCollabDataLoading,
    error: getProjectCollabError,
    refetch: refetchProjectCollabs,
  } = useGetProjectCollaborationsQuery({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const data = projectsData?.getProjectCollaborations.projects;
    if (!getProjectCollabDataLoading) {
      checkErrorMessage({
        userErrors: projectsData?.getProjectCollaborations.userErrors,
        graphqlError: getProjectCollabError,
      });
      if (data) setProjectCollabs(data as Project[]);
    }
  }, [projectsData, getProjectCollabError]);

  return {
    projectCollabs,
    getProjectCollabDataLoading,
    getProjectCollabError,
    refetchProjectCollabs,
  };
};
