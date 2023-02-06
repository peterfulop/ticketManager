import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmUserMutation } from '../../apollo/common-queries/auth.generated';
import { MainContainer } from '../../components/main-content/main-content';
import { MyAlert } from '../../components/my-alert/my-alert';
import { RoutePath } from '../../types/enums/routes.enum';
import { sSTE } from '../../utils/set-server-type-error';
import EnStrings from '../../utils/strings';

interface IConfirmUser {}

export const ConfirmUser: FC<IConfirmUser> = () => {
  const [alertMessage, setAlertMessage] = useState<null | string>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  const { confirmToken } = useParams();
  const navigate = useNavigate();

  const [confirmUser, { loading }] = useConfirmUserMutation();

  const handleConfirmUser = async () => {
    setAlertMessage(null);
    const res = await confirmUser({
      variables: {
        token: confirmToken as string,
      },
    });
    if (res.data?.confirmUser?.userErrors?.length) {
      const errMessage = sSTE(res.data.confirmUser.userErrors[0].message);
      setAlertMessageColor('danger');
      setAlertMessage(errMessage);
    }
    if (res.data?.confirmUser.confirmed) {
      setAlertMessageColor('success');
      setAlertMessage(
        `Successfully confirmed your account! Redirecting to the login page...`
      );
      setTimeout(() => {
        navigate(RoutePath.LOGIN);
      }, 3000);
    }
  };

  return (
    <MainContainer>
      <div className='mt-3 p-3'>
        <h1>{EnStrings.SCREENS.USER_CONFIRM.FORM.LABELS.TITLE}</h1>
        <p className='mb-3'>
          {EnStrings.SCREENS.USER_CONFIRM.FORM.LABELS.CONFIRM_TEXT}
        </p>
        {alertMessage && (
          <MyAlert variant={alertMessageColor} content={alertMessage} />
        )}
        <Button type='submit' onClick={handleConfirmUser} disabled={loading}>
          {EnStrings.SCREENS.USER_CONFIRM.FORM.BUTTONS.USER_CONFIRM_BUTTON}
        </Button>
      </div>
    </MainContainer>
  );
};
