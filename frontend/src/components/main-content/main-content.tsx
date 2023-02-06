import { FC } from 'react';
import styled from 'styled-components';
import { IReact } from '../../types/interfaces/common.interface';

export const Main = styled.main({
  display: 'flex',
  justifyContent: 'center',
});

export const Content = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  maxWidth: '1024px',
  width: '100%',
});

interface IMainContainer extends IReact {
  style?: React.CSSProperties | undefined;
}

export const MainContainer: FC<IMainContainer> = (props) => {
  return (
    <Main>
      <Content style={props.style}>{props?.children}</Content>
    </Main>
  );
};
