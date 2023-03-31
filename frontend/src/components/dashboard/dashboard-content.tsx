import { FC } from 'react';
import { FiPlus } from 'react-icons/fi';
import styled from 'styled-components';
import { Project, TicketStatus } from '../../apollo/graphql-generated/types';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { ERoutePath } from '../../types/enums/routes.enum';
import { ITicket } from '../../types/interfaces/ticket.interface';
import { MainButton } from '../component-library/main-button/main-button';
import { TicketSingleList } from '../tickets/ticket-single-list/ticket-single-list';
import { MemberList } from './members/member-list';
import { ProjectDetails } from './project-details/project-details';
import { SprintList } from './sprints/sprint-list';

const Content = styled.div({
  marginTop: '2rem',
  padding: '.5rem',
  background: '#f4f5f7',
  display: 'flex',
  justifyContent: 'flex-start',
  flexWrap: 'wrap',
});

const ContentColumn = styled.div({
  display: 'flex',
  flexDirection: 'column',
});

const ContentRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  width: '100%',
  flexWrap: 'wrap',
});

const DashboardBox = styled.div({
  borderRadius: '5px',
  backgroundColor: 'rgb(255, 255, 255)',
  boxShadow: '0 1px 2px 0 rgba(9, 30, 66, 0.25)',
  margin: '5px',
});

const DashboardBoxTitle = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '5px 10px',
  alignItems: 'center',
  background: '#dbdbdb',
  minHeight: '48px',
  h5: {
    margin: 0,
  },
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
});

interface IDashboardContent extends ITicket {
  project: Project;
  toggle: () => void;
}

export const DashboardContent: FC<IDashboardContent> = ({
  project,
  toggle,
  setDashboardModalState,
  refetch,
}) => {
  const anyActiveSprints =
    project.sprints.filter((sprint) => sprint.closed === false).length > 0;

  return (
    <Content>
      <ContentColumn style={{ flex: '2' }}>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Details</h5>
          </DashboardBoxTitle>
          <ProjectDetails project={project} />
        </DashboardBox>
        <ContentRow>
          <DashboardBox style={{ flex: '1' }}>
            <DashboardBoxTitle>
              <h5>Sprints</h5>
              <MainButton
                glowing={!anyActiveSprints}
                label={translate(TEXT.buttons.addBtn)}
                handleClick={() => {
                  setDashboardModalState &&
                    setDashboardModalState('SprintForm');
                  toggle();
                }}
              >
                <FiPlus size={20} />
              </MainButton>
            </DashboardBoxTitle>
            <SprintList sprints={project.sprints} toggle={toggle} />
          </DashboardBox>
          <DashboardBox style={{ flex: '1' }}>
            <DashboardBoxTitle>
              <h5>Members</h5>
              <MainButton
                label={translate(TEXT.buttons.addBtn)}
                handleClick={() => null}
              >
                <FiPlus size={20} />
              </MainButton>
            </DashboardBoxTitle>
            <MemberList users={project.users} />
          </DashboardBox>
        </ContentRow>
      </ContentColumn>
      <ContentColumn style={{ flex: '1' }}>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Active tickets</h5>
          </DashboardBoxTitle>
          <TicketSingleList
            modalURL={ERoutePath.DASHBOARD_TICKET_DETAILS}
            setDashboardModalState={setDashboardModalState}
            refetch={refetch}
            isStatusUpdate={true}
            tickets={project.tickets.filter(
              (ticket) =>
                ticket.status !== TicketStatus.ARCHIVED &&
                ticket.status !== TicketStatus.BACKLOG
            )}
          />
        </DashboardBox>
      </ContentColumn>
      <ContentColumn style={{ flex: '1' }}>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Backlog</h5>
          </DashboardBoxTitle>
          <TicketSingleList
            modalURL={ERoutePath.DASHBOARD_TICKET_DETAILS}
            setDashboardModalState={setDashboardModalState}
            style={{ maxHeight: '315px' }}
            refetch={refetch}
            isStatusUpdate={true}
            tickets={project.tickets.filter(
              (ticket) => ticket.status === TicketStatus.BACKLOG
            )}
          />
        </DashboardBox>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Archived</h5>
          </DashboardBoxTitle>
          <TicketSingleList
            modalURL={ERoutePath.DASHBOARD_TICKET_DETAILS}
            setDashboardModalState={setDashboardModalState}
            style={{ maxHeight: '315px' }}
            isStatusUpdate={false}
            tickets={project.tickets.filter(
              (ticket) => ticket.status === TicketStatus.ARCHIVED
            )}
          />
        </DashboardBox>
      </ContentColumn>
    </Content>
  );
};
