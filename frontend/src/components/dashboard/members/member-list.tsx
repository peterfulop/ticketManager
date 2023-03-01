import { FC } from 'react';
import { User } from '../../../apollo/graphql-generated/types';
import { MemberListItem } from './member-list-item';

interface IMemberList {
  users: User[];
}

export const MemberList: FC<IMemberList> = ({ users }) => {
  return (
    <div className='m-2'>
      {users.length > 0 ? (
        users.map((user, key) => {
          return <MemberListItem key={key} user={user} />;
        })
      ) : (
        <p>{'No members yet...'}</p>
      )}
    </div>
  );
};
