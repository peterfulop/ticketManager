import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { Ticket, TicketStatus } from '../../apollo/graphql-generated/types';
import { useTicketStatusUpdateMutation } from '../../apollo/graphql/tickets/ticket.generated';
import { breakPoints } from '../../assets/theme';
import { useUserErrorHandler } from '../../hooks/use-user-errors-handler.hook';
import { ITicket } from '../../types/interfaces/ticket.interface';
import { setSelectOptions } from '../../utils/set-select-options';
import { PriorityIcon } from '../component-library/icons/priority-icon';
import { TicketTypeIcon } from '../component-library/icons/ticket-type-icon';
import { MainSelect } from '../component-library/main-select/main-select';
import { ticketStatuses } from './form/form-options';
import { SequneceId } from './sequnce-id/sequence-id';

const TicketComponent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  justifyItems: 'center',
  alignItems: 'flex-start',
  padding: '10px',
  margin: '0.25rem 0.5rem',
  borderRadius: '5px',
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: '0 1px 2px 0 rgba(9, 30, 66, 0.25)',
  ':hover': {
    cursor: 'pointer',
    backgroundColor: 'rgb(227, 236, 242)',
  },
  ':hover select': {
    display: 'block',
  },
});

const TicketItemHeading = styled.div({
  width: '100%',
  display: 'flex',
  height: '50px',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '5px',
  overflow: 'hidden',
  p: {
    margin: '0 10px 10px 0',
  },
  select: {
    display: 'none',
    width: '135px',
    textTransform: 'lowercase',
  },
  [`@media screen and (max-width: ${breakPoints.xl})`]: {
    display: 'block',
    height: '80px',
  },
});

const Symbols = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '.75rem',
});

const StoryPoints = styled.p({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '13px',
  backgroundColor: 'rgb(225, 225, 225)',
  width: '25px',
  height: '25px',
  borderRadius: '12.5px',
});

const TicketItemContent = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '1rem',
  padding: '5px',
  [`@media screen and (max-width: ${breakPoints.xl})`]: {
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  [`@media screen and (max-width: ${breakPoints.md})`]: {
    flexDirection: 'row',
  },
});

interface ITicketItem extends ITicket {
  ticketItem: Ticket;
  modalURL: string;
  isStatusUpdate: boolean;
}

export const TicketItem: FC<ITicketItem> = ({
  ticketItem,
  modalURL,
  isStatusUpdate,
  refetch,
  setDashboardModalState,
}) => {
  const { id, title, status, priority, type, storyPoints, sequenceId } =
    ticketItem;

  const navigate = useNavigate();
  const [
    updateStatus,
    { loading, data: updateStatusData, error: graphqlError },
  ] = useTicketStatusUpdateMutation();

  const { checkErrorMessage } = useUserErrorHandler();

  useEffect(() => {
    const userErrors = updateStatusData?.ticketStatusUpdate.userErrors;
    if (!loading) {
      checkErrorMessage({ userErrors, graphqlError });
    }
  }, [updateStatusData]);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateStatus({
      variables: {
        input: {
          ticketId: id,
          status: e.target.value as TicketStatus,
        },
      },
    });
    refetch && (await refetch());
  };

  const handleClick = () => {
    setDashboardModalState && setDashboardModalState('TicketForm');
    navigate(modalURL);
  };

  return (
    <TicketComponent onClick={handleClick}>
      <TicketItemHeading>
        <p title={title}>{title}</p>
        {isStatusUpdate && (
          <MainSelect
            id={id}
            name='ticket-status'
            value={status}
            options={setSelectOptions(ticketStatuses)}
            onChange={handleChange}
          />
        )}
      </TicketItemHeading>
      <TicketItemContent>
        <Symbols>
          <PriorityIcon priority={priority} size={20} />
          <TicketTypeIcon type={type} size={20} />
          <StoryPoints>{storyPoints}</StoryPoints>
        </Symbols>
        <SequneceId sequenceId={sequenceId} title={title} />
      </TicketItemContent>
    </TicketComponent>
  );
};
