import { useEffect } from 'react';
import {
  useProjectCreateMutation,
  useProjectDeleteMutation,
  useProjectUpdateMutation,
} from '../../apollo/graphql/project/project.generated';
import { IProject } from '../../types/interfaces/project.interface';
import { useUserErrorHandler } from '../use-user-errors-handler.hook';

export const useProjectMutations = (props: IProject) => {
  const { refetch } = props;
  const { checkErrorMessage } = useUserErrorHandler();

  const [
    createProject,
    { loading: createLoading, data: createData, error: createDataError },
  ] = useProjectCreateMutation();

  const [
    updateProject,
    { loading: updateLoading, data: updateData, error: updateDataError },
  ] = useProjectUpdateMutation();

  const [
    deleteProject,
    { loading: deleteLoading, data: deleteData, error: deleteDataError },
  ] = useProjectDeleteMutation();

  const loading = createLoading || updateLoading || deleteLoading;
  const data = createData || updateData || deleteData;
  const graphqlError = createDataError || updateDataError || deleteDataError;
  const userErrors =
    createData?.projectCreate.userErrors ||
    updateData?.projectUpdate.userErrors ||
    deleteData?.projectDelete.userErrors;

  useEffect(() => {
    if (!loading) {
      checkErrorMessage({ userErrors, graphqlError });
      if (data) {
        refetch();
      }
    }
  }, [data, graphqlError]);

  return {
    loading,
    createProject,
    updateProject,
    deleteProject,
  };
};
