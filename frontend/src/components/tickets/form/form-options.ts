import {
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../../apollo/graphql-generated/types';
import { Option } from '../../../types';

export type EnabledTicketStatuses = Exclude<
  TicketStatus,
  TicketStatus.ARCHIVED
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
  [TicketStatus.BACKLOG]: { sequence: 6, title: 'Backlog' },
};

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
