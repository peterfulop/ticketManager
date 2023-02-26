import { FC } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { EActionTypes } from '../../../types/enums/common.enum';

const ReferencesDiv = styled(Row)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '2rem',
  small: {
    display: 'block',
    color: 'tomato',
    fontStyle: 'italic',
    marginBottom: '1.20rem',
  },
});

const CurrentReferences = styled.div({
  height: '120px',
  overflow: 'auto',
  marginTop: '.5rem',
  padding: '5px 10px',
  border: '1px solid lightGray',
  borderRadius: '5px',
});

const RefLink = styled.p({
  textDecoration: 'underline',
  color: 'blue',
  cursor: 'pointer',
  padding: '2.5px',
});

const AvailableReferences = styled.div({
  height: '120px',
  overflow: 'auto',
  marginTop: '.5rem',
  padding: '5px',
  border: '1px solid lightGray',
  borderRadius: '5px',
  label: {
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
});

interface ITicketReferences {
  referenceOptions: Ticket[];
  currentReferencies: string[];
  activeReferences: string[];
  actionType: EActionTypes;
  modalURL: string;
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  toggle?: () => void;
}

export const TicketReferences: FC<ITicketReferences> = ({
  referenceOptions,
  activeReferences,
  currentReferencies,
  disabled,
  actionType,
  modalURL,
  onChange,
  toggle,
}) => {
  const { ticketId, projectId } = useParams();
  const navigate = useNavigate();

  return (
    <ReferencesDiv>
      <Col
        className={`${actionType === EActionTypes.CREATE ? 'col-12' : 'col-6'}`}
      >
        <p>
          {translate(TEXT.forms.ticketForms.CREATE.labels.availableReferences)}
        </p>
        <AvailableReferences>
          {referenceOptions
            .filter((option) => option.id !== ticketId)
            .map((option, key) => {
              const isExists = activeReferences.includes(option.id);
              return (
                <Form.Check
                  id={option.id}
                  key={key}
                  title={option.title}
                  label={`${option.sequenceId} - ${option.title}`}
                  type={'checkbox'}
                  onChange={onChange}
                  defaultChecked={isExists}
                  disabled={disabled}
                />
              );
            })}
        </AvailableReferences>
      </Col>
      {actionType !== EActionTypes.CREATE && (
        <Col className='col-6'>
          <p>{translate(TEXT.forms.ticketForms.CREATE.labels.references)}</p>
          {currentReferencies.length > 0 ? (
            <CurrentReferences>
              {referenceOptions.map((option, key) => {
                const refTicketPath = modalURL
                  .replace(':projectId', projectId as string)
                  .replace(':ticketId', option.id);
                const isExists = currentReferencies.includes(option.id);
                return (
                  isExists && (
                    <RefLink
                      key={key}
                      onClick={() => {
                        navigate(refTicketPath);
                        toggle && toggle();
                      }}
                      title={refTicketPath}
                      aria-disabled={disabled}
                    >{`${option.sequenceId} - ${option.title}`}</RefLink>
                  )
                );
              })}
            </CurrentReferences>
          ) : (
            <small>
              {translate(TEXT.forms.ticketForms.CREATE.labels.noReferences)}
            </small>
          )}
        </Col>
      )}
    </ReferencesDiv>
  );
};
