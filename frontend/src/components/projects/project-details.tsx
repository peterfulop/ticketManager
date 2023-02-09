import { FC } from 'react';
import styled from 'styled-components';
import { useGetMyProjectQuery } from '../../apollo/graphql/project/project.generated';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { Modal } from '../modal/modal';

const Details = styled.div({
  p: {
    fontWeight: 'bold',
  },
  span: {
    marginLeft: '5px',
    fontWeight: 'lighter',
  },
  // [`@media screen and (max-width: ${breakPoints.sm})`]: {
  //   p: {
  //     display: 'none',
  //   },
  //   maxWidth: 100,
  // },
});

interface IProjectDetails {
  toggle: () => void;
  projectId: string;
}

export const ProjectDetails: FC<IProjectDetails> = ({ toggle, projectId }) => {
  const { data, loading, error } = useGetMyProjectQuery({
    variables: {
      id: projectId,
    },
  });

  const DateFormat = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <Modal
      toggle={toggle}
      closeOnBackdrop={true}
      title={translate(TEXT.pages.projects.labels.projectDetails)}
    >
      {!loading && error && <p>{translate(TEXT.general.serverError)}</p>}
      {loading && <p>{translate(TEXT.general.loading)}</p>}
      {data && (
        <Details>
          <p>
            {translate(TEXT.pages.projects.labels.projectName)}
            <span>{data.getMyProject.project?.name}</span>
          </p>
          <p>
            {translate(TEXT.pages.projects.labels.sequence)}
            <span>{data.getMyProject.project?.sequence}</span>
          </p>
          <p>
            {translate(TEXT.pages.projects.labels.tickets)}
            <span>{data.getMyProject.project?.tickets.length}</span>
          </p>
          <p>
            {translate(TEXT.pages.projects.labels.createdAt)}
            <span>
              {DateFormat(data.getMyProject.project?.createdAt || '')}
            </span>
          </p>
          <p>
            {translate(TEXT.pages.projects.labels.updatedAt)}
            <span>
              {DateFormat(data.getMyProject.project?.createdAt || '')}
            </span>
          </p>
        </Details>
      )}
    </Modal>
  );
};
