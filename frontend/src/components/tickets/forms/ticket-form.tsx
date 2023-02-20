import { FC, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Ticket,
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../../apollo/graphql-generated/types';
import {
  useTicketCreateMutation,
  useTicketDeleteMutation,
  useTicketUpdateMutation,
} from '../../../apollo/graphql/tickets/ticket.generated';
import { breakPoints } from '../../../assets/theme';
import { ticketPriorities } from '../../../helpers/ticket-priorities';
import { ticketTypes } from '../../../helpers/ticket-types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { useForm } from '../../../hooks/use-form.hook';
import { useTicketReferences } from '../../../hooks/use-ticket-references.hook';
import { createTicketMutation } from '../../../modules/ticket-modules/create-ticket';
import { deleteTicketMutation } from '../../../modules/ticket-modules/delete-ticket';
import { updateTicketMutation } from '../../../modules/ticket-modules/update-ticket';
import { MainSelectOption } from '../../../types';
import { EActionTypes } from '../../../types/enums/common.enum';
import { ITicket } from '../../../types/interfaces/ticket.interface';
import { stringPrettier } from '../../../utils/string-prettier';
import { FormActions } from '../../component-library/form-actions/form-actions';
import { PriorityIcon } from '../../component-library/icons/priority-icon';
import { TicketTypeIcon } from '../../component-library/icons/ticket-type-icon';
import { MainSelect } from '../../component-library/main-select/main-select';
import { MyAlert } from '../../component-library/my-alert/my-alert';
import { Modal } from '../../modal/modal';
import { TicketReferences } from '../ticket-references/ticket-references';

const FormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textarea: {
      gridRow: 10,
    },
  },
  [`@media screen and (max-width: ${breakPoints.lg})`]: {
    '#ticket-form-row': {
      flexDirection: 'column',
      div: {
        width: '100%',
      },
    },
  },
});

interface ITicketForm extends ITicket {
  tickets: Ticket[];
  projectName: string;
  initialValues: TicketCreateInput;
  action: EActionTypes;
  toggle: () => void;
  toggleCallBackFn: () => void;
}

export const TicketForm: FC<ITicketForm> = ({
  action,
  tickets,
  projectName,
  initialValues,
  toggle,
  refetchMyTickets,
  toggleCallBackFn,
}) => {
  const { ticketId } = useParams();
  const [success, setSuccess] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  const [actionType, setActionType] = useState<EActionTypes>(action);

  const [createTicket, { loading: createLoading, data: createData }] =
    useTicketCreateMutation();
  const [updateTicket, { loading: updateLoading, data: updateData }] =
    useTicketUpdateMutation();
  const [deleteTicket, { loading: deleteLoading, data: deleteData }] =
    useTicketDeleteMutation();

  const loading = createLoading || updateLoading || deleteLoading;
  const data = createData || updateData || deleteData;

  useEffect(() => {
    if (data) {
      refetchMyTickets();
    }
  }, [data]);

  const resetForm = () => {
    setAlertMessage(null);
    setSuccess(false);
  };

  const selectMutation = async () => {
    switch (actionType) {
      case EActionTypes.CREATE:
        return await createTicketMutation({
          values: {
            ...values,
            references,
          },
          setSuccess,
          createTicket,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.UPDATE:
        return await updateTicketMutation({
          ticketId: ticketId as string,
          values: {
            ...values,
            references,
          },
          setSuccess,
          updateTicket,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.DELETE:
        return await deleteTicketMutation({
          ticketId: ticketId as string,
          setSuccess,
          deleteTicket,
          setAlertMessage,
          setAlertMessageColor,
        });
    }
  };

  const { handleChange, references } = useTicketReferences({
    initialState: initialValues.references as string[],
  });

  const { onChange, onSubmit, values } = useForm({
    callback: selectMutation,
    initialState: initialValues,
  });

  const [priority, setPriority] = useState<TicketPriority>(values.priority);
  const [type, setType] = useState<TicketType>(values.type);

  const ticketStatusOptions: MainSelectOption[] = [
    {
      value: TicketStatus.TO_DO,
      content: stringPrettier(TicketStatus.TO_DO),
    },
    {
      value: TicketStatus.BACKLOG,
      content: stringPrettier(TicketStatus.BACKLOG),
    },
  ];

  const ticketPriorityOptions: MainSelectOption[] = Object.entries(
    ticketPriorities
  ).map((obj) => {
    const priority = obj[0];
    const values = obj[1];
    return {
      value: priority,
      content: values.title,
    };
  });

  const ticketTypeOptions: MainSelectOption[] = Object.entries(ticketTypes).map(
    (obj) => {
      const type = obj[0];
      const values = obj[1];
      return {
        value: type,
        content: values.title,
      };
    }
  );

  return (
    <Modal
      toggle={toggle}
      closeOnBackdrop={true}
      title={`${projectName} - ${translate(
        TEXT.forms.ticketForms[actionType].title
      )}`}
      maxWidth={'800px'}
      callBackFn={toggleCallBackFn}
    >
      <FormDiv>
        <Form
          onSubmit={(e) => onSubmit(e)}
          onChange={() => {
            if (alertMessage) {
              resetForm();
            }
          }}
        >
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.ticketForms[actionType].labels.title)}
            </Form.Label>
            <Form.Control
              name='title'
              type='text'
              onChange={onChange}
              disabled={loading || actionType === EActionTypes.DELETE}
              value={values.title}
            />
          </Form.Group>
          <Row id='ticket-form-row' className='justify-content-center mb-5'>
            <Col className='col-8'>
              <Form.Group className='mb-3 w-100'>
                <Form.Label>
                  {translate(
                    TEXT.forms.ticketForms[actionType].labels.description
                  )}
                </Form.Label>
                <textarea
                  name='description'
                  className='form-control'
                  rows={8}
                  onChange={onChange}
                  disabled={loading || actionType === EActionTypes.DELETE}
                  value={values.description || ''}
                />
              </Form.Group>
              <TicketReferences
                referenceOptions={tickets}
                onChange={handleChange}
                activeReferences={initialValues.references as string[]}
                toggle={toggle}
                disabled={loading || actionType === EActionTypes.DELETE}
              />
            </Col>
            <Col className='col-4 mt-4'>
              <Form.Group className='mb-3'>
                <MainSelect
                  name='status'
                  value={values.status}
                  options={ticketStatusOptions}
                  onChange={onChange}
                  disabled={loading || actionType === EActionTypes.DELETE}
                />
              </Form.Group>
              <Form.Group className='mb-3 w-100'>
                <div className='d-flex align-items-center gap-2'>
                  <TicketTypeIcon type={type} size={25} />
                  <MainSelect
                    name='type'
                    value={values.type}
                    options={ticketTypeOptions}
                    onChange={(e) => {
                      onChange(e);
                      setType(e.target.value as TicketType);
                    }}
                    disabled={loading || actionType === EActionTypes.DELETE}
                  />
                </div>
              </Form.Group>
              <Form.Group className='mb-3'>
                <div className='d-flex align-items-center gap-2'>
                  <PriorityIcon priority={priority} size={25} />
                  <MainSelect
                    name='priority'
                    value={values.priority}
                    options={ticketPriorityOptions}
                    onChange={(e) => {
                      onChange(e);
                      setPriority(e.target.value as TicketPriority);
                    }}
                    disabled={loading || actionType === EActionTypes.DELETE}
                  />
                </div>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  {translate(
                    TEXT.forms.ticketForms[actionType].labels.storyPoints
                  )}
                </Form.Label>
                <Form.Control
                  name='storyPoints'
                  type='number'
                  min={0}
                  onChange={onChange}
                  disabled={loading || actionType === EActionTypes.DELETE}
                  value={Number(values.storyPoints)}
                />
              </Form.Group>
            </Col>
          </Row>
          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          <FormActions
            loading={loading}
            form={'ticketForms'}
            actionType={actionType}
            onCancel={() => {
              toggle();
              toggleCallBackFn();
            }}
            setAlertMessage={setAlertMessage}
            setActionType={setActionType}
            success={success}
          />
        </Form>
      </FormDiv>
    </Modal>
  );
};
