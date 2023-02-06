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
  token?: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

export type ConfirmPayload = {
  __typename?: 'ConfirmPayload';
  confirmed?: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
};

export type ConfirmResendPayload = {
  __typename?: 'ConfirmResendPayload';
  resent?: Maybe<Scalars['Boolean']>;
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
  confirmResend: ConfirmResendPayload;
  confirmUser: ConfirmPayload;
  projectCreate: ProjectPayload;
  projectDelete: ProjectDeletePayload;
  projectUpdate: ProjectPayload;
  signin: SigninPayload;
  signup: AuthPayload;
  ticketCreate: TicketPayload;
  ticketDelete: TicketDeletePayload;
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


export type MutationTicketCreateArgs = {
  input: TicketCreateInput;
};


export type MutationTicketDeleteArgs = {
  id: Scalars['ID'];
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
  updatedAt?: Maybe<Scalars['String']>;
};

export type ProjectCreateInput = {
  name: Scalars['String'];
};

export type ProjectDeletePayload = {
  __typename?: 'ProjectDeletePayload';
  projectName?: Maybe<Scalars['String']>;
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
  projects?: Maybe<Array<Maybe<Project>>>;
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


export type QueryGetTicketArgs = {
  id: Scalars['ID'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};


export type QueryVerifyUserArgs = {
  token: Scalars['String'];
};

export type SearchTicketInput = {
  comment?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<TicketPriority>;
  projectId?: InputMaybe<Scalars['String']>;
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

export type Subscription = {
  __typename?: 'Subscription';
  _?: Maybe<Scalars['Boolean']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  comment?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  priority: TicketPriority;
  projectId: Scalars['String'];
  references?: Maybe<Array<Maybe<Scalars['String']>>>;
  sequenceId: Scalars['String'];
  status: TicketStatus;
  storyPoints?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type TicketCreateInput = {
  comment?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  priority: TicketPriority;
  projectId: Scalars['String'];
  references?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status: TicketStatus;
  storyPoints?: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
};

export type TicketDeletePayload = {
  __typename?: 'TicketDeletePayload';
  ticketTitle?: Maybe<Scalars['String']>;
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

export enum TicketType {
  BUG = 'BUG',
  EPIC = 'EPIC',
  STORY = 'STORY',
  TASK = 'TASK'
}

export type TicketUpdateInput = {
  comment?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  priority?: InputMaybe<TicketPriority>;
  projectId?: InputMaybe<Scalars['String']>;
  references?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
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
  projects?: Maybe<Array<Project>>;
  tickets?: Maybe<Array<Ticket>>;
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
