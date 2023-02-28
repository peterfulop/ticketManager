import { ApolloContext } from '../../apollo';
import { authMiddleware } from '../../middlewares/auth-middleware';
import {
  BooleanPayload,
  MutationTicketCreateArgs,
  MutationTicketDeleteArgs,
  MutationTicketStatusUpdateArgs,
  MutationTicketUpdateArgs,
  QueryGetTicketArgs,
  QueryGetTicketsArgs,
  TicketPayload,
  TicketsPayload,
} from '../../types/graphql-generated/graphql';

import { createTicketUseCase } from '../../use-case/ticket-use-case/create-ticket.use-case';
import { deleteTicketUseCase } from '../../use-case/ticket-use-case/delete-ticket.use-case';
import { getTicketUseCase } from '../../use-case/ticket-use-case/get-ticket.use-case';
import { getTicketsUseCase } from '../../use-case/ticket-use-case/get-tickets.use-case';
import { updateTicketStatusUseCase } from '../../use-case/ticket-use-case/update-ticket-status.use-case';
import { updateTicketUseCase } from '../../use-case/ticket-use-case/update-ticket.use-case';

export const ticketGQLResolvers = {
  Query: {
    getTicket: async (
      _parent: unknown,
      args: QueryGetTicketArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      authMiddleware(context);
      return await getTicketUseCase({ args, context });
    },
    getTickets: async (
      _parent: unknown,
      args: QueryGetTicketsArgs,
      context: ApolloContext
    ): Promise<TicketsPayload> => {
      authMiddleware(context);
      return await getTicketsUseCase({ args, context });
    },
  },
  Mutations: {
    ticketCreate: async (
      _parent: unknown,
      args: MutationTicketCreateArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      authMiddleware(context);
      return await createTicketUseCase({ args, context });
    },
    ticketUpdate: async (
      _parent: unknown,
      args: MutationTicketUpdateArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      authMiddleware(context);
      return await updateTicketUseCase({ args, context });
    },
    ticketStatusUpdate: async (
      _parent: unknown,
      args: MutationTicketStatusUpdateArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      authMiddleware(context);
      return await updateTicketStatusUseCase({ args, context });
    },
    ticketDelete: async (
      _parent: unknown,
      args: MutationTicketDeleteArgs,
      context: ApolloContext
    ): Promise<BooleanPayload> => {
      authMiddleware(context);
      return await deleteTicketUseCase({ args, context });
    },
  },
};
