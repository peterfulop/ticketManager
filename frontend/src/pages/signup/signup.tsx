import { FC, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MainContainer } from '../../components/main-content/main-content';
import UserContext from '../../context/user';

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

  return <MainContainer>SignupPage</MainContainer>;
};
