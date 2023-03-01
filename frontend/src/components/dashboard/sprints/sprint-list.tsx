import { FC } from 'react';
import { Sprint } from '../../../apollo/graphql-generated/types';
import { DashboardModal } from '../../../pages/dashboard';
import { SprintListItem } from './sprint-list-item';

interface ISprintList {
  sprints: Sprint[];
  toggle: () => void;
  setDashboardModal: React.Dispatch<React.SetStateAction<DashboardModal>>;
}

export const SprintList: FC<ISprintList> = ({ sprints }) => {
  return (
    <div className='m-2'>
      {sprints.length > 0 ? (
        sprints.map((sprint, key) => {
          return <SprintListItem key={key} sprint={sprint} />;
        })
      ) : (
        <p>{'No sprints yet...'}</p>
      )}
    </div>
  );
};
