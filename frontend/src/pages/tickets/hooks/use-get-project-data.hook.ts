import { useEffect, useState } from 'react';
import { useGetMyProjectQuery } from '../../../apollo/graphql/project/project.generated';
import { useUserErrorsHandler } from '../../../hooks/use-user-errors-handler.hook';

interface IUseGetProjectData {
  projectId: string;
}

export const useGetProjectData = (props: IUseGetProjectData) => {
  const { projectId } = props;
  const [projectName, setProjectName] = useState<string>('');

  const { checkErrorMessage } = useUserErrorsHandler();

  const { data: projectData, loading: getProjectLoading } =
    useGetMyProjectQuery({
      fetchPolicy: 'no-cache',
      variables: {
        id: projectId as string,
      },
    });

  useEffect(() => {
    const data = projectData?.getMyProject.project;
    const errors = projectData?.getMyProject.userErrors;
    if (!getProjectLoading && errors && errors.length > 0) {
      checkErrorMessage(errors[0].message);
    }
    if (!getProjectLoading && data) {
      setProjectName(data.name);
    }
  }, [projectData]);

  return {
    projectName,
  };
};
