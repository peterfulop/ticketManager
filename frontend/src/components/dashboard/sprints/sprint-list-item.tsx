import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { BiRun } from 'react-icons/bi';
import { RxLockClosed } from 'react-icons/rx';
import { Sprint } from '../../../apollo/graphql-generated/types';

interface ISprintListItem {
  sprint: Sprint;
}

export const SprintListItem: FC<ISprintListItem> = ({ sprint }) => {
  return (
    <Row>
      <Col>
        {sprint.closed ? <RxLockClosed size={25} /> : <BiRun size={25} />}
      </Col>
      <Col>
        <p>{sprint.title}</p>
        <div>
          <small>{sprint.startDate}</small>
          <small>{sprint.endDate}</small>
        </div>
      </Col>
    </Row>
  );
};
