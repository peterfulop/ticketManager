import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import { CiUser } from 'react-icons/ci';
import { User } from '../../../apollo/graphql-generated/types';

interface IMemberListItem {
  user: User;
}

export const MemberListItem: FC<IMemberListItem> = ({ user }) => {
  return (
    <Row>
      <Col>
        <CiUser size={25} />
      </Col>
      <Col>
        <p>{user.name}</p>
        <div>
          <small>{user.email}</small>
          {/* <small>{user.endDate}</small> */}
        </div>
      </Col>
    </Row>
  );
};
