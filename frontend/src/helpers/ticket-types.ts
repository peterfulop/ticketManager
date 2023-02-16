import { TicketStatus, TicketType } from '../apollo/graphql-generated/types';
import { Option } from '../types';

export type EnabledTicketStatuses = Exclude<
  TicketStatus,
  TicketStatus.ARCHIVED | TicketStatus.BACKLOG
>;

export const ticketTypes: Record<TicketType, Option> = {
  [TicketType.TASK]: {
    sequence: 1,
    title: 'Task',
  },
  [TicketType.BUG]: {
    sequence: 2,
    title: 'Bug',
  },
  [TicketType.EPIC]: {
    sequence: 3,
    title: 'Epic',
  },
  [TicketType.STORY]: {
    sequence: 4,
    title: 'Story',
  },
};
