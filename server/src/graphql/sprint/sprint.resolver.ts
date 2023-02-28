import { ApolloContext } from '../../apollo';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  BooleanPayload,
  MutationSprintCloseArgs,
  MutationSprintCreateArgs,
  MutationSprintDeleteArgs,
  SprintPayload,
} from '../../types/types';
import { closeSprintUseCase } from '../../use-case/sprint-use-case/close-sprint.use-case';
import { createSprintUseCase } from '../../use-case/sprint-use-case/create-sprint.use-case';
import { deleteSprintUseCase } from '../../use-case/sprint-use-case/delete-sprint.use-case';

export const sprintGQLResolvers = {
  Query: {},
  Mutations: {
    sprintCreate: async (
      _parent: unknown,
      args: MutationSprintCreateArgs,
      context: ApolloContext
    ): Promise<SprintPayload> => {
      authMiddleware(context);
      return await createSprintUseCase({ args, context });
    },
    sprintDelete: async (
      _parent: unknown,
      args: MutationSprintDeleteArgs,
      context: ApolloContext
    ): Promise<BooleanPayload> => {
      authMiddleware(context);
      return await deleteSprintUseCase({ args, context });
    },
    sprintClose: async (
      _parent: unknown,
      args: MutationSprintCloseArgs,
      context: ApolloContext
    ): Promise<SprintPayload> => {
      authMiddleware(context);
      return await closeSprintUseCase({ args, context });
    },
  },
};
