import { BiBookmark, BiBug, BiTask } from 'react-icons/bi';
import { RiShieldFlashLine } from 'react-icons/ri';
import { TicketType } from '../../apollo/graphql-generated/types';
export const TicketTypeIcon = (props: { type: TicketType; size: number }) => {
  let icon: JSX.Element;
  switch (props.type) {
    case TicketType.Bug:
      icon = (
        <BiBug size={props.size} title={TicketType.Bug} color={'tomato'} />
      );
      break;
    case TicketType.Epic:
      icon = (
        <RiShieldFlashLine
          size={props.size}
          title={TicketType.Epic}
          color={'orange'}
        />
      );
      break;
    case TicketType.Story:
      icon = (
        <BiBookmark
          size={props.size}
          title={TicketType.Story}
          color={'green'}
        />
      );
      break;
    case TicketType.Task:
      icon = (
        <BiTask size={props.size} title={TicketType.Task} color={'blue'} />
      );
      break;
  }
  return icon;
};
