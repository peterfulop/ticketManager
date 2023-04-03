import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../../../apollo/graphql-generated/types';
import { RoutePath } from '../../../types/enums/routes.enum';
import { MemberListItem } from './member-list-item';

interface IMemberList {
  users: User[];
}

export const MemberList: FC<IMemberList> = ({ users }) => {
  const { projectId } = useParams();

  return (
    <div className='m-2'>
      {users.length > 0 ? (
        users.map((user, key) => {
          return (
            <MemberListItem
              modalURL={RoutePath.DASHBOARD_USER_DETAILS.replace(
                ':projectId',
                projectId as string
              ).replace(':userId', user.id)}
              key={key}
              user={user}
            />
          );
        })
      ) : (
        <p>{'No members yet...'}</p>
      )}
    </div>
  );
};
