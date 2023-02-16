import { ApolloContext } from '../../apollo';
import {
  MutationProjectCreateArgs,
  MutationProjectDeleteArgs,
  MutationProjectUpdateArgs,
  ProjectDeletePayload,
  ProjectIdByNamePayload,
  ProjectPayload,
  ProjectsPayload,
  QueryGetMyProjectArgs,
  QueryGetMyProjectIdByNameArgs,
  ResolversParentTypes,
  Ticket,
} from '../../types/graphql-generated/graphql';

import { createProjectUseCase } from '../../use-case/project-use-case/create-project.use-case';
import { deleteProjectUseCase } from '../../use-case/project-use-case/delete-project.use-case';
import { getMyProjectByNameUseCase } from '../../use-case/project-use-case/get-my-project-id-by-name.use-case';
import { getMyProjectUseCase } from '../../use-case/project-use-case/get-my-project.use-case';
import { getMyProjectsUseCase } from '../../use-case/project-use-case/get-my-projects.use-case';
import { getProjectWithTicketsUseCase } from '../../use-case/project-use-case/get-project-with-tickets.use-case';
import { updateProjectUseCase } from '../../use-case/project-use-case/update-project.use-case';

export const projectGQLResolver = {
  Query: {
    getMyProject: async (
      _parent: any,
      args: QueryGetMyProjectArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      return await getMyProjectUseCase({ args, context });
    },
    getMyProjects: async (
      _parent: any,
      _args: any,
      context: ApolloContext
    ): Promise<ProjectsPayload> => {
      return await getMyProjectsUseCase({ context });
    },
    getMyProjectIdByName: async (
      _parent: any,
      args: QueryGetMyProjectIdByNameArgs,
      context: ApolloContext
    ): Promise<ProjectIdByNamePayload> => {
      return await getMyProjectByNameUseCase({ args, context });
    },
  },
  Mutations: {
    projectCreate: async (
      _parent: any,
      args: MutationProjectCreateArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      return await createProjectUseCase({ args, context });
    },
    projectUpdate: async (
      _parent: any,
      args: MutationProjectUpdateArgs,
      context: ApolloContext
    ): Promise<ProjectPayload> => {
      return await updateProjectUseCase({ args, context });
    },
    projectDelete: async (
      _parent: any,
      args: MutationProjectDeleteArgs,
      context: ApolloContext
    ): Promise<ProjectDeletePayload> => {
      return await deleteProjectUseCase({ args, context });
    },
  },
  Project: {
    tickets: async (
      parent: ResolversParentTypes['Project'],
      _args: any,
      context: ApolloContext
    ): Promise<Ticket> => {
      return await getProjectWithTicketsUseCase({ parent, context });
    },
  },
};
