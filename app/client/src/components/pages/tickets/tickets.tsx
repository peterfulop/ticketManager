import { Button } from 'react-bootstrap';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../main-layout/main-layout';
import { useGetMyTicketsQuery } from './query/get-tickets.generated';

export const Tickets = (): JSX.Element => {
  const { data, error, loading } = useGetMyTicketsQuery();

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
      {tickets?.map((ticket) => (
        <div key={ticket.id}>
          <h2>{ticket.title}</h2>
          <h3>{ticket.status}</h3>
          <h3>{ticket.priority}</h3>
          <p>{ticket.projectId}</p>
          <p>{ticket.createdAt}</p>
          <small>{ticket.comment}</small>
          <Button
            href={`${currentPATH}/${ticket?.id}`}
            variant="secondary"
            type="button"
          >
            {'Details'}
          </Button>
        </div>
      ))}
    </MainLayout>
  );
};
