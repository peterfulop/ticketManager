import { EMutationTypes } from '../enums/common.enum';

export interface IReact {
  children?: React.ReactNode;
}
export interface MutationAlerts {
  setAlertMessageColor: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MutationProps {
  setMutationType: React.Dispatch<React.SetStateAction<EMutationTypes>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  selectedId: string;
}
