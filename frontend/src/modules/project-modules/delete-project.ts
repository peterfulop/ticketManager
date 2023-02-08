import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import { Exact } from '../../apollo/graphql-generated/types';
import { ProjectDeleteMutation } from '../../apollo/graphql/project/project.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { EServerSideError } from '../../types/enums/db-errors.enum';
import { MutationAlerts } from '../../types/interfaces/common.interface';

interface IDeleteProject extends MutationAlerts {
  projectId: string;
  deleteProject(
    options?:
      | MutationFunctionOptions<
          ProjectDeleteMutation,
          Exact<{ id: string }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ): Promise<FetchResult<ProjectDeleteMutation>>;
}

export const deleteProjectMutation = async (props: IDeleteProject) => {
  const {
    projectId,
    setSuccess,
    deleteProject,
    setAlertMessage,
    setAlertMessageColor,
  } = props;

  setAlertMessage(null);
  try {
    const res = await deleteProject({
      variables: {
        id: projectId,
      },
    });
    if (res.data?.projectDelete.userErrors.length) {
      setAlertMessageColor('danger');
      const errorMessage = res.data.projectDelete.userErrors[0].message;
      const errorValues = res.data.projectDelete.userErrors[0].values;
      const translatedError = translateERR(errorMessage);

      if (errorMessage === EServerSideError.MISSING_FIELDS) {
        return setAlertMessage(`${translatedError}${errorValues?.toString()}`);
      }
      if (errorMessage === EServerSideError.UNIQUE_CONSTRAINT_FAIL) {
        setAlertMessage(`${translatedError}${errorValues?.toString()}`);
      } else {
        return setAlertMessage(translatedError);
      }
    }
    if (res.data?.projectDelete.success) {
      setSuccess(true);
      setAlertMessageColor('success');
      setAlertMessage(
        translate(TEXT.forms.projectForms.DELETE.alerts.successful)
      );
    }
  } catch (error) {
    setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
  }
};
