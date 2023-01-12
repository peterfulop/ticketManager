import { Button } from 'react-bootstrap';
import { Project } from '../../../apollo/graphql-generated/types';
import './ProjectItem.css';

export const ProjectItem = (props: {
  projectItem: Project;
  currentPath: string;
}): JSX.Element => {
  const { id, name, createdAt } = props.projectItem;
  return (
    <div className={'project-item'}>
      <h3>{name}</h3>
      <p>{createdAt && new Date(createdAt).toLocaleString()}</p>
      <Button
        href={`${props.currentPath}/${id}/tickets`}
        variant="secondary"
        type="button"
      >
        {'Tickets'}
      </Button>
    </div>
  );
};
