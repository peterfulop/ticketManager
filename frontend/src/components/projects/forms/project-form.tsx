import { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { GrGroup } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  ProjectCreateInput,
  ProjectUpdateInput,
} from '../../../apollo/graphql-generated/types';
import { translate } from '../../../helpers/translate/translate';
import { TEXT } from '../../../helpers/translate/translate-objects';
import { useProjectMutations } from '../../../hooks/project-hooks/use-project-mutations.hook';
import { useAlerts } from '../../../hooks/use-alerts.hook';
import { useForm } from '../../../hooks/use-form.hook';
import { createProjectMutation } from '../../../modules/project-modules/create-project';
import { deleteProjectMutation } from '../../../modules/project-modules/delete-project';
import { updateProjectMutation } from '../../../modules/project-modules/update-project';
import { EActionTypes } from '../../../types/enums/common.enum';
import { ERoutePath } from '../../../types/enums/routes.enum';
import { IProject } from '../../../types/interfaces/project.interface';
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

// const Details = styled.div({
//   marginBottom: '1rem',
//   p: {
//     fontWeight: 'bold',
//   },
//   span: {
//     marginLeft: '5px',
//     fontWeight: 'lighter',
//   },
// });

export const useFormHook = () => {
  return null;
};

interface IProjectForm extends IProject {
  initialValues: ProjectCreateInput;
  action: EActionTypes;
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

  const { loading, createProject, updateProject, deleteProject } =
    useProjectMutations({
      refetch,
    });

  const selectMutation = async () => {
    switch (actionType) {
      case EActionTypes.CREATE:
        return await createProjectMutation({
          values: values as ProjectCreateInput,
          createProject,
          setSuccess,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.UPDATE:
        return await updateProjectMutation({
          projectId: projectId as string,
          values: values as ProjectUpdateInput,
          updateProject,
          setSuccess,
          setAlertMessage,
          setAlertMessageColor,
        });
      case EActionTypes.DELETE:
        return await deleteProjectMutation({
          projectId: projectId as string,
          deleteProject,
          setSuccess,
          setAlertMessage,
          setAlertMessageColor,
        });
    }
  };

  const { onChange, onSubmit, values } = useForm({
    callback: selectMutation,
    initialState: initialValues,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (actionType === EActionTypes.DELETE && success) {
      setTimeout(() => {
        navigate(ERoutePath.PROJECTS);
      }, 1000);
    }
  }, [actionType, success]);

  return (
    <Modal
      toggle={() => toggle && toggle()}
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
          <Form.Group className='d-flex align-items-center gap-2 mb-3'>
            <GrGroup size={20} />
            <Form.Check
              name='shared'
              type='switch'
              id='custom-switch'
              label={'Share project'}
              onChange={(e) => {
                const value = String(e.target.checked);
                onChange(e, value);
              }}
              disabled={loading || actionType === EActionTypes.DELETE}
              defaultValue={values.shared}
              defaultChecked={values.shared}
            />
          </Form.Group>
          {/* {(actionType === EActionTypes.UPDATE ||
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
          )} */}
          {alertMessage && (
            <MyAlert variant={alertMessageColor} content={alertMessage} />
          )}
          <FormActions
            loading={loading}
            form={'projectForms'}
            actionType={actionType}
            onCancel={() => {
              toggle && toggle();
              toggleCallBackFn();
            }}
            setAlertMessage={setAlertMessage}
            setActionType={setActionType}
            success={success || false}
          />
        </Form>
      </FormDiv>
    </Modal>
  );
};
