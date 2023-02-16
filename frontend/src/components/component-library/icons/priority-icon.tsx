import {
  BsChevronCompactUp,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
} from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TicketPriority } from '../../../apollo/graphql-generated/types';
export const PriorityIcon = (props: {
  priority: TicketPriority;
  size?: number;
}) => {
  switch (props.priority) {
    case TicketPriority.URGENT:
      return (
        <BsChevronDoubleUp size={props.size} title={TicketPriority.URGENT} />
      );
    case TicketPriority.HIGHT:
      return (
        <BsChevronCompactUp size={props.size} title={TicketPriority.HIGHT} />
      );
    case TicketPriority.MEDIUM:
      return (
        <RxHamburgerMenu size={props.size} title={TicketPriority.MEDIUM} />
      );
    case TicketPriority.LOW:
      return (
        <BsChevronDoubleDown size={props.size} title={TicketPriority.LOW} />
      );
  }
};
