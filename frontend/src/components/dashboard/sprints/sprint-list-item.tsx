import { FC } from 'react';
import { BiRun } from 'react-icons/bi';
import { RxLockClosed } from 'react-icons/rx';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Sprint } from '../../../apollo/graphql-generated/types';
import { dateFormat } from '../../../utils/date-format';

const SprintItem = styled.div({
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

interface ISprintListItem {
  sprint: Sprint;
  modalURL: string;
}

export const SprintListItem: FC<ISprintListItem> = ({ sprint, modalURL }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(modalURL);
  };

  const { startDate, endDate, closed, title } = sprint;

  return (
    <SprintItem onClick={handleClick}>
      {closed ? <RxLockClosed size={25} /> : <BiRun size={25} />}
      <div>
        <p>{title}</p>
        <div className='d-flex justify-content-between gap-2'>
          <small>startDate: {dateFormat(startDate)}</small>
          <small>endDate: {dateFormat(endDate)}</small>
        </div>
      </div>
    </SprintItem>
  );
};
