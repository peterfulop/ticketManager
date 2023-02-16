import { TicketStatus } from '../apollo/graphql-generated/types';
import { Option } from '../types';

export type EnabledTicketStatuses = Exclude<
  TicketStatus,
  TicketStatus.ARCHIVED | TicketStatus.BACKLOG
>;

export const ticketStatuses: Record<EnabledTicketStatuses, Option> = {
  [TicketStatus.TO_DO]: {
    sequence: 1,
    title: 'Todo',
  },
  [TicketStatus.IN_PROGRESS]: { sequence: 2, title: 'In progress' },
  [TicketStatus.BLOCKED]: { sequence: 3, title: 'Blocked' },
  [TicketStatus.REVIEW]: { sequence: 4, title: 'Review' },
  [TicketStatus.DONE]: { sequence: 5, title: 'Done' },
};
