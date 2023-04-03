import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Sprint } from '../../../apollo/graphql-generated/types';
import { RoutePath } from '../../../types/enums/routes.enum';
import { SprintListItem } from './sprint-list-item';

interface ISprintList {
  sprints: Sprint[];
  toggle: () => void;
}

export const SprintList: FC<ISprintList> = ({ sprints }) => {
  const { projectId } = useParams();

  return (
    <div className='m-2'>
      {sprints.length > 0 ? (
        sprints.map((sprint, key) => {
          return (
            <SprintListItem
              modalURL={RoutePath.DASHBOARD_SPRINT_DETAILS.replace(
                ':projectId',
                projectId as string
              ).replace(':sprintId', sprint.id)}
              key={key}
              sprint={sprint}
            />
          );
        })
      ) : (
        <p>{'No sprints yet...'}</p>
      )}
    </div>
  );
};
