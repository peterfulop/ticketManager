import { TicketPriority } from '../apollo/graphql-generated/types';
import { Option } from '../types';

export const ticketPriorities: Record<TicketPriority, Option> = {
  [TicketPriority.URGENT]: {
    sequence: 1,
    title: 'Urgent',
  },
  [TicketPriority.HIGHT]: {
    sequence: 2,
    title: 'High',
  },
  [TicketPriority.MEDIUM]: {
    sequence: 3,
    title: 'Medium',
  },
  [TicketPriority.LOW]: {
    sequence: 4,
    title: 'Low',
  },
};
