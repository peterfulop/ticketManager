import { FC } from 'react';
import styled from 'styled-components';
import { TicketStatus } from '../../apollo/graphql-generated/types';
import { enumToArray } from '../../utils/enum-to-array';

const StatusSelect = styled.select({
  textTransform: 'lowercase',
  option: {},
  padding: '5px',
  border: 'none',
  background: 'white',
  borderRadius: '5px',
});

interface ITicketStatusSelect {
  id: string;
  currentStatus: TicketStatus;
}

export const TicketStatusSelect: FC<ITicketStatusSelect> = ({
  id,
  currentStatus,
}) => {
  const enabledStatus = enumToArray(TicketStatus);

  const handleSelect = (e: React.SyntheticEvent<HTMLSelectElement, Event>) => {
    e.preventDefault();
    const selectedStatus = e.currentTarget.value as TicketStatus;
    console.log(selectedStatus);
  };

  const prettyStatus = (status: string) => {
    return status.replaceAll('_', ' ');
  };

  return (
    <StatusSelect
      name='TicketStatusSelect'
      id={id}
      defaultValue={currentStatus}
      onChange={handleSelect}
    >
      {enabledStatus.map((status, key) => (
        <option key={key} value={status as string}>
          {prettyStatus(status as string)}
        </option>
      ))}
    </StatusSelect>
  );
};
