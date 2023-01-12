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
  let icon: JSX.Element;
  switch (props.priority) {
    case TicketPriority.URGENT:
      icon = (
        <BsChevronDoubleUp size={props.size} title={TicketPriority.URGENT} />
      );
      break;
    case TicketPriority.HIGHT:
      icon = (
        <BsChevronCompactUp size={props.size} title={TicketPriority.HIGHT} />
      );
      break;
    case TicketPriority.MEDIUM:
      icon = (
        <RxHamburgerMenu size={props.size} title={TicketPriority.MEDIUM} />
      );
      break;
    case TicketPriority.LOW:
      icon = (
        <BsChevronDoubleDown size={props.size} title={TicketPriority.LOW} />
      );
      break;
  }
  return icon;
};
