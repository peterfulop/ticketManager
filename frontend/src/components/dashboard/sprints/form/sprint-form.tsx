import { FC, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { SprintCreateInput } from '../../../../apollo/graphql-generated/types';
import { breakPoints } from '../../../../assets/theme';
import { translate } from '../../../../helpers/translate/translate';
import { TEXT } from '../../../../helpers/translate/translate-objects';
import { useTicketMutations } from '../../../../hooks/ticket-hooks/use-ticket-mutations.hook';
import { useAlerts } from '../../../../hooks/use-alerts.hook';
import { useForm } from '../../../../hooks/use-form.hook';
import { EActionTypes } from '../../../../types/enums/common.enum';
import { RoutePath } from '../../../../types/enums/routes.enum';
import { setSelectOptions } from '../../../../utils/set-select-options';
import { FormActions } from '../../../component-library/form-actions/form-actions';
import { MainSelect } from '../../../component-library/main-select/main-select';
import { MyAlert } from '../../../component-library/my-alert/my-alert';
import { Modal } from '../../../modal/modal';
import { SequneceId } from '../../../tickets/sequnce-id/sequence-id';

const FormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    textarea: {
      gridRow: 10,
    },
  },
  '.mt-inline': {
    marginTop: '2rem',
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

interface ISprintForm {
  // tickets: Ticket[];
  projectName: string;
  initialValues: SprintCreateInput;
  action: EActionTypes;
  toggle: () => void;
  toggleCallBackFn: () => void;
  modalURL: RoutePath;
}

export const SprintForm: FC<ISprintForm> = ({
  action,
  // tickets,
  projectName,
  initialValues,
  modalURL,
  toggle,
  // refetch,
  toggleCallBackFn,
}) => {
  const { sprintId } = useParams();
  const [actionType, setActionType] = useState<EActionTypes>(action);

  const {
    success,
    alertMessage,
    alertMessageColor,
    setSuccess,
    setAlertMessage,
    setAlertMessageColor,
  } = useAlerts();

  const resetForm = () => {
    setAlertMessage(null);
    setSuccess(false);
  };

  const { loading, createTicket, updateTicket, deleteTicket } =
    useTicketMutations({});

  const selectMutation = async () => {
    switch (actionType) {
      case EActionTypes.CREATE:
        return null;
      // return await createTicketMutation({
      //   values: {
      //     ...values,
      //     references,
      //   } as TicketCreateInput,
      //   setSuccess,
      //   createTicket,
      //   setAlertMessage,
      //   setAlertMessageColor,
      // });
      case EActionTypes.UPDATE:
        return null;

      // return await updateTicketMutation({
      //   ticketId: ticketId as string,
      //   values: {
      //     ...values,
      //     references,
      //   } as TicketUpdateInput,
      //   setSuccess,
      //   updateTicket,
      //   setAlertMessage,
      //   setAlertMessageColor,
      // });
      case EActionTypes.DELETE:
        return null;

      // return await deleteTicketMutation({
      //   ticketId: ticketId as string,
      //   setSuccess,
      //   deleteTicket,
      //   setAlertMessage,
      //   setAlertMessageColor,
      // });
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: selectMutation,
    initialState: initialValues,
  });

  // const { handleChange, references } = useTicketReferences({
  //   initialState: values.references,
  // });

  // const [priority, setPriority] = useState<TicketPriority>(values.priority);
  // const [type, setType] = useState<TicketType>(values.type);

  return (
    <Modal
      toggle={() => toggle && toggle()}
      closeOnBackdrop={true}
      title={`${projectName} - hello`}
      maxWidth={'850px'}
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
          className='mt-2'
        >
          <Form.Group className='mb-1'>
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
          {actionType !== EActionTypes.CREATE && (
            <SequneceId sequenceId={values.sequenceId} title={values.title} />
          )}
          <Row id='ticket-form-row' className='justify-content-center mb-1'>
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
            </Col>
            <Col className='col-4'>
              {actionType !== EActionTypes.CREATE && (
                <Form.Group className='mb-3'>
                  <Form.Label>
                    {translate(
                      TEXT.forms.ticketForms[actionType].labels.status
                    )}
                  </Form.Label>
                  <MainSelect
                    name='status'
                    value={values.status}
                    options={setSelectOptions({})}
                    onChange={onChange}
                    disabled={loading || actionType === EActionTypes.DELETE}
                  />
                </Form.Group>
              )}
              <Form.Group className='mb-3 d-flex align-items-center justify-content-between gap-2'>
                <Form.Label className='m-0 p-0'>
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
                  className='text-left w-25'
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
              toggle && toggle();
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
