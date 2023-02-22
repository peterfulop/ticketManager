import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { EActionTypes } from '../../../types/enums/common.enum';
import { ERoutePath } from '../../../types/enums/routes.enum';

const ReferencesDiv = styled.div({
  small: {
    display: 'block',
    color: 'tomato',
    fontStyle: 'italic',
    marginBottom: '1rem',
  },
});

const CurrentReferences = styled.div({
  marginBottom: '1rem',
  maxHeight: '100px',
  overflow: 'auto',
});

const RefLink = styled.p({
  textDecoration: 'underline',
  color: 'blue',
  cursor: 'pointer',
});

const AvailableReferences = styled.div({
  width: '100%',
  height: '100px',
  overflow: 'auto',
  marginTop: '.5rem',
  padding: '5px',
  border: '1px solid lightGray',
  borderRadius: '5px',
  label: {
    maxWidth: '450px',
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
  onChange,
  toggle,
}) => {
  const { ticketId, projectId } = useParams();
  const navigate = useNavigate();

  return (
    <ReferencesDiv>
      <p>{translate(TEXT.forms.ticketForms.CREATE.labels.references)}</p>
      {actionType !== EActionTypes.CREATE && currentReferencies.length > 0 ? (
        <>
          <CurrentReferences>
            {referenceOptions.map((option, key) => {
              const refTicketPath = ERoutePath.TICKET_DETAILS.replace(
                ':projectId',
                projectId as string
              ).replace(':ticketId', option.id);
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
        </>
      ) : (
        <small>
          {translate(TEXT.forms.ticketForms.CREATE.labels.noReferences)}
        </small>
      )}
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
    </ReferencesDiv>
  );
};
