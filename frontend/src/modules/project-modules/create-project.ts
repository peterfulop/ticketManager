import {
  ApolloCache,
  DefaultContext,
  FetchResult,
  MutationFunctionOptions,
} from '@apollo/client';
import {
  Exact,
  ProjectCreateInput,
} from '../../apollo/graphql-generated/types';
import { ProjectCreateMutation } from '../../apollo/graphql/project/project.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { EServerSideError } from '../../types/enums/db-errors.enum';
import { MutationAlerts } from '../../types/interfaces/common.interface';

interface ICreateProject extends MutationAlerts {
  values: ProjectCreateInput;
  createProject(
    options?:
      | MutationFunctionOptions<
          ProjectCreateMutation,
          Exact<{ input: ProjectCreateInput }>,
          DefaultContext,
          ApolloCache<any>
        >
      | undefined
  ): Promise<FetchResult<ProjectCreateMutation>>;
}

export const createProjectMutation = async (props: ICreateProject) => {
  const {
    values,
    setAlertMessage,
    setAlertMessageColor,
    setSuccess,
    createProject,
  } = props;

  setAlertMessage(null);
  try {
    const res = await createProject({
      variables: {
        input: {
          name: values.name,
        },
      },
    });
    if (res.data?.projectCreate.userErrors.length) {
      setAlertMessageColor('danger');
      const errorMessage = res.data.projectCreate.userErrors[0].message;
      const errorValues = res.data.projectCreate.userErrors[0].values;
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
    if (res.data?.projectCreate.project) {
      setSuccess(true);
      setAlertMessageColor('success');
      setAlertMessage(
        translate(TEXT.forms.projectForms.CREATE.alerts.successful)
      );
    }
  } catch (error) {
    setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
  }
};
