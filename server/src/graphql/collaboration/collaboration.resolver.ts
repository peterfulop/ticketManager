import { ApolloContext } from '../../apollo';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  BooleanPayload,
  MutationCollaborationDeleteArgs,
  ProjectPayload,
  ProjectsPayload,
  QueryGetProjectArgs,
} from '../../types/graphql-generated/graphql';
import { MutationCollaborationCreateArgs } from '../../types/types';
import { createCollaborationUseCase } from '../../use-case/collaboration-use-case/create-collaboration.use-case';
import { deleteCollaborationUseCase } from '../../use-case/collaboration-use-case/delete-collaboration.use-case';

import { getMyProjectsUseCase } from '../../use-case/project-use-case/get-my-projects.use-case';
import { getProjectUseCase } from '../../use-case/project-use-case/get-project.use-case';

export const collaborationGQLResolvers = {
  Query: {
    getCollaboration: async (
      _parent: unknown,
      args: QueryGetProjectArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      authMiddleware(context);
      return await getProjectUseCase({ args, context });
    },
    getCollaborations: async (
      _parent: unknown,
      _args: unknown,
      context: ApolloContext
    ): Promise<ProjectsPayload> => {
      authMiddleware(context);
      return await getMyProjectsUseCase({ context });
    },
  },
  Mutations: {
    collaborationCreate: async (
      _parent: unknown,
      args: MutationCollaborationCreateArgs,
      context: ApolloContext
    ): Promise<BooleanPayload> => {
      authMiddleware(context);
      return await createCollaborationUseCase({ args, context });
    },
    collaborationDelete: async (
      _parent: unknown,
      args: MutationCollaborationDeleteArgs,
      context: ApolloContext
    ): Promise<BooleanPayload> => {
      authMiddleware(context);
      return await deleteCollaborationUseCase({ args, context });
    },
  },
};
