import { useParams } from 'react-router-dom';
import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../component-library/main-layout/main-layout';
import { useGetTicketQuery } from './query/get-tickets.generated';

export const Ticket = (): JSX.Element => {
  const { ticketId } = useParams();

  const { data, error, loading } = useGetTicketQuery({
    variables: {
      getTicketId: ticketId as string,
    },
    skip: !ticketId,
  });

  if (loading) {
    return <div>{EnStrings.COMMONS.LOADING}</div>;
  }

  if (error || !data) {
    return <div>{EnStrings.SCREENS.POSTS.ERRORS.ERROR_ON_LOADING}</div>;
  }

  const { ticket } = data.getTicket;

  return (
    <MainLayout>
      <h1>Ticket details</h1>
      <div>
        <h2>{ticket?.title}</h2>
        <h3>{ticket?.status}</h3>
        <h3>{ticket?.priority}</h3>
        <p>{ticket?.projectId}</p>
        <p>{ticket?.createdAt}</p>
        <small>{ticket?.comment}</small>
      </div>
    </MainLayout>
  );
};
