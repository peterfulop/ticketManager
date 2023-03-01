import { FC } from 'react';
import { CiUser } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { User } from '../../../apollo/graphql-generated/types';

const Member = styled.div({
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'center',
  gap: '1rem',
  margin: '5px 0',
  padding: '5px',
  borderBottom: '1px solid lightgray',
  height: '60px',
  p: {
    fontWeight: 'bold',
  },
  ':hover': {
    background: 'rgb(227,236,242)',
    cursor: 'pointer',
  },
});

interface IMemberListItem {
  user: User;
  modalURL: string;
}

export const MemberListItem: FC<IMemberListItem> = ({ user, modalURL }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(modalURL);
  };

  return (
    <Member onClick={handleClick}>
      <CiUser size={30} />
      <div>
        <p>{user.name}</p>
        <small>{user.email}</small>
      </div>
    </Member>
  );
};
