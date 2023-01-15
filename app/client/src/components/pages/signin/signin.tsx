import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { sSTE } from '../../../utilities/set-server-type-error';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import {
  useConfirmResendMutation,
  useSigninMutation,
} from './query/signin.generated';
import { useNavigate } from 'react-router';
import { NavigationPath } from '../../../enums/navigation.enum';
export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [userConfirmError, setUserConfirmError] = useState<null | boolean>(
    null
  );

  const [
    signinMutation,
    { data: signinData, loading: signinLoading, error: signinError },
  ] = useSigninMutation();

  const [
    confirmResendMutation,
    {
      data: confirmResendData,
      loading: confirmResendLoading,
      error: confirmResendError,
    },
  ] = useConfirmResendMutation();

  const resetForm = () => {
    setError(null);
    setUserConfirmError(false);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    await signinMutation({
      variables: {
        signinInput: {
          email,
          password,
        },
      },
    });
  };

  const handleResendConfirmation = async () => {
    setError(null);
    await confirmResendMutation({
      variables: {
        email,
      },
    });
  };

  useEffect(() => {
    if (signinError) {
      setError(EnStrings.ERRORS.SERVER_ERROR);
    }
    if (signinData) {
      if (signinData.signin.userErrors.length) {
        const errMessage = sSTE(signinData.signin.userErrors[0].message);
        if (errMessage === EnStrings.ERRORS.UNCONFIRMED_USER) {
          setUserConfirmError(true);
        }
        setError(errMessage);
      }
      if (signinData.signin.token) {
        localStorage.setItem('token', signinData.signin.token);
        resetForm();
        navigate(NavigationPath.PROFILE);
      }
    }
  }, [signinData, signinError, navigate]);

  useEffect(() => {
    if (confirmResendError) {
      setError(EnStrings.ERRORS.SERVER_ERROR);
    }
    if (confirmResendData) {
      if (confirmResendData.confirmResend.userErrors.length) {
        const errMessage = sSTE(
          confirmResendData.confirmResend.userErrors[0].message
        );
        setError(errMessage);
      } else {
        resetForm();
        alert('Please, check your emails!');
      }
    }
  }, [confirmResendData, confirmResendError]);

  return (
    <MainLayout>
      <Form
        onSubmit={(e) => handleSubmit(e)}
        onChange={() => {
          if (error) {
            resetForm();
          }
        }}
      >
        <Form.Group className="mb-3">
          <Form.Label>{EnStrings.SCREENS.SIGNIN.FORM.LABELS.EMAIL}</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={signinLoading || confirmResendLoading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            {EnStrings.SCREENS.SIGNIN.FORM.LABELS.PASSWORD}
          </Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={signinLoading || confirmResendLoading}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button type="submit">
          {EnStrings.SCREENS.SIGNIN.FORM.BUTTONS.SIGNIN_BUTTON}
        </Button>
      </Form>
      {userConfirmError && (
        <Button
          className="mt-3"
          variant="secondary"
          type="button"
          onClick={handleResendConfirmation}
        >
          {EnStrings.SCREENS.SIGNIN.FORM.BUTTONS.RESEND_CONFIRM}
        </Button>
      )}
    </MainLayout>
  );
};
