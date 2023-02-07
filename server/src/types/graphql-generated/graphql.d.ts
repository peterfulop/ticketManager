import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  success: Maybe<Scalars['Boolean']>;
  userErrors: Array<UserError>;
};

export type CredentialsInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type GetUserPayload = {
  __typename?: 'GetUserPayload';
  user: Maybe<User>;
  userErrors: Array<UserError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _: Maybe<Scalars['Boolean']>;
  confirmResend: AuthPayload;
  confirmUser: AuthPayload;
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
  createdAt: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  sequence: Scalars['Int'];
  tickets: Array<Ticket>;
  updatedAt: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type ProjectCreateInput = {
  name: Scalars['String'];
};

export type ProjectDeletePayload = {
  __typename?: 'ProjectDeletePayload';
  projectName: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

export type ProjectIdByNamePayload = {
  __typename?: 'ProjectIdByNamePayload';
  projectId: Maybe<Scalars['ID']>;
  userErrors: Array<UserError>;
};

export type ProjectPayload = {
  __typename?: 'ProjectPayload';
  project: Maybe<Project>;
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
  _: Maybe<Scalars['Boolean']>;
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
  input: InputMaybe<SearchTicketInput>;
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
  comment: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  id: InputMaybe<Scalars['String']>;
  priority: InputMaybe<TicketPriority>;
  projectId: InputMaybe<Scalars['String']>;
  status: InputMaybe<TicketStatus>;
  title: InputMaybe<Scalars['String']>;
  type: InputMaybe<TicketType>;
};

export type SigninPayload = {
  __typename?: 'SigninPayload';
  token: Maybe<Scalars['String']>;
  user: Maybe<User>;
  userErrors: Array<UserError>;
};

export type SignupInput = {
  credentials: CredentialsInput;
  name: Scalars['String'];
  passwordConfirm: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _: Maybe<Scalars['Boolean']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  comment: Maybe<Scalars['String']>;
  createdAt: Maybe<Scalars['String']>;
  description: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  priority: TicketPriority;
  projectId: Scalars['String'];
  references: Maybe<Array<Maybe<Scalars['String']>>>;
  sequenceId: Scalars['String'];
  status: TicketStatus;
  storyPoints: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
  updatedAt: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type TicketCreateInput = {
  comment: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  priority: TicketPriority;
  projectId: Scalars['String'];
  references: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status: TicketStatus;
  storyPoints: InputMaybe<Scalars['Int']>;
  title: Scalars['String'];
  type: TicketType;
};

export type TicketDeletePayload = {
  __typename?: 'TicketDeletePayload';
  ticketTitle: Maybe<Scalars['String']>;
  userErrors: Array<UserError>;
};

export type TicketPayload = {
  __typename?: 'TicketPayload';
  ticket: Maybe<Ticket>;
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
  comment: InputMaybe<Scalars['String']>;
  description: InputMaybe<Scalars['String']>;
  priority: InputMaybe<TicketPriority>;
  projectId: InputMaybe<Scalars['String']>;
  references: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  status: InputMaybe<TicketStatus>;
  storyPoints: InputMaybe<Scalars['Int']>;
  ticketId: Scalars['ID'];
  title: InputMaybe<Scalars['String']>;
  type: InputMaybe<TicketType>;
};

export type TicketsPayload = {
  __typename?: 'TicketsPayload';
  tickets: Maybe<Array<Ticket>>;
  userErrors: Array<UserError>;
};

export type User = {
  __typename?: 'User';
  confirmed: Maybe<Scalars['Boolean']>;
  createdAt: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  projects: Array<Project>;
  tickets: Array<Ticket>;
  updatedAt: Maybe<Scalars['String']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  values: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type VerifyPayload = {
  __typename?: 'VerifyPayload';
  user: Maybe<User>;
  userErrors: Array<UserError>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CredentialsInput: CredentialsInput;
  GetUserPayload: ResolverTypeWrapper<GetUserPayload>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Project: ResolverTypeWrapper<Project>;
  ProjectCreateInput: ProjectCreateInput;
  ProjectDeletePayload: ResolverTypeWrapper<ProjectDeletePayload>;
  ProjectIdByNamePayload: ResolverTypeWrapper<ProjectIdByNamePayload>;
  ProjectPayload: ResolverTypeWrapper<ProjectPayload>;
  ProjectUpdateInput: ProjectUpdateInput;
  ProjectsPayload: ResolverTypeWrapper<ProjectsPayload>;
  Query: ResolverTypeWrapper<{}>;
  SearchTicketInput: SearchTicketInput;
  SigninPayload: ResolverTypeWrapper<SigninPayload>;
  SignupInput: SignupInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  Ticket: ResolverTypeWrapper<Ticket>;
  TicketCreateInput: TicketCreateInput;
  TicketDeletePayload: ResolverTypeWrapper<TicketDeletePayload>;
  TicketPayload: ResolverTypeWrapper<TicketPayload>;
  TicketPriority: TicketPriority;
  TicketStatus: TicketStatus;
  TicketType: TicketType;
  TicketUpdateInput: TicketUpdateInput;
  TicketsPayload: ResolverTypeWrapper<TicketsPayload>;
  User: ResolverTypeWrapper<User>;
  UserError: ResolverTypeWrapper<UserError>;
  VerifyPayload: ResolverTypeWrapper<VerifyPayload>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthPayload: AuthPayload;
  Boolean: Scalars['Boolean'];
  CredentialsInput: CredentialsInput;
  GetUserPayload: GetUserPayload;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Mutation: {};
  Project: Project;
  ProjectCreateInput: ProjectCreateInput;
  ProjectDeletePayload: ProjectDeletePayload;
  ProjectIdByNamePayload: ProjectIdByNamePayload;
  ProjectPayload: ProjectPayload;
  ProjectUpdateInput: ProjectUpdateInput;
  ProjectsPayload: ProjectsPayload;
  Query: {};
  SearchTicketInput: SearchTicketInput;
  SigninPayload: SigninPayload;
  SignupInput: SignupInput;
  String: Scalars['String'];
  Subscription: {};
  Ticket: Ticket;
  TicketCreateInput: TicketCreateInput;
  TicketDeletePayload: TicketDeletePayload;
  TicketPayload: TicketPayload;
  TicketUpdateInput: TicketUpdateInput;
  TicketsPayload: TicketsPayload;
  User: User;
  UserError: UserError;
  VerifyPayload: VerifyPayload;
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  success: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GetUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['GetUserPayload'] = ResolversParentTypes['GetUserPayload']> = {
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  confirmResend: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationConfirmResendArgs, 'email'>>;
  confirmUser: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationConfirmUserArgs, 'token'>>;
  projectCreate: Resolver<ResolversTypes['ProjectPayload'], ParentType, ContextType, RequireFields<MutationProjectCreateArgs, 'input'>>;
  projectDelete: Resolver<ResolversTypes['ProjectDeletePayload'], ParentType, ContextType, RequireFields<MutationProjectDeleteArgs, 'id'>>;
  projectUpdate: Resolver<ResolversTypes['ProjectPayload'], ParentType, ContextType, RequireFields<MutationProjectUpdateArgs, 'input'>>;
  signin: Resolver<ResolversTypes['SigninPayload'], ParentType, ContextType, RequireFields<MutationSigninArgs, 'input'>>;
  signup: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'input'>>;
  ticketCreate: Resolver<ResolversTypes['TicketPayload'], ParentType, ContextType, RequireFields<MutationTicketCreateArgs, 'input'>>;
  ticketDelete: Resolver<ResolversTypes['TicketDeletePayload'], ParentType, ContextType, RequireFields<MutationTicketDeleteArgs, 'id'>>;
  ticketUpdate: Resolver<ResolversTypes['TicketPayload'], ParentType, ContextType, RequireFields<MutationTicketUpdateArgs, 'input'>>;
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sequence: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tickets: Resolver<Array<ResolversTypes['Ticket']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectDeletePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectDeletePayload'] = ResolversParentTypes['ProjectDeletePayload']> = {
  projectName: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectIdByNamePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectIdByNamePayload'] = ResolversParentTypes['ProjectIdByNamePayload']> = {
  projectId: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectPayload'] = ResolversParentTypes['ProjectPayload']> = {
  project: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProjectsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProjectsPayload'] = ResolversParentTypes['ProjectsPayload']> = {
  projects: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  getMyProfile: Resolver<ResolversTypes['GetUserPayload'], ParentType, ContextType>;
  getMyProject: Resolver<ResolversTypes['ProjectPayload'], ParentType, ContextType, RequireFields<QueryGetMyProjectArgs, 'id'>>;
  getMyProjectIdByName: Resolver<ResolversTypes['ProjectIdByNamePayload'], ParentType, ContextType, RequireFields<QueryGetMyProjectIdByNameArgs, 'projectName'>>;
  getMyProjects: Resolver<ResolversTypes['ProjectsPayload'], ParentType, ContextType>;
  getMyTickets: Resolver<ResolversTypes['TicketsPayload'], ParentType, ContextType, Partial<QueryGetMyTicketsArgs>>;
  getTicket: Resolver<ResolversTypes['TicketPayload'], ParentType, ContextType, RequireFields<QueryGetTicketArgs, 'id'>>;
  getUser: Resolver<ResolversTypes['GetUserPayload'], ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  verifyUser: Resolver<ResolversTypes['VerifyPayload'], ParentType, ContextType, RequireFields<QueryVerifyUserArgs, 'token'>>;
};

export type SigninPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['SigninPayload'] = ResolversParentTypes['SigninPayload']> = {
  token: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _: SubscriptionResolver<Maybe<ResolversTypes['Boolean']>, "_", ParentType, ContextType>;
};

export type TicketResolvers<ContextType = any, ParentType extends ResolversParentTypes['Ticket'] = ResolversParentTypes['Ticket']> = {
  comment: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  priority: Resolver<ResolversTypes['TicketPriority'], ParentType, ContextType>;
  projectId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  references: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  sequenceId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status: Resolver<ResolversTypes['TicketStatus'], ParentType, ContextType>;
  storyPoints: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['TicketType'], ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketDeletePayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TicketDeletePayload'] = ResolversParentTypes['TicketDeletePayload']> = {
  ticketTitle: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TicketPayload'] = ResolversParentTypes['TicketPayload']> = {
  ticket: Resolver<Maybe<ResolversTypes['Ticket']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TicketsPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['TicketsPayload'] = ResolversParentTypes['TicketsPayload']> = {
  tickets: Resolver<Maybe<Array<ResolversTypes['Ticket']>>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  confirmed: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  projects: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>;
  tickets: Resolver<Array<ResolversTypes['Ticket']>, ParentType, ContextType>;
  updatedAt: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserError'] = ResolversParentTypes['UserError']> = {
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type VerifyPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['VerifyPayload'] = ResolversParentTypes['VerifyPayload']> = {
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userErrors: Resolver<Array<ResolversTypes['UserError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload: AuthPayloadResolvers<ContextType>;
  GetUserPayload: GetUserPayloadResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
  Project: ProjectResolvers<ContextType>;
  ProjectDeletePayload: ProjectDeletePayloadResolvers<ContextType>;
  ProjectIdByNamePayload: ProjectIdByNamePayloadResolvers<ContextType>;
  ProjectPayload: ProjectPayloadResolvers<ContextType>;
  ProjectsPayload: ProjectsPayloadResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  SigninPayload: SigninPayloadResolvers<ContextType>;
  Subscription: SubscriptionResolvers<ContextType>;
  Ticket: TicketResolvers<ContextType>;
  TicketDeletePayload: TicketDeletePayloadResolvers<ContextType>;
  TicketPayload: TicketPayloadResolvers<ContextType>;
  TicketsPayload: TicketsPayloadResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  UserError: UserErrorResolvers<ContextType>;
  VerifyPayload: VerifyPayloadResolvers<ContextType>;
};

