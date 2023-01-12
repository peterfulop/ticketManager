import { TicketPriority } from '../apollo/graphql-generated/types';
import { PriorityHightArrow } from '../components/component-library/priority-arrows/priority-hight.arrow';
import { PriorityLowArrow } from '../components/component-library/priority-arrows/priority-low.arrow';
import { PriorityMediumIcon } from '../components/component-library/priority-arrows/priority-medium.arrow';
import { PriorityUrgentArrow } from '../components/component-library/priority-arrows/priority-urgent.arrow';

export type TicketPriorityObject = {
  icon: JSX.Element;
};

export type ticketPriorityObjectType = Record<
  TicketPriority,
  TicketPriorityObject
>;

export const ticketPriorityObjects: ticketPriorityObjectType = {
  [TicketPriority.URGENT]: {
    icon: PriorityUrgentArrow(),
  },
  [TicketPriority.HIGHT]: {
    icon: PriorityHightArrow(),
  },
  [TicketPriority.MEDIUM]: {
    icon: PriorityMediumIcon(),
  },
  [TicketPriority.LOW]: {
    icon: PriorityLowArrow(),
  },
};
