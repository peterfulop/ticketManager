import { useState } from 'react';

interface IUseTicketReferences {
  initialState: string[] | [];
}

export const useTicketReferences = (props: IUseTicketReferences) => {
  const [references, setReferences] = useState<string[]>(props.initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentRefId = e.target.id;
    if (e.target.checked) {
      setReferences((prevState) => [...prevState, currentRefId]);
    } else {
      const filtered = references.filter((ref) => ref !== currentRefId);
      setReferences(filtered);
    }
  };

  return {
    handleChange,
    references,
  };
};
