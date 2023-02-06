import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useConfirmUserMutation } from '../../apollo/common-queries/auth.generated';
import { MainContainer } from '../../components/main-content/main-content';
import { MyAlert } from '../../components/my-alert/my-alert';
import { RoutePath } from '../../types/enums/routes.enum';
import { sSTE } from '../../utils/set-server-type-error';
import EnStrings from '../../utils/strings';

interface IConfirmUser {}

export const ConfirmUser: FC<IConfirmUser> = () => {
  const [error, setError] = useState<null | string>(null);
  const { confirmToken } = useParams();
  const navigate = useNavigate();

  const [confirmUser, { loading }] = useConfirmUserMutation();

  const handleConfirmUser = async () => {
    setError(null);
    const res = await confirmUser({
      variables: {
        token: confirmToken as string,
      },
    });
    if (res.data?.confirmUser?.userErrors?.length) {
      const errMessage = sSTE(res.data.confirmUser.userErrors[0].message);
      setError(errMessage);
    }
    if (res.data?.confirmUser.confirmed) {
      navigate(RoutePath.LOGIN);
    }
  };
  return (
    <MainContainer>
      <div className='mt-3 p-3'>
        <h1>{EnStrings.SCREENS.USER_CONFIRM.FORM.LABELS.TITLE}</h1>
        <p className='mb-3'>
          {EnStrings.SCREENS.USER_CONFIRM.FORM.LABELS.CONFIRM_TEXT}
        </p>
        {error && <MyAlert variant='danger' content={error} />}
        <Button type='submit' onClick={handleConfirmUser} disabled={loading}>
          {EnStrings.SCREENS.USER_CONFIRM.FORM.BUTTONS.USER_CONFIRM_BUTTON}
        </Button>
      </div>
    </MainContainer>
  );
};
