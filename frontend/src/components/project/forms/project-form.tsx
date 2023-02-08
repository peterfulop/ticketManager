import { ApolloQueryResult } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Variant } from 'react-bootstrap/esm/types';
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
import { updateProjectMutation } from '../../../modules/project-modules/update-project';
import { EMutationTypes } from '../../../types/enums/common.enum';
import { Modal } from '../../modal/modal';
import { MyAlert } from '../../my-alert/my-alert';

const ProjectFormDiv = styled.div({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
});

interface IProjectForm {
  projectInitialInputs: ProjectCreateInput;
  selectedId: string;
  mutation: EMutationTypes;
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
  mutation,
  selectedId,
  projectInitialInputs,
}) => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  const [success, setSuccess] = useState<boolean>(false);

  const [createProject, { loading: createLoading }] =
    useProjectCreateMutation();

  const [updateProject, { loading: updateLoading }] =
    useProjectUpdateMutation();

  const [deleteProject, { loading: deleteLoading }] =
    useProjectDeleteMutation();

  const loading = createLoading || updateLoading || deleteLoading;

  useEffect(() => {
    refetch();
  }, [success]);

  const resetForm = () => {
    setAlertMessage(null);
    setSuccess(false);
  };

  const selectMutation = async () => {
    switch (mutation) {
      case EMutationTypes.CREATE:
        return await createProjectMutation({
          values,
          setSuccess,
          createProject,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EMutationTypes.UPDATE:
        return await updateProjectMutation({
          projectId: selectedId,
          values,
          setSuccess,
          updateProject,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EMutationTypes.DELETE:
        break;
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: selectMutation,
    initialState: projectInitialInputs,
  });

  return (
    <Modal
      toggle={toggle}
      closeOnBackdrop={true}
      title={translate(TEXT.forms.projectForms[mutation].title)}
    >
      <ProjectFormDiv>
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
              {translate(TEXT.forms.projectForms[mutation].labels.name)}
            </Form.Label>
            <Form.Control
              name='name'
              type='text'
              onChange={onChange}
              disabled={loading}
              value={values.name}
            />
          </Form.Group>
          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          {!success && (
            <Button type='submit' className='w-100' disabled={loading}>
              {translate(TEXT.forms.projectForms[mutation].buttons.submitBtn)}
            </Button>
          )}
        </Form>
      </ProjectFormDiv>
    </Modal>
  );
};
