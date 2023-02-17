import { ApolloQueryResult } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
import { useNavigate } from 'react-router-dom';
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
import { EActionTypes, MutationTypes } from '../../../types/enums/common.enum';
import { ERoutePath } from '../../../types/enums/routes.enum';
import { MyAlert } from '../../component-library/my-alert/my-alert';
import { Modal } from '../../modal/modal';

const FormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

interface IProjectForm {
  initialValues: ProjectCreateInput;
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
  ) => Promise<ApolloQueryResult<GetMyProjectsQuery>>;
}

export const ProjectForm: FC<IProjectForm> = ({
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

  const [createProject, { loading: createLoading, data: createData }] =
    useProjectCreateMutation();
  const [updateProject, { loading: updateLoading, data: updateData }] =
    useProjectUpdateMutation();
  const [deleteProject, { loading: deleteLoading, data: deleteData }] =
    useProjectDeleteMutation();

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
        return await createProjectMutation({
          values,
          setSuccess,
          createProject,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.UPDATE:
        return await updateProjectMutation({
          projectId: selectedId,
          values,
          setSuccess,
          updateProject,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.DELETE:
        return await deleteProjectMutation({
          projectId: selectedId,
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
      title={translate(TEXT.forms.projectForms[action].title)}
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
              {translate(TEXT.forms.projectForms[action].labels.name)}
            </Form.Label>
            <Form.Control
              name='name'
              type='text'
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
                  navigate(ERoutePath.PROJECTS);
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
                {translate(TEXT.forms.projectForms[action].buttons.submitBtn)}
              </Button>
            </div>
          )}
        </Form>
      </FormDiv>
    </Modal>
  );
};
