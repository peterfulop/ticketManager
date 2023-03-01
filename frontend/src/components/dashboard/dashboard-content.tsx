import { FC } from 'react';
import { GrAdd } from 'react-icons/gr';
import styled from 'styled-components';
import { Project, TicketStatus } from '../../apollo/graphql-generated/types';
import { translate } from '../../helpers/translate/translate';
import { TEXT } from '../../helpers/translate/translate-objects';
import { DashboardModal } from '../../pages/dashboard';
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
  width: 'calc(100% / 3)',
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
  h5: {
    margin: 0,
  },
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
});

interface IDashboardContent {
  project: Project;
  toggle: () => void;
  setDashboardModal: React.Dispatch<React.SetStateAction<DashboardModal>>;
}

export const DashboardContent: FC<IDashboardContent> = ({
  project,
  toggle,
  setDashboardModal,
}) => {
  return (
    <Content>
      <ContentColumn>
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
                label={translate(TEXT.buttons.addBtn)}
                handleClick={() => null}
              >
                <GrAdd />
              </MainButton>
            </DashboardBoxTitle>
            <SprintList
              sprints={project.sprints}
              toggle={toggle}
              setDashboardModal={setDashboardModal}
            />
          </DashboardBox>
          <DashboardBox style={{ flex: '1' }}>
            <DashboardBoxTitle>
              <h5>Members</h5>
              <MainButton
                label={translate(TEXT.buttons.addBtn)}
                handleClick={() => null}
              >
                <GrAdd />
              </MainButton>
            </DashboardBoxTitle>
            <MemberList users={project.users} />
          </DashboardBox>
        </ContentRow>
      </ContentColumn>

      <ContentColumn>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Active tickets</h5>
            <MainButton
              label={translate(TEXT.buttons.addBtn)}
              handleClick={() => null}
            >
              <GrAdd />
            </MainButton>
          </DashboardBoxTitle>
          <TicketSingleList
            isStatusUpdate={false}
            tickets={project.tickets.filter(
              (ticket) =>
                ticket.status !== TicketStatus.ARCHIVED &&
                ticket.status !== TicketStatus.BACKLOG
            )}
          />
        </DashboardBox>
      </ContentColumn>

      <ContentColumn>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Backlog</h5>
            <MainButton
              label={translate(TEXT.buttons.addBtn)}
              handleClick={() => null}
            >
              <GrAdd />
            </MainButton>
          </DashboardBoxTitle>
          <TicketSingleList
            isStatusUpdate={false}
            tickets={project.tickets.filter(
              (ticket) => ticket.status === TicketStatus.BACKLOG
            )}
          />
        </DashboardBox>
        <DashboardBox>
          <DashboardBoxTitle>
            <h5>Archived</h5>
            <MainButton
              label={translate(TEXT.buttons.addBtn)}
              handleClick={() => null}
            >
              <GrAdd />
            </MainButton>
          </DashboardBoxTitle>
          <TicketSingleList
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
