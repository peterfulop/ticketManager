import {
  BsChevronCompactUp,
  BsChevronDoubleDown,
  BsChevronDoubleUp,
} from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TicketPriority } from '../../apollo/graphql-generated/types';
export const PriorityIcon = (props: {
  priority: TicketPriority;
  size?: number;
}) => {
  let icon: JSX.Element;
  switch (props.priority) {
    case TicketPriority.Urgent:
      icon = (
        <BsChevronDoubleUp size={props.size} title={TicketPriority.Urgent} />
      );
      break;
    case TicketPriority.Hight:
      icon = (
        <BsChevronCompactUp size={props.size} title={TicketPriority.Hight} />
      );
      break;
    case TicketPriority.Medium:
      icon = (
        <RxHamburgerMenu size={props.size} title={TicketPriority.Medium} />
      );
      break;
    case TicketPriority.Low:
      icon = (
        <BsChevronDoubleDown size={props.size} title={TicketPriority.Low} />
      );
      break;
  }
  return icon;
};
