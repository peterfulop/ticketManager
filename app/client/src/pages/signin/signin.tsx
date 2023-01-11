import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import EnStrings from '../../utilities/strings';
export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null | string>(null);

  // const [signinMutation, { data, loading, error: signinError }] =
  //   useSigninMutation();

  const resetForm = () => {
    setError(null);
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    // setError(null);
    // await signinMutation({
    //   variables: {
    //     input: {
    //       email,
    //       password,
    //     },
    //   },
    // });
  };

  // useEffect(() => {
  //   if (signinError) {
  //     setError(EnStrings.ERRORS.SERVER_ERROR);
  //   }
  //   if (data) {
  //     if (data.signin.userErrors.length) {
  //       const errMessage = sSTE(data.signin.userErrors[0].message);
  //       setError(errMessage);
  //     }
  //     if (data.signin.token) {
  //       localStorage.setItem('token', data.signin.token);
  //       resetForm();
  //     }
  //   }
  // }, [data]);

  return (
    <div>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>{EnStrings.SCREENS.SIGNIN.FORM.LABELS.EMAIL}</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // disabled={loading}
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
            // disabled={loading}
          />
        </Form.Group>
        {error && <p>{error}</p>}
        <Button type="submit">
          {EnStrings.SCREENS.SIGNIN.FORM.BUTTONS.SIGNIN_BUTTON}
        </Button>
      </Form>
    </div>
  );
};
