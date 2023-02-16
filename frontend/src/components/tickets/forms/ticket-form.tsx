import { ApolloQueryResult } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Exact,
  TicketCreateInput,
  TicketPriority,
  TicketStatus,
  TicketType,
} from '../../../apollo/graphql-generated/types';
import {
  GetMyTicketsQuery,
  useTicketCreateMutation,
  useTicketDeleteMutation,
  useTicketUpdateMutation,
} from '../../../apollo/graphql/tickets/ticket.generated';
import { ticketPriorities } from '../../../helpers/ticket-priorities';
import { ticketTypes } from '../../../helpers/ticket-types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { useForm } from '../../../hooks/use-form.hook';
import { createTicketMutation } from '../../../modules/ticket-modules/create-ticket';
import { MainSelectOption } from '../../../types';
import { EActionTypes, MutationTypes } from '../../../types/enums/common.enum';
import { stringPrettier } from '../../../utils/string-prettier';
import { PriorityIcon } from '../../component-library/icons/priority-icon';
import { TicketTypeIcon } from '../../component-library/icons/ticket-type-icon';
import { MainSelect } from '../../component-library/main-select/main-select';
import { Modal } from '../../component-library/modal/modal';
import { MyAlert } from '../../component-library/my-alert/my-alert';

const FormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textarea: {
      gridRow: 10,
    },
  },
});

interface ITicketForm {
  initialValues: TicketCreateInput;
  action: MutationTypes;
  toggle: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyTicketsQuery>>;
}

export const TicketForm: FC<ITicketForm> = ({
  toggle,
  refetch,
  action,
  initialValues,
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();
  const { projectId } = useParams();

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
      refetch();
    }
  }, [data]);

  const resetForm = () => {
    setAlertMessage(null);
    setSuccess(false);
  };

  const selectMutation = async () => {
    switch (action) {
      case EActionTypes.CREATE:
        return await createTicketMutation({
          values,
          projectId: projectId as string,
          setSuccess,
          createTicket,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.UPDATE:
      // return await updateProjectMutation({
      //   projectId: selectedId,
      //   values,
      //   setSuccess,
      //   updateTicket,
      //   setAlertMessage,
      //   setAlertMessageColor,
      // });
      case EActionTypes.DELETE:
      // return await deleteProjectMutation({
      //   projectId: selectedId,
      //   setSuccess,
      //   deleteProject: deleteTicket,
      //   setAlertMessage,
      //   setAlertMessageColor,
      // });
    }
  };

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
      title={translate(TEXT.forms.ticketForms[action].title)}
      maxWidth={'800px'}
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
              {translate(TEXT.forms.ticketForms[action].labels.title)}
            </Form.Label>
            <Form.Control
              name='title'
              type='text'
              onChange={onChange}
              disabled={loading || action === EActionTypes.DELETE}
              value={values.title}
            />
          </Form.Group>
          <Row className='d-flex justify-content-center mb-5'>
            <Col className='col-8'>
              <Form.Group className='mb-3 w-100'>
                <Form.Label>
                  {translate(TEXT.forms.ticketForms[action].labels.description)}
                </Form.Label>
                <textarea
                  name='description'
                  className='form-control'
                  rows={8}
                  onChange={onChange}
                  disabled={loading || action === EActionTypes.DELETE}
                  value={values.description}
                />
              </Form.Group>
            </Col>
            <Col className='col-4 mt-4'>
              <Form.Group className='mb-3'>
                <MainSelect
                  name='status'
                  value={values.status}
                  options={ticketStatusOptions}
                  onChange={onChange}
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
                  />
                </div>
              </Form.Group>
              <Form.Group className='mb-3'>
                <Form.Label>
                  {translate(TEXT.forms.ticketForms[action].labels.storyPoints)}
                </Form.Label>
                <Form.Control
                  name='storyPoints'
                  type='number'
                  min={0}
                  onChange={onChange}
                  disabled={loading || action === EActionTypes.DELETE}
                  value={Number(values.storyPoints)}
                />
              </Form.Group>
            </Col>
          </Row>

          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          {!success && (
            <div className='d-flex gap-3 justify-content-between'>
              <Button
                type='button'
                variant={'secondary'}
                className='w-100'
                disabled={loading}
                onClick={() => {
                  toggle();
                }}
              >
                {translate(TEXT.buttons.cancelBtn)}
              </Button>
              <Button
                type='submit'
                variant={
                  action === EActionTypes.DELETE
                    ? 'danger'
                    : action === EActionTypes.UPDATE
                    ? 'warning'
                    : 'primary'
                }
                className='w-100'
                disabled={loading}
              >
                {translate(TEXT.forms.ticketForms[action].buttons.submitBtn)}
              </Button>
            </div>
          )}
        </Form>
      </FormDiv>
    </Modal>
  );
};
