import { FC, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Variant } from 'react-bootstrap/esm/types';
import { IReact } from '../../types/interfaces/common.interface';

interface IAlertBlock extends IReact {
  variant?: Variant;
  heading?: string;
  content?: string;
  dismissible?: boolean;
}

export const MyAlert: FC<IAlertBlock> = ({
  variant,
  heading,
  content,
  dismissible,
}) => {
  const [show, setShow] = useState(true);

  return show ? (
    <Alert className='d-flex' variant={variant} onClose={() => setShow(false)}>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>{content}</p>
    </Alert>
  ) : (
    <></>
  );
};
