export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanPayload = {
  __typename?: 'BooleanPayload';
  success?: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
};

export type Collaboration = {
  __typename?: 'Collaboration';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inviterId: Scalars['String'];
  projectId: Scalars['String'];
  role: Role;
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type CollaborationCreateInput = {
  projectId: Scalars['String'];
  role: Role;
  userId: Scalars['String'];
};

export type CollaborationPayload = {
  __typename?: 'CollaborationPayload';
  collaboration?: Maybe<Collaboration>;
  userErrors: Array<UserError>;
};

export type CollaborationsPayload = {
  __typename?: 'CollaborationsPayload';
  collaboration: Array<Collaboration>;
  userErrors: Array<UserError>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetUserPayload = {
  __typename?: 'GetUserPayload';
  user?: Maybe<User>;
  userErrors: Array<UserError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _?: Maybe<Scalars['Boolean']>;
  collaborationCreate: BooleanPayload;
  collaborationDelete: BooleanPayload;
  confirmResend: BooleanPayload;
  confirmUser: BooleanPayload;
  projectCreate: ProjectPayload;
  projectDelete: BooleanPayload;
  projectUpdate: ProjectPayload;
  signin: SigninPayload;
  signup: BooleanPayload;
  sprintClose: SprintPayload;
  sprintCreate: SprintPayload;
  sprintDelete: BooleanPayload;
  sprintUpdate: SprintPayload;
  ticketCreate: TicketPayload;
  ticketDelete: BooleanPayload;
  ticketStatusUpdate: TicketPayload;
  ticketUpdate: TicketPayload;
};


export type MutationCollaborationCreateArgs = {
  input: CollaborationCreateInput;
};


export type MutationCollaborationDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationConfirmResendArgs = {
  email: Scalars['String'];
};


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationProjectCreateArgs = {
  input: ProjectCreateInput;
};


export type MutationProjectDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationProjectUpdateArgs = {
  input: ProjectUpdateInput;
};


export type MutationSigninArgs = {
  input: CredentialsInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationSprintCloseArgs = {
  sprintId: Scalars['ID'];
};


export type MutationSprintCreateArgs = {
  input: SprintCreateInput;
};


export type MutationSprintDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationSprintUpdateArgs = {
  input: SprintUpdateInput;
};


export type MutationTicketCreateArgs = {
  input: TicketCreateInput;
};


export type MutationTicketDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationTicketStatusUpdateArgs = {
  input: TicketStatusUpdateInput;
};


export type MutationTicketUpdateArgs = {
  input: TicketUpdateInput;
};

export type Project = {
  __typename?: 'Project';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  sequence: Scalars['Int'];
  shared: Scalars['Boolean'];
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type ProjectCreateInput = {
  name: Scalars['String'];
  shared?: InputMaybe<Scalars['Boolean']>;
};

export type ProjectIdByNamePayload = {
  __typename?: 'ProjectIdByNamePayload';
  projectId?: Maybe<Scalars['ID']>;
  userErrors: Array<UserError>;
};

export type ProjectPayload = {
  __typename?: 'ProjectPayload';
  project?: Maybe<Project>;
  userErrors: Array<UserError>;
};

export type ProjectUpdateInput = {
  name: Scalars['String'];
  projectId: Scalars['String'];
  shared?: InputMaybe<Scalars['Boolean']>;
};

export type ProjectsPayload = {
  __typename?: 'ProjectsPayload';
  projects: Array<Project>;
  userErrors: Array<UserError>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  getCollaboration: CollaborationPayload;
  getCollaborations: CollaborationsPayload;
  getMyProfile: GetUserPayload;
  getMyProjects: ProjectsPayload;
  getProject: ProjectPayload;
  getProjectCollaborations: ProjectsPayload;
  getProjectIdByName: ProjectIdByNamePayload;
  getSprint: SprintPayload;
  getSprints: SprintsPayload;
  getTicket: TicketPayload;
  getTickets: TicketsPayload;
  getUser: GetUserPayload;
  verifyUser: VerifyPayload;
};


export type QueryGetCollaborationArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetProjectIdByNameArgs = {
  projectName: Scalars['String'];
};


export type QueryGetSprintArgs = {
  id: Scalars['ID'];
};


export type QueryGetSprintsArgs = {
  input?: InputMaybe<SearchSprintInput>;
};


export type QueryGetTicketArgs = {
  id: Scalars['ID'];
  projectId: Scalars['ID'];
};


export type QueryGetTicketsArgs = {
  input?: InputMaybe<SearchTicketInput>;
  projectId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryVerifyUserArgs = {
  token: Scalars['String'];
};

export enum Role {
  ADMIN = 'ADMIN',
  DEVELOPER = 'DEVELOPER',
  SUPER_ADMIN = 'SUPER_ADMIN',
  TEAMLEAD = 'TEAMLEAD',
  USER = 'USER'
}

export type SearchSprintInput = {
  goal?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SearchTicketInput = {
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<TicketPriority>;
  projectId?: InputMaybe<Scalars['String']>;
  sprintId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TicketStatus>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TicketType>;
};

export type SigninPayload = {
  __typename?: 'SigninPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userErrors: Array<UserError>;
};

export type SignupInput = {
  credentials: CredentialsInput;
  name: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type Sprint = {
  __typename?: 'Sprint';
  closed: Scalars['Boolean'];
  createdAt?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  goal: Scalars['String'];
  id: Scalars['ID'];
  projectId: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type SprintCreateInput = {
  endDate: Scalars['String'];
  goal: Scalars['String'];
  projectId: Scalars['String'];
  startDate: Scalars['String'];
  title: Scalars['String'];
};

export type SprintPayload = {
  __typename?: 'SprintPayload';
  sprint?: Maybe<Sprint>;
  userErrors: Array<UserError>;
};

export type SprintUpdateInput = {
  endDate?: InputMaybe<Scalars['String']>;
  goal?: InputMaybe<Scalars['String']>;
  projectId?: InputMaybe<Scalars['String']>;
  sprintId: Scalars['ID'];
  startDate?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type SprintsPayload = {
  __typename?: 'SprintsPayload';
  sprints?: Maybe<Array<Sprint>>;
  userErrors: Array<UserError>;
};

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  priority: TicketPriority;
  projectId: Scalars['String'];
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
  sequenceId: Scalars['String'];
  sprintId?: Maybe<Scalars['String']>;
  status: TicketStatus;
  storyPoints?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type TicketCreateInput = {
  description?: InputMaybe<Scalars['String']>;
  priority: TicketPriority;
  projectId: Scalars['String'];
  references?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sprintId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TicketStatus>;
  storyPoints?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
};

export type TicketPayload = {
  __typename?: 'TicketPayload';
  ticket?: Maybe<Ticket>;
  userErrors: Array<UserError>;
};

export enum TicketPriority {
  HIGHT = 'HIGHT',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  URGENT = 'URGENT'
}

export enum TicketStatus {
  ARCHIVED = 'ARCHIVED',
  BACKLOG = 'BACKLOG',
  BLOCKED = 'BLOCKED',
  DONE = 'DONE',
  IN_PROGRESS = 'IN_PROGRESS',
  REVIEW = 'REVIEW',
  TO_DO = 'TO_DO'
}

export type TicketStatusUpdateInput = {
  status: TicketStatus;
  ticketId: Scalars['ID'];
};

export enum TicketType {
  BUG = 'BUG',
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK'
}

export type TicketUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<TicketPriority>;
  projectId?: InputMaybe<Scalars['String']>;
  references?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  sprintId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<TicketStatus>;
  storyPoints?: InputMaybe<Scalars['Int']>;
  ticketId: Scalars['ID'];
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TicketType>;
};

export type TicketsPayload = {
  __typename?: 'TicketsPayload';
  tickets?: Maybe<Array<Ticket>>;
  userErrors: Array<UserError>;
};

export type User = {
  __typename?: 'User';
  confirmed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: Array<Project>;
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  values?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VerifyPayload = {
  __typename?: 'VerifyPayload';
  user?: Maybe<User>;
  userErrors: Array<UserError>;
};
