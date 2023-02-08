// import { ApolloQueryResult } from '@apollo/client';
// import { FC, useEffect, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { Variant } from 'react-bootstrap/esm/types';
// import styled from 'styled-components';
// import { Exact } from '../../apollo/graphql-generated/types';
// import { translate, translateERR } from '../../helpers/translate/translate';
// import { TEXT } from '../../helpers/translate/translate-objects';
// import { useForm } from '../../hooks/use-form.hook';
// import {
//   GetMyProjectsQuery,
//   useProjectCreateMutation,
// } from '../../pages/project/graphql/project.generated';
// import { ServerSideError } from '../../types/enums/db-errors.enum';
// import { MyAlert } from '../my-alert/my-alert';

// const CreateProjectForm = styled.div({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     width: '100%',
//   },
// });

// interface IUpdateProject {
//   toggle: () => void;
//   isOpen: boolean;
//   refetch: (
//     variables?:
//       | Partial<
//           Exact<{
//             [key: string]: never;
//           }>
//         >
//       | undefined
//   ) => Promise<ApolloQueryResult<GetMyProjectsQuery>>;
// }

// export const UpdateProject: FC<IUpdateProject> = ({
//   isOpen,
//   toggle,
//   refetch,
// }) => {
//   const projectInitialInputs = {
//     name: '',
//   };

//   const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');
//   const [success, setSuccess] = useState<boolean>(false);

//   const [createProject, { loading }] = useProjectCreateMutation();

//   useEffect(() => {
//     resetForm();
//   }, [isOpen]);

//   const resetForm = () => {
//     setAlertMessage(null);
//     setSuccess(false);
//   };

//   const useFormCallBackFn = async () => {
//     setAlertMessage(null);
//     try {
//       const res = await createProject({
//         variables: {
//           input: {
//             name: values.name,
//           },
//         },
//       });
//       if (res.data?.projectCreate.userErrors.length) {
//         setAlertMessageColor('danger');
//         const errorMessage = res.data.projectCreate.userErrors[0].message;
//         const errorValues = res.data.projectCreate.userErrors[0].values;
//         const translatedError = translateERR(errorMessage);

//         if (errorMessage === ServerSideError.MISSING_FIELDS) {
//           return setAlertMessage(
//             `${translatedError}${errorValues?.toString()}`
//           );
//         }
//         if (errorMessage === ServerSideError.UNIQUE_CONSTRAINT_FAIL) {
//           setAlertMessage(`${translatedError}${errorValues?.toString()}`);
//         } else {
//           return setAlertMessage(translatedError);
//         }
//       }
//       if (res.data?.projectCreate.project) {
//         setSuccess(true);
//         setAlertMessageColor('success');
//         setAlertMessage(
//           translate(
//             TEXT.forms.createProjectForm.alerts.successfulProjectCreation
//           )
//         );
//         await refetch();
//       }
//     } catch (error) {
//       setAlertMessage(translate(TEXT.ERRORS.SERVER_ERROR));
//     }
//   };

//   const { onChange, onSubmit, values } = useForm({
//     callback: useFormCallBackFn,
//     initialState: projectInitialInputs,
//   });

//   return (
//     <CreateProjectForm>
//       <Form
//         onSubmit={(e) => onSubmit(e)}
//         onChange={() => {
//           if (alertMessage) {
//             resetForm();
//           }
//         }}
//       >
//         <Form.Group className='mb-3'>
//           <Form.Label>
//             {translate(TEXT.forms.createProjectForm.labels.projectName)}
//           </Form.Label>
//           <Form.Control
//             name='name'
//             type='text'
//             onChange={onChange}
//             disabled={loading}
//           />
//         </Form.Group>
//         {alertMessage && (
//           <MyAlert variant={alertMessageColor} content={alertMessage} />
//         )}
//         {!success && (
//           <Button type='submit' className='w-100' disabled={loading}>
//             {translate(TEXT.buttons.createBtn)}
//           </Button>
//         )}
//       </Form>
//       {/* </Modal> */}
//     </CreateProjectForm>
//   );
// };
