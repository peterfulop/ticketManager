export enum Operations {
  ALL = 'ALL',
  GET_USER = 'GET_USER',
  DELETE_USER = 'DELETE_USER',
  EDIT_USER = 'EDIT_USER',
}

export type OperationTypes = keyof typeof Operations;
