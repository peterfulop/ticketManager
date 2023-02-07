import { FC, useContext, useState } from 'react';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer } from '../../components/main-content/main-content';
import UserContext from '../../context/user';
import { useForm } from '../../hooks/use-form.hook';

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
  const userContext = useContext(UserContext);

  const signupInitialInputs = {
    email: '',
    password: '',
  };

  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('error');

  const useFormCallBackFn = async () => {
    // setAlertMessage(null);
    // const res = {await signinMutation({
    //   variables: {
    //     signinInput: {
    //       email: values.email,
    //       password: values.password,
    //     },
    //   },
    // });}
    // if (res.data?.signin.userErrors.length) {
    //   const errMessage = sSTE(res.data.signin.userErrors[0].message);
    //   setAlertMessageColor('danger');
    //   return setAlertMessage(errMessage);
    // }
    // if (res.data?.signin.token && res.data.signin.user) {
    //   const { token, user } = res.data.signin;
    //   userContext.userDispatch({
    //     type: 'login',
    //     payload: {
    //       token,
    //       user,
    //     },
    //   });
    //   navigate(RoutePath.LOGIN);
    // }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: useFormCallBackFn,
    initialState: signupInitialInputs,
  });

  return <MainContainer>SignupPage</MainContainer>;
};
