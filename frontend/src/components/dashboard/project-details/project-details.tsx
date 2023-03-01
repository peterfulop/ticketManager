import { FC } from 'react';
import styled from 'styled-components';
import { Project } from '../../../apollo/graphql-generated/types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { dateFormat } from '../../../utils/date-format';

const Details = styled.div({
  p: {
    fontWeight: 'bold',
  },
  span: {
    marginLeft: '5px',
    fontWeight: 'lighter',
  },
});

interface IProjectDetails {
  project: Project;
}

export const ProjectDetails: FC<IProjectDetails> = ({ project }) => {
  return (
    <Details className='m-2'>
      <p>
        {'shared:'}
        <span>{String(project.shared)}</span>
      </p>
      <p>
        {translate(TEXT.pages.projects.labels.sequence)}
        <span>{project.sequence}</span>
      </p>
      <p>
        {translate(TEXT.pages.projects.labels.tickets)}
        <span>{project.tickets.length}</span>
      </p>
      <p>
        {translate(TEXT.pages.projects.labels.createdAt)}
        <span>{dateFormat(project.createdAt || '')}</span>
      </p>
      <p>
        {translate(TEXT.pages.projects.labels.updatedAt)}
        <span>{dateFormat(project.createdAt || '')}</span>
      </p>
    </Details>
  );
};
