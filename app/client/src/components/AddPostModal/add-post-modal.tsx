import { useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import EnStrings from '../../utilities/strings';

export default function AddPostModal(props: {
  userId: string;
  // refetch: () => Promise<ApolloQueryResult<GetProfileQuery>>;
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState<null | string>(null);

  const resetForm = () => {
    setError(null);
    setTitle('');
    setContent('');
  };

  // const [postCreateMutation, { loading, data, error: postCreateError }] =
  //   usePostCreateMutation();

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    // e?.preventDefault();
    // setError(null);
    // if (!content || !title) {
    //   setError('All fields are required!');
    //   return;
    // }
    // // await postCreateMutation({
    // //   variables: {
    // //     input: {
    // //       title,
    // //       content,
    // //     },
    // //   },
    // // });
    // await props.refetch();
  };

  // useEffect(() => {
  //   if (postCreateError) {
  //     setError(EnStrings.ERRORS.SERVER_ERROR);
  //   }
  //   if (data) {
  //     if (data.postCreate.userErrors.length) {
  //       const errMessage = sSTE(data.postCreate.userErrors[0].message);
  //       setError(errMessage);
  //     }
  //     if (data.postCreate.post) {
  //       resetForm();
  //       handleClose();
  //     }
  //   }
  // }, [data]);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {EnStrings.SCREENS.PROFILE.BUTTONS.ADD_BUTTON}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{EnStrings.MODALS.ADD_POST_MODAL.TITLE}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => handleSubmit(e)}
            onChange={() => setError(null)}
          >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>
                {EnStrings.MODALS.ADD_POST_MODAL.LABELS.TITLE}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>
                {EnStrings.MODALS.ADD_POST_MODAL.LABELS.CONTENT}
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {/* {loading && <p>{EnStrings.COMMONS.LOADING}</p>}
            {error && <p>{error}</p>} */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {EnStrings.MODALS.COMMONS.CLOSE}
          </Button>
          <Button variant="primary" onClick={() => handleSubmit()}>
            {EnStrings.MODALS.COMMONS.ADD}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
