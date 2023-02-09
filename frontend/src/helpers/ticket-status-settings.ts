import { TicketStatus } from '../apollo/graphql-generated/types';

export type EnabledTicketStatuses = Exclude<
  TicketStatus,
  TicketStatus.Archived | TicketStatus.Backlog
>;

export type TicketStatusOptions = {
  sequence: number;
  title: string;
};

export const ticketStatusObjects: Record<
  EnabledTicketStatuses,
  TicketStatusOptions
> = {
  [TicketStatus.ToDo]: {
    sequence: 1,
    title: 'Todo',
  },
  [TicketStatus.InProgress]: { sequence: 2, title: 'In progress' },
  [TicketStatus.Blocked]: { sequence: 3, title: 'Blocked' },
  [TicketStatus.Review]: { sequence: 4, title: 'Review' },
  [TicketStatus.Done]: { sequence: 5, title: 'Done' },
};
