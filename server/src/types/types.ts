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

export type AuthPayload = {
  __typename?: 'AuthPayload';
  success?: Maybe<Scalars['Boolean']>;
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
  confirmResend: AuthPayload;
  confirmUser: AuthPayload;
  projectCreate: ProjectPayload;
  projectDelete: ProjectDeletePayload;
  projectUpdate: ProjectPayload;
  signin: SigninPayload;
  signup: AuthPayload;
  sprintCreate: SprintPayload;
  sprintDelete: SprintDeletePayload;
  sprintUpdate: SprintPayload;
  ticketCreate: TicketPayload;
  ticketDelete: TicketDeletePayload;
  ticketStatusUpdate: TicketPayload;
  ticketUpdate: TicketPayload;
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
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type ProjectCreateInput = {
  name: Scalars['String'];
};

export type ProjectDeletePayload = {
  __typename?: 'ProjectDeletePayload';
  success?: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
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
};

export type ProjectsPayload = {
  __typename?: 'ProjectsPayload';
  projects: Array<Project>;
  userErrors: Array<UserError>;
};

export type Query = {
  __typename?: 'Query';
  _?: Maybe<Scalars['Boolean']>;
  getMyProfile: GetUserPayload;
  getMyProject: ProjectPayload;
  getMyProjectIdByName: ProjectIdByNamePayload;
  getMyProjects: ProjectsPayload;
  getMyTickets: TicketsPayload;
  getSprint: SprintPayload;
  getSprints: SprintsPayload;
  getTicket: TicketPayload;
  getUser: GetUserPayload;
  verifyUser: VerifyPayload;
};


export type QueryGetMyProjectArgs = {
  id: Scalars['ID'];
};


export type QueryGetMyProjectIdByNameArgs = {
  projectName: Scalars['String'];
};


export type QueryGetMyTicketsArgs = {
  input?: InputMaybe<SearchTicketInput>;
};


export type QueryGetSprintArgs = {
  id: Scalars['ID'];
};


export type QueryGetSprintsArgs = {
  input?: InputMaybe<SearchSprintInput>;
};


export type QueryGetTicketArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryVerifyUserArgs = {
  token: Scalars['String'];
};

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
  createdAt?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  goal: Scalars['String'];
  id: Scalars['ID'];
  projectId: Scalars['String'];
  sequenceId: Scalars['String'];
  startDate?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type SprintCreateInput = {
  endDate?: InputMaybe<Scalars['String']>;
  goal: Scalars['String'];
  projectId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type SprintDeletePayload = {
  __typename?: 'SprintDeletePayload';
  success?: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
};

export type SprintPayload = {
  __typename?: 'SprintPayload';
  sprint?: Maybe<Sprint>;
  userErrors: Array<UserError>;
};

export type SprintUpdateInput = {
  endDate?: InputMaybe<Scalars['String']>;
  goal: Scalars['String'];
  projectId: Scalars['String'];
  startDate?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
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
  sprintId: Scalars['String'];
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
  sprintId: Scalars['String'];
  status: TicketStatus;
  storyPoints?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
};

export type TicketDeletePayload = {
  __typename?: 'TicketDeletePayload';
  success?: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
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
  sprintId: Scalars['String'];
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
