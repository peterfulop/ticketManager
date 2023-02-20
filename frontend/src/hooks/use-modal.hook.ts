import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useModal = () => {
  const [isOpen, setisOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (isOpen) toggle();
  }, [location]);

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return {
    isOpen,
    toggle,
  };
};
