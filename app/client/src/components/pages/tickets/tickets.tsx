import { useParams } from 'react-router';
import { Ticket } from '../../../apollo/graphql-generated/types';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import { TicketColumns } from '../../component-library/ticket-columns/ticket-columns';
import { useGetMyTicketsQuery } from './query/get-tickets.generated';

export const Tickets = (): JSX.Element => {
  const { projectId } = useParams();

  const { data, error, loading } = useGetMyTicketsQuery({
    variables: {
      ticketSearchParams: { projectId },
    },
    skip: !projectId,
  });

  if (loading) {
    return <div>{EnStrings.COMMONS.LOADING}</div>;
  }

  if (error || !data) {
    return <div>{EnStrings.SCREENS.POSTS.ERRORS.ERROR_ON_LOADING}</div>;
  }

  const { tickets } = data.getMyTickets;

  const currentPATH = window.location.pathname;

  return (
    <MainLayout>
      <h1>Tickets</h1>
      <TicketColumns tickets={tickets as Ticket[]} currentPath={currentPATH} />
    </MainLayout>
  );
};
