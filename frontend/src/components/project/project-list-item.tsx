import { FC } from 'react';
import { Project } from '../../apollo/graphql-generated/types';
import { IReact } from '../../types/interfaces/common.interface';

interface IProjectListItem extends IReact {
  project: Project;
}

export const ProjectListItem: FC<IProjectListItem> = ({ project }) => {
  return (
    <div>
      <p>{project.id}</p>
      <p>{project.name}</p>
    </div>
  );
};
