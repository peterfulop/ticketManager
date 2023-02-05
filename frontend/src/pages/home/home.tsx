import { FC } from 'react';
import { MainContainer } from '../../components/main-content/main-content';

interface IHomePage {}

export const HomePage: FC<IHomePage> = () => {
  return <MainContainer>Home</MainContainer>;
};
