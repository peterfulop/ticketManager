import { FC, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer } from '../../components/main-content/main-content';
import { MyAlert } from '../../components/my-alert/my-alert';
import { useForm } from '../../hooks/use-form.hook';
import { RoutePath } from '../../types/enums/routes.enum';
import { sSTE } from '../../utils/set-server-type-error';
import EnStrings from '../../utils/strings';
import { useSignupMutation } from './graphql/signup.generated';

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

export const SignupPage: FC = () => {
  const navigate = useNavigate();

  const signupInitialInputs = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('error');
  const [success, setSuccess] = useState<boolean>(false);

  const [signupMutation, { loading, data }] = useSignupMutation();

  const useFormCallBackFn = async () => {
    setAlertMessage(null);
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
      const errMessage = sSTE(res.data.signup.userErrors[0].message);
      setAlertMessageColor('danger');
      return setAlertMessage(errMessage);
    }
    if (res.data?.signup.success) {
      setSuccess(res.data?.signup.success);
      setAlertMessageColor('success');
      setAlertMessage(
        'You successfully registered! Please, confirm your acount via email!'
      );
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
          <h2>{EnStrings.SCREENS.SIGNUP.FORM.LABELS.TITLE}</h2>
          <Form.Group className='mb-3'>
            <Form.Label>{EnStrings.SCREENS.SIGNUP.FORM.LABELS.NAME}</Form.Label>
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
              {EnStrings.SCREENS.SIGNUP.FORM.LABELS.EMAIL}
            </Form.Label>
            <Form.Control
              name='email'
              type='text'
              placeholder=''
              onChange={onChange}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {EnStrings.SCREENS.SIGNUP.FORM.LABELS.PASSWORD}
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
              {EnStrings.SCREENS.SIGNUP.FORM.LABELS.PASSWORD_CONFIRM}
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
                onClick={() => navigate(RoutePath.LOGIN)}
                disabled={loading}
              >
                {EnStrings.SCREENS.SIGNUP.FORM.BUTTONS.LOGIN}
              </Button>
              <Button type='submit' className='w-50' disabled={loading}>
                {EnStrings.SCREENS.SIGNIN.FORM.BUTTONS.SIGNIN_BUTTON}
              </Button>
            </div>
          )}
        </Form>
      </FormContainer>
    </MainContainer>
  );
};
