import { ProjectCreateInput } from '../../apollo/graphql-generated/types';
import { useProjectCreateMutation } from '../../apollo/graphql/project/project.generated';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useUserErrorHandler } from '../../hooks/use-user-errors-handler.hook';
import { EServerSideError } from '../../types/enums/db-errors.enum';
import { IMutationAlerts } from '../../types/interfaces/common.interface';

interface ICreateProject extends IMutationAlerts {}

export const useCreateProjectMutationHook = (props: ICreateProject) => {
  const { setSuccess, setAlertMessage, setAlertMessageColor } = props;
  const { errorMessage, checkErrorMessage } = useUserErrorHandler();

  const [create, { loading: createLoading }] = useProjectCreateMutation();

  const createProject = async (input: ProjectCreateInput) => {
    setAlertMessage(null);
    try {
      const res = await create({
        variables: {
          input: {
            name: input.name,
          },
        },
      });
      const data = res.data?.projectCreate.project;
      const userErrors = res.data?.projectCreate.userErrors;
      const errorValues = res.data?.projectCreate.userErrors[0].values;
      const graphqlError = res.errors && res.errors[0];

      checkErrorMessage({
        userErrors,
        graphqlError,
      });

      if (errorMessage) {
        setAlertMessageColor('danger');
        const translatedError = translateERR(errorMessage);
        if (errorMessage === EServerSideError.MISSING_FIELDS) {
          return setAlertMessage(
            `${translatedError}${errorValues?.toString()}`
          );
        }
        if (errorMessage === EServerSideError.UNIQUE_CONSTRAINT_FAIL) {
          setAlertMessage(`${translatedError}${errorValues?.toString()}`);
        } else {
          return setAlertMessage(translatedError);
        }
      }
      if (data) {
        setSuccess(true);
        setAlertMessageColor('success');
        setAlertMessage(
          translate(TEXT.forms.projectForms.CREATE.alerts.successful)
        );
      }
    } catch (error: any) {
      checkErrorMessage({ userErrors: [], graphqlError: error.message });
      setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
    }
  };

  return {
    createLoading,
    createProject,
  };
};
