import { BiBookmark, BiBug, BiTask } from 'react-icons/bi';
import { RiShieldFlashLine } from 'react-icons/ri';
import { TicketType } from '../../../apollo/graphql-generated/types';
export const TicketTypeIcon = (props: { type: TicketType; size: number }) => {
  let icon: JSX.Element;
  switch (props.type) {
    case TicketType.BUG:
      icon = (
        <BiBug size={props.size} title={TicketType.BUG} color={'tomato'} />
      );
      break;
    case TicketType.EPIC:
      icon = (
        <RiShieldFlashLine
          size={props.size}
          title={TicketType.EPIC}
          color={'orange'}
        />
      );
      break;
    case TicketType.STORY:
      icon = (
        <BiBookmark
          size={props.size}
          title={TicketType.STORY}
          color={'green'}
        />
      );
      break;
    case TicketType.TASK:
      icon = (
        <BiTask size={props.size} title={TicketType.TASK} color={'blue'} />
      );
      break;
  }
  return icon;
};
