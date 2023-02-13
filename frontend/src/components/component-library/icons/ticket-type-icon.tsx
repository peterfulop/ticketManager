import { BiBookmark, BiBug, BiTask } from 'react-icons/bi';
import { RiShieldFlashLine } from 'react-icons/ri';
import { TicketType } from '../../../apollo/graphql-generated/types';
export const TicketTypeIcon = (props: { type: TicketType; size: number }) => {
  switch (props.type) {
    case TicketType.BUG:
      return (
        <BiBug size={props.size} title={TicketType.BUG} color={'tomato'} />
      );
    case TicketType.EPIC:
      return (
        <RiShieldFlashLine
          size={props.size}
          title={TicketType.EPIC}
          color={'orange'}
        />
      );
    case TicketType.STORY:
      return (
        <BiBookmark
          size={props.size}
          title={TicketType.STORY}
          color={'green'}
        />
      );
    case TicketType.TASK:
      return (
        <BiTask size={props.size} title={TicketType.TASK} color={'blue'} />
      );
  }
};
