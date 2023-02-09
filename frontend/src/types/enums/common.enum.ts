export enum EActionTypes {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export type MutationTypes = Exclude<EActionTypes, EActionTypes.READ>;

export enum EProjectInputs {
  NAME = 'name',
}
