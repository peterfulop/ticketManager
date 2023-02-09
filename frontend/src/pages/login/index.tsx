import { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useConfirmResendMutation,
  useSigninMutation,
} from '../../apollo/graphql/auth/auth.generated';
import { MainContainer } from '../../components/main-content/main-content';
import { MyAlert } from '../../components/my-alert/my-alert';
import UserContext from '../../context/user';
import { translate, translateERR } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { useForm } from '../../hooks/use-form.hook';
import { EServerSideError } from '../../types/enums/db-errors.enum';
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

export const LoginPage = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const signinInitialInputs = {
    email: '',
    password: '',
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');
  const [userConfirmError, setUserConfirmError] = useState<null | boolean>(
    null
  );

  const [signinMutation, { loading: signinLoading }] = useSigninMutation();

  const [confirmResendMutation, { loading: confirmResendLoading }] =
    useConfirmResendMutation();

  const useFormCallBackFn = async () => {
    setAlertMessage(null);
    try {
      const res = await signinMutation({
        variables: {
          input: {
            email: values.email,
            password: values.password,
          },
        },
      });
      if (res.data?.signin.userErrors.length) {
        const errorMessage = res.data.signin.userErrors[0].message;
        const translatedError = translateERR(errorMessage);
        if (errorMessage === EServerSideError.UNCONFIRMED_USER) {
          setAlertMessageColor('warning');
          setUserConfirmError(true);
          return setAlertMessage(translate(TEXT.ERRORS.UNCONFIRMED_USER));
        }
        setAlertMessageColor('danger');
        return setAlertMessage(translatedError);
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
        navigate(ERoutePath.PROJECTS);
      }
    } catch (error) {
      setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
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
    try {
      const res = await confirmResendMutation({
        variables: {
          email: values.email,
        },
      });
      if (res.data?.confirmResend.userErrors.length) {
        const errorMessage = res.data.confirmResend.userErrors[0].message;
        const translatedError = translateERR(errorMessage);
        setAlertMessage(translatedError);
      }
      if (res.data?.confirmResend.success) {
        setAlertMessageColor('success');
        setAlertMessage(
          translate(TEXT.forms.loginForm.alerts.successfulEmailResent)
        );
      }
    } catch (error) {
      setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
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
          <h2>{translate(TEXT.forms.loginForm.title)}</h2>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.loginForm.labels.email)}
            </Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder=''
              onChange={onChange}
              disabled={signinLoading || confirmResendLoading}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.loginForm.labels.password)}
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
                onClick={() => navigate(ERoutePath.SIGNUP)}
              >
                {translate(TEXT.forms.loginForm.buttons.signupBtn)}
              </Button>
              <Button type='submit' className='w-50'>
                {translate(TEXT.forms.loginForm.buttons.loginBtn)}
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
            {translate(TEXT.forms.loginForm.buttons.resendBtn)}
          </Button>
        )}
      </FormContainer>
    </MainContainer>
  );
};
