import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSignupMutation } from '../../apollo/graphql/auth/auth.generated';
import { MyAlert } from '../../components/component-library/my-alert/my-alert';
import { MainContainer } from '../../components/main-content/main-content';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useForm } from '../../hooks/use-form.hook';
import { ERoutePath } from '../../types/enums/routes.enum';

const FormContainer = styled.div({
  margin: '2rem',
  width: '100%',
  maxWidth: '500px',
  borderRadius: '5px',
  border: '1px solid lightgray',
  padding: '2rem',
  h2: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  form: {
    display: 'block',
    width: '100%',
  },
});

export const SignupPage = () => {
  const navigate = useNavigate();

  const signupInitialInputs = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');
  const [success, setSuccess] = useState<boolean>(false);

  const [signupMutation, { loading }] = useSignupMutation();

  const useFormCallBackFn = async () => {
    setAlertMessage(null);

    try {
      const res = await signupMutation({
        variables: {
          input: {
            name: values.name,
            credentials: {
              email: values.email,
              password: values.password,
            },
            passwordConfirm: values.passwordConfirm,
          },
        },
      });
      if (res.data?.signup.userErrors.length) {
        const errorMessage = res.data.signup.userErrors[0].message;
        const translatedError = translateERR(errorMessage);
        setAlertMessageColor('danger');
        return setAlertMessage(translatedError);
      }
      if (res.data?.signup.success) {
        setSuccess(res.data?.signup.success);
        setAlertMessageColor('success');
        setAlertMessage(
          translate(TEXT.forms.signupForm.alerts.successfullRegistration)
        );
      }
    } catch (error) {
      setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: useFormCallBackFn,
    initialState: signupInitialInputs,
  });

  const resetForm = () => {
    setAlertMessage(null);
    setAlertMessageColor('danger');
    setSuccess(false);
  };

  return (
    <MainContainer style={{ justifyContent: 'center' }}>
      <FormContainer>
        <Form
          onSubmit={(e) => onSubmit(e)}
          onChange={() => {
            if (alertMessage) {
              resetForm();
            }
          }}
        >
          <h2>{translate(TEXT.forms.signupForm.title)}</h2>
          <Form.Group className='mb-3'>
            <Form.Label>
              {' '}
              {translate(TEXT.forms.signupForm.labels.name)}
            </Form.Label>
            <Form.Control
              name='name'
              type='text'
              placeholder=''
              onChange={onChange}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.signupForm.labels.email)}
            </Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder=''
              onChange={onChange}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.signupForm.labels.password)}
            </Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder=''
              onChange={onChange}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.signupForm.labels.passwordConfirm)}
            </Form.Label>
            <Form.Control
              name='passwordConfirm'
              type='password'
              placeholder=''
              onChange={onChange}
              disabled={loading}
            />
          </Form.Group>
          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          {!success && (
            <div className='d-flex justify-content-between'>
              <Button
                name='navigate-to-signup'
                variant='link'
                type='button'
                onClick={() => navigate(ERoutePath.LOGIN)}
                disabled={loading}
              >
                {translate(TEXT.forms.signupForm.buttons.loginBtn)}
              </Button>
              <Button type='submit' className='w-50' disabled={loading}>
                {translate(TEXT.forms.signupForm.buttons.signupBtn)}
              </Button>
            </div>
          )}
        </Form>
      </FormContainer>
    </MainContainer>
  );
};
