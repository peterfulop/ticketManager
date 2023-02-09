import { EActionTypes } from '../enums/common.enum';

export interface IReact {
  children?: React.ReactNode;
}
export interface MutationAlerts {
  setAlertMessageColor: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MutationProps {
  setActionType: React.Dispatch<React.SetStateAction<EActionTypes>>;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
  selectedId: string;
}
