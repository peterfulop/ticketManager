import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import {
  Exact,
  ProjectUpdateInput,
} from '../../apollo/graphql-generated/types';
import { ProjectUpdateMutation } from '../../apollo/graphql/project/project.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { EServerSideError } from '../../types/enums/db-errors.enum';
import { MutationAlerts } from '../../types/interfaces/common.interface';

interface IUpdateProject extends MutationAlerts {
  projectId: string;
  values: ProjectUpdateInput;
  updateProject(
    options?:
      | MutationFunctionOptions<
          ProjectUpdateMutation,
          Exact<{ input: ProjectUpdateInput }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ): Promise<FetchResult<ProjectUpdateMutation>>;
}

export const updateProjectMutation = async (props: IUpdateProject) => {
  const {
    projectId,
    values,
    setSuccess,
    updateProject,
    setAlertMessage,
    setAlertMessageColor,
  } = props;

  setAlertMessage(null);
  try {
    const res = await updateProject({
      variables: {
        input: {
          name: values.name,
          projectId,
        },
      },
    });
    if (res.data?.projectUpdate.userErrors.length) {
      setAlertMessageColor('danger');
      const errorMessage = res.data.projectUpdate.userErrors[0].message;
      const errorValues = res.data.projectUpdate.userErrors[0].values;
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
    if (res.data?.projectUpdate.project) {
      setSuccess(true);
      setAlertMessageColor('success');
      setAlertMessage(
        translate(TEXT.forms.projectForms.UPDATE.alerts.successful)
      );
    }
  } catch (error) {
    setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
  }
};
