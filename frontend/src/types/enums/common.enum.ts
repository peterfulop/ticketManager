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

export enum ETicketInputs {
  COMMENT = 'comment',
  DESCRIPTION = 'description',
  PRIORITY = 'priority',
  REFERENCES = 'references',
  STATUS = 'status',
  STORY_POINTS = 'storyPoints',
  TITLE = 'title',
  TYPE = 'type',
}
