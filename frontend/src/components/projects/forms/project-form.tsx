import { ApolloQueryResult } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  Exact,
  ProjectCreateInput,
} from '../../../apollo/graphql-generated/types';
import {
  GetMyProjectsQuery,
  useProjectCreateMutation,
  useProjectDeleteMutation,
  useProjectUpdateMutation,
} from '../../../apollo/graphql/project/project.generated';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { useForm } from '../../../hooks/use-form.hook';
import { createProjectMutation } from '../../../modules/project-modules/create-project';
import { deleteProjectMutation } from '../../../modules/project-modules/delete-project';
import { updateProjectMutation } from '../../../modules/project-modules/update-project';
import { EActionTypes } from '../../../types/enums/common.enum';
import { FormActions } from '../../component-library/form-actions/form-actions';
import { MyAlert } from '../../component-library/my-alert/my-alert';
import { Modal } from '../../modal/modal';

const FormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

const Details = styled.div({
  marginBottom: '1rem',
  p: {
    fontWeight: 'bold',
  },
  span: {
    marginLeft: '5px',
    fontWeight: 'lighter',
  },
});

interface IProjectForm {
  initialValues: ProjectCreateInput;
  action: EActionTypes;
  toggle: () => void;
  refetch: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetMyProjectsQuery>>;
  toggleCallBackFn: () => void;
}

export const ProjectForm: FC<IProjectForm> = ({
  action,
  initialValues,
  toggle,
  refetch,
  toggleCallBackFn,
}) => {
  const { projectId } = useParams();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');
  const [actionType, setActionType] = useState<EActionTypes>(action);

  const [success, setSuccess] = useState<boolean>(false);

  const [createProject, { loading: createLoading, data: createData }] =
    useProjectCreateMutation();
  const [updateProject, { loading: updateLoading, data: updateData }] =
    useProjectUpdateMutation();
  const [deleteProject, { loading: deleteLoading, data: deleteData }] =
    useProjectDeleteMutation();

  const loading = createLoading || updateLoading || deleteLoading;
  const data = createData || updateData || deleteData;

  const DateFormat = (date: string) => {
    return new Date(date).toLocaleString();
  };

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
    switch (actionType) {
      case EActionTypes.CREATE:
        return await createProjectMutation({
          values,
          setSuccess,
          createProject,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.UPDATE:
        return await updateProjectMutation({
          projectId: projectId as string,
          values,
          setSuccess,
          updateProject,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.DELETE:
        return await deleteProjectMutation({
          projectId: projectId as string,
          setSuccess,
          deleteProject,
          setAlertMessage,
          setAlertMessageColor,
        });
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
      title={translate(TEXT.forms.projectForms[actionType].title)}
      callBackFn={toggleCallBackFn}
    >
      <FormDiv>
        <Form
          onSubmit={(e) => {
            onSubmit(e);
          }}
          onChange={() => {
            if (alertMessage) {
              resetForm();
            }
          }}
        >
          <Form.Group className='mb-3'>
            <Form.Label>
              {translate(TEXT.forms.projectForms[actionType].labels.name)}
            </Form.Label>
            <Form.Control
              name='name'
              type='text'
              onChange={onChange}
              disabled={loading || actionType === EActionTypes.DELETE}
              value={values.name}
              autoFocus={true}
            />
          </Form.Group>
          {(actionType === EActionTypes.UPDATE ||
            actionType === EActionTypes.DELETE) && (
            <Details>
              <p>
                {translate(TEXT.pages.projects.labels.sequence)}
                <span>{values.sequence}</span>
              </p>
              <p>
                {translate(TEXT.pages.projects.labels.tickets)}
                <span>{values.tickets.length}</span>
              </p>
              <p>
                {translate(TEXT.pages.projects.labels.createdAt)}
                <span>{DateFormat(values.createdAt || '')}</span>
              </p>
              <p>
                {translate(TEXT.pages.projects.labels.updatedAt)}
                <span>{DateFormat(values.createdAt || '')}</span>
              </p>
            </Details>
          )}
          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          <FormActions
            loading={loading}
            form={'projectForms'}
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
