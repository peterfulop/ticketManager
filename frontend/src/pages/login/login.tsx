import { FC, useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer } from '../../components/main-content/main-content';
import { MyAlert } from '../../components/my-alert/my-alert';
import UserContext from '../../context/user';
import { useForm } from '../../hooks/use-form.hook';
import { RoutePath } from '../../types/enums/routes.enum';
import EnStrings from '../../utils/en.json';
import { sSTE } from '../../utils/set-server-type-error';
import {
  useConfirmResendMutation,
  useSigninMutation,
} from './query/login.generated';

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

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const signinInitialInputs = {
    email: '',
    password: '',
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('error');
  const [userConfirmError, setUserConfirmError] = useState<null | boolean>(
    null
  );

  const [signinMutation, { loading: signinLoading }] = useSigninMutation();

  const [confirmResendMutation, { loading: confirmResendLoading }] =
    useConfirmResendMutation();

  const useFormCallBackFn = async () => {
    setAlertMessage(null);
    const res = await signinMutation({
      variables: {
        input: {
          email: values.email,
          password: values.password,
        },
      },
    });
    if (res.data?.signin.userErrors.length) {
      const errMessage = sSTE(res.data.signin.userErrors[0].message);
      if (errMessage === EnStrings.ERRORS.UNCONFIRMED_USER) {
        setAlertMessageColor('warning');
        setUserConfirmError(true);
        return setAlertMessage(errMessage);
      }
      setAlertMessageColor('danger');
      return setAlertMessage(errMessage);
    }
    if (res.data?.signin.token && res.data.signin.user) {
      const { token, user } = res.data.signin;
      userContext.userDispatch({
        type: 'login',
        payload: {
          token,
          user,
        },
      });
      navigate(RoutePath.PROFILE);
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: useFormCallBackFn,
    initialState: signinInitialInputs,
  });

  const resetForm = () => {
    setAlertMessage(null);
    setUserConfirmError(false);
    setAlertMessageColor('danger');
  };

  const handleResendConfirmation = async () => {
    setAlertMessage(null);
    const res = await confirmResendMutation({
      variables: {
        email: values.email,
      },
    });
    if (res.data?.confirmResend.userErrors.length) {
      const errMessage = sSTE(res.data.confirmResend.userErrors[0].message);
      setAlertMessage(errMessage);
    }
    if (res.data?.confirmResend.success) {
      setAlertMessageColor('success');
      setAlertMessage('Email successfully resent!');
    }
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
          <h2>{EnStrings.SCREENS.SIGNIN.FORM.LABELS.TITLE}</h2>
          <Form.Group className='mb-3'>
            <Form.Label>
              {EnStrings.SCREENS.SIGNIN.FORM.LABELS.EMAIL}
            </Form.Label>
            <Form.Control
              name='email'
              type='text'
              placeholder=''
              onChange={onChange}
              disabled={signinLoading || confirmResendLoading}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {EnStrings.SCREENS.SIGNIN.FORM.LABELS.PASSWORD}
            </Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder=''
              onChange={onChange}
              disabled={signinLoading || confirmResendLoading}
            />
          </Form.Group>
          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          {!userConfirmError && (
            <div className='d-flex justify-content-between'>
              <Button
                name='navigate-to-signup'
                variant='link'
                type='button'
                onClick={() => navigate(RoutePath.SIGNUP)}
              >
                {EnStrings.SCREENS.SIGNUP.FORM.BUTTONS.SIGNUP_BUTTON}
              </Button>
              <Button type='submit' className='w-50'>
                {EnStrings.SCREENS.SIGNIN.FORM.BUTTONS.SIGNIN_BUTTON}
              </Button>
            </div>
          )}
        </Form>
        {userConfirmError && (
          <Button
            className='mt-3 w-100'
            variant='secondary'
            type='button'
            onClick={handleResendConfirmation}
          >
            {EnStrings.SCREENS.SIGNIN.FORM.BUTTONS.RESEND_CONFIRM}
          </Button>
        )}
      </FormContainer>
    </MainContainer>
  );
};
