import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmUserMutation } from '../../apollo/graphql/auth/auth.generated';
import { MainContainer } from '../../components/main-content/main-content';
import { MyAlert } from '../../components/my-alert/my-alert';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { ERoutePath } from '../../types/enums/routes.enum';

export const ConfirmUser: FC = () => {
  const [alertMessage, setAlertMessage] = useState<null | string>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  const { confirmToken } = useParams();
  const navigate = useNavigate();

  const [confirmUser, { loading }] = useConfirmUserMutation();

  const handleConfirmUser = async () => {
    setAlertMessage(null);
    try {
      const res = await confirmUser({
        variables: {
          token: confirmToken as string,
        },
      });
      if (res.data?.confirmUser?.userErrors?.length) {
        const errorMessage = res.data.confirmUser.userErrors[0].message;
        const translatedError = translateERR(errorMessage);
        setAlertMessageColor('danger');
        setAlertMessage(translatedError);
      }
      if (res.data?.confirmUser.success) {
        setAlertMessageColor('success');
        setAlertMessage(
          translate(
            TEXT.forms.confirmUserForm.alerts.successfulUserConfirmation
          )
        );
        setTimeout(() => {
          navigate(ERoutePath.LOGIN);
        }, 3000);
      }
    } catch (error) {
      setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
    }
  };

  return (
    <MainContainer>
      <div className='mt-3 p-3'>
        <h1>{translate(TEXT.forms.confirmUserForm.title)}</h1>
        <p className='mb-3'>
          {translate(TEXT.forms.confirmUserForm.labels.confirmText)}
        </p>
        {alertMessage && (
          <MyAlert variant={alertMessageColor} content={alertMessage} />
        )}
        {!alertMessage && (
          <Button type='submit' onClick={handleConfirmUser} disabled={loading}>
            {translate(TEXT.forms.confirmUserForm.buttons.confirmBtn)}
          </Button>
        )}
      </div>
    </MainContainer>
  );
};
