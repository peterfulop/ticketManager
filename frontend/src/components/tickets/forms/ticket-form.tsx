import { ApolloQueryResult } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  Exact,
  TicketCreateInput,
} from '../../../apollo/graphql-generated/types';
import {
  GetMyTicketsQuery,
  useTicketCreateMutation,
  useTicketDeleteMutation,
  useTicketUpdateMutation,
} from '../../../apollo/graphql/tickets/ticket.generated';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { useForm } from '../../../hooks/use-form.hook';
import { createTicketMutation } from '../../../modules/ticket-modules/create-ticket';
import { EActionTypes, MutationTypes } from '../../../types/enums/common.enum';
import { Modal } from '../../component-library/modal/modal';
import { MyAlert } from '../../component-library/my-alert/my-alert';

const FormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

interface ITicketForm {
  initialValues: TicketCreateInput;
  selectedId: string;
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
  selectedId,
  initialValues,
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

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

  return (
    <Modal
      toggle={toggle}
      closeOnBackdrop={true}
      title={translate(TEXT.forms.ticketForms[action].title)}
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
              {translate(TEXT.forms.ticketForms[action].labels.name)}
            </Form.Label>
            <Form.Control
              name='name'
              type='text'
              onChange={onChange}
              disabled={loading || action === EActionTypes.DELETE}
              value={values.name}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.ticketForms[action].labels.description)}
            </Form.Label>
            <textarea
              name='description'
              className='form-control'
              rows={3}
              onChange={onChange}
              disabled={loading || action === EActionTypes.DELETE}
              value={values.name}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.ticketForms[action].labels.storyPoints)}
            </Form.Label>
            <Form.Control
              name='storyPoints'
              type='number'
              defaultValue={1}
              min={0}
              onChange={onChange}
              disabled={loading || action === EActionTypes.DELETE}
              value={values.name}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.ticketForms[action].labels.storyPoints)}
            </Form.Label>
            <Form.Select
              name='storyPoints'
              onChange={onChange}
              disabled={loading || action === EActionTypes.DELETE}
              value={values.name}
            />
          </Form.Group>
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
