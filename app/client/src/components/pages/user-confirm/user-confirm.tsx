import { useNavigate, useParams } from 'react-router';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import { useConfirmUserMutation } from './query/user-confirm.generated';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { sSTE } from '../../../utilities/set-server-type-error';
import { NavigationPath } from '../../../enums/navigation.enum';

export const UserConfirm = (): JSX.Element => {
  const [confirmUser, { loading, error: ConfirmError, data }] =
    useConfirmUserMutation();
  const [error, setError] = useState<null | string>(null);
  const navigate = useNavigate();

  const { confirmToken } = useParams();

  const handleConfirmUser = async () => {
    console.log(confirmToken);

    await confirmUser({
      variables: {
        token: confirmToken as string,
      },
    });
  };

  useEffect(() => {
    if (ConfirmError) {
      setError(EnStrings.ERRORS.SERVER_ERROR);
    }
    if (data) {
      if (data.confirmUser.userErrors.length) {
        const errMessage = sSTE(data.confirmUser.userErrors[0].message);
        setError(errMessage);
      } else {
        navigate(NavigationPath.SIGNIN);
      }
    }
  }, [data, navigate, ConfirmError]);

  return (
    <MainLayout>
      <h1>User verify</h1>
      <div>
        <p className="mb-3">
          {EnStrings.SCREENS.USER_CONFIRM.FORM.LABELS.CONFIRM_TEXT}
        </p>
        {loading && <p className="mb-3">{EnStrings.COMMONS.LOADING}</p>}
        {error && <p className="mb-3">{error}</p>}
        <Button type="submit" onClick={handleConfirmUser}>
          {EnStrings.SCREENS.USER_CONFIRM.FORM.BUTTONS.USER_CONFIRM_BUTTON}
        </Button>
      </div>
    </MainLayout>
  );
};
