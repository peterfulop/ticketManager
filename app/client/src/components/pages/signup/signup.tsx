import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import EnStrings from '../../../utilities/strings';
import { useSignupMutation } from './query/signup.generated';
import { sSTE } from '../../../utilities/set-server-type-error';
import { MainLayout } from '../../component-library/main-layout/main-layout';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');

  const [error, setError] = useState<null | string>(null);

  const [signupMutation, { data, loading, error: signupError }] =
    useSignupMutation();

  const resetForm = () => {
    setError(null);
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setName('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    await signupMutation({
      variables: {
        input: {
          name,
          credentials: {
            email,
            password,
          },
          passwordConfirm,
        },
      },
    });
  };

  useEffect(() => {
    if (signupError) {
      setError(EnStrings.ERRORS.SERVER_ERROR);
    }
    if (data) {
      if (data.signup.userErrors.length) {
        const errMessage = sSTE(data.signup.userErrors[0].message);
        setError(errMessage);
      } else {
        resetForm();
      }
    }
  }, [data, signupError]);

  return (
    <MainLayout>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>{EnStrings.SCREENS.SIGNUP.FORM.LABELS.NAME}</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>{EnStrings.SCREENS.SIGNUP.FORM.LABELS.EMAIL}</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            {EnStrings.SCREENS.SIGNUP.FORM.LABELS.PASSWORD}
          </Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            {EnStrings.SCREENS.SIGNUP.FORM.LABELS.PASSWORD_CONFIRM}
          </Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button type="submit">
          {EnStrings.SCREENS.SIGNUP.FORM.BUTTONS.SIGNUP_BUTTON}
        </Button>
      </Form>
    </MainLayout>
  );
};
