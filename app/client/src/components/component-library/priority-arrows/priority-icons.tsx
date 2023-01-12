import {
  BsChevronCompactUp,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
} from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TicketPriority } from '../../../apollo/graphql-generated/types';
export const PriorityIcon = (props: { priority: TicketPriority }) => {
  let icon: JSX.Element;
  switch (props.priority) {
    case TicketPriority.URGENT:
      icon = <BsChevronDoubleUp />;
      break;
    case TicketPriority.HIGHT:
      icon = <BsChevronCompactUp />;
      break;
    case TicketPriority.MEDIUM:
      icon = <RxHamburgerMenu />;
      break;
    case TicketPriority.LOW:
      icon = <BsChevronDoubleDown />;
      break;
  }
  return icon;
};
