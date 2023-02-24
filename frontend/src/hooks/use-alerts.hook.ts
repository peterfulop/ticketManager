import { useState } from 'react';
import { Variant } from 'react-bootstrap/esm/types';

export const useAlerts = () => {
  const [success, setSuccess] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertMessageColor, setAlertMessageColor] = useState<Variant>('danger');

  return {
    success,
    alertMessage,
    alertMessageColor,
    setSuccess,
    setAlertMessage,
    setAlertMessageColor,
  };
};
