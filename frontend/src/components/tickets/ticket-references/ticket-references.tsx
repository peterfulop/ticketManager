import { FC } from 'react';
import { Form } from 'react-bootstrap';
import styled from 'styled-components';
import { Ticket } from '../../../apollo/graphql-generated/types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';

const ReferencesDiv = styled.div({});

const ReferencesAction = styled.div({
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
  activeReferences?: string[];
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const TicketReferences: FC<ITicketReferences> = ({
  referenceOptions,
  activeReferences,
  onChange,
}) => {
  return (
    <ReferencesDiv>
      <p>{translate(TEXT.forms.ticketForms.CREATE.labels.references)}</p>
      <ReferencesAction>
        {referenceOptions.map((option, key) => {
          const isExists = activeReferences?.includes(option.id);
          return (
            <Form.Check
              id={option.id}
              key={key}
              title={option.title}
              label={`${option.sequenceId} - ${option.title}`}
              type={'checkbox'}
              onChange={onChange}
              defaultChecked={isExists}
            />
          );
        })}
      </ReferencesAction>
    </ReferencesDiv>
  );
};
