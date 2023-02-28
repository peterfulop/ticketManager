import { ApolloContext } from '../../apollo';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  BooleanPayload,
  MutationProjectCreateArgs,
  MutationProjectDeleteArgs,
  MutationProjectUpdateArgs,
  ProjectIdByNamePayload,
  ProjectPayload,
  ProjectsPayload,
  QueryGetProjectArgs,
  QueryGetProjectIdByNameArgs,
  ResolversParentTypes,
  Ticket,
} from '../../types/graphql-generated/graphql';

import { createProjectUseCase } from '../../use-case/project-use-case/create-project.use-case';
import { deleteProjectUseCase } from '../../use-case/project-use-case/delete-project.use-case';
import { getMyProjectsUseCase } from '../../use-case/project-use-case/get-my-projects.use-case';
import { getProjectCollaborationsUseCase } from '../../use-case/project-use-case/get-project-collaborations.use-case';
import { getProjectByNameUseCase } from '../../use-case/project-use-case/get-project-id-by-name.use-case';
import { getProjectWithTicketsUseCase } from '../../use-case/project-use-case/get-project-with-tickets.use-case';
import { getMyProjectUseCase } from '../../use-case/project-use-case/get-project.use-case';
import { updateProjectUseCase } from '../../use-case/project-use-case/update-project.use-case';

export const projectGQLResolver = {
  Query: {
    getProject: async (
      _parent: unknown,
      args: QueryGetProjectArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      authMiddleware(context);
      return await getMyProjectUseCase({ args, context });
    },
    getMyProjects: async (
      _parent: unknown,
      _args: unknown,
      context: ApolloContext
    ): Promise<ProjectsPayload> => {
      authMiddleware(context);
      return await getMyProjectsUseCase({ context });
    },
    getProjectCollaborations: async (
      _parent: unknown,
      _args: unknown,
      context: ApolloContext
    ): Promise<ProjectsPayload> => {
      authMiddleware(context);
      return await getProjectCollaborationsUseCase({ context });
    },
    getProjectIdByName: async (
      _parent: unknown,
      args: QueryGetProjectIdByNameArgs,
      context: ApolloContext
    ): Promise<ProjectIdByNamePayload> => {
      authMiddleware(context);
      return await getProjectByNameUseCase({ args, context });
    },
  },
  Mutations: {
    projectCreate: async (
      _parent: unknown,
      args: MutationProjectCreateArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      authMiddleware(context);
      return await createProjectUseCase({ args, context });
    },
    projectUpdate: async (
      _parent: unknown,
      args: MutationProjectUpdateArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      authMiddleware(context);
      return await updateProjectUseCase({ args, context });
    },
    projectDelete: async (
      _parent: unknown,
      args: MutationProjectDeleteArgs,
      context: ApolloContext
    ): Promise<BooleanPayload> => {
      authMiddleware(context);
      return await deleteProjectUseCase({ args, context });
    },
  },
  Project: {
    tickets: async (
      parent: ResolversParentTypes['Project'],
      _args: unknown,
      context: ApolloContext
    ): Promise<Ticket> => {
      authMiddleware(context);
      return await getProjectWithTicketsUseCase({ parent, context });
    },
  },
};
