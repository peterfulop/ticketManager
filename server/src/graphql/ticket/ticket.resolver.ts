import { ApolloContext } from '../../apollo';
import {
  MutationTicketCreateArgs,
  MutationTicketDeleteArgs,
  MutationTicketStatusUpdateArgs,
  MutationTicketUpdateArgs,
  QueryGetMyTicketsArgs,
  QueryGetTicketArgs,
  TicketDeletePayload,
  TicketPayload,
  TicketsPayload,
} from '../../types/graphql-generated/graphql';

import { createTicketUseCase } from '../../use-case/ticket-use-case/create-ticket.use-case';
import { deleteTicketUseCase } from '../../use-case/ticket-use-case/delete-ticket.use-case';
import { getMyTicketUseCase } from '../../use-case/ticket-use-case/get-my-ticket.use-case';
import { getMyTicketsUseCase } from '../../use-case/ticket-use-case/get-my-tickets.use-case';
import { updateTicketStatusUseCase } from '../../use-case/ticket-use-case/update-ticket-status.use-case';
import { updateTicketUseCase } from '../../use-case/ticket-use-case/update-ticket.use-case';

export const ticketGQLResolvers = {
  Query: {
    getTicket: async (
      _parent: any,
      args: QueryGetTicketArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      return await getMyTicketUseCase({ args, context });
    },
    getMyTickets: async (
      _parent: any,
      args: QueryGetMyTicketsArgs,
      context: ApolloContext
    ): Promise<TicketsPayload> => {
      return await getMyTicketsUseCase({ args, context });
    },
  },
  Mutations: {
    ticketCreate: async (
      _parent: any,
      args: MutationTicketCreateArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      return await createTicketUseCase({ args, context });
    },
    ticketUpdate: async (
      _parent: any,
      args: MutationTicketUpdateArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      return await updateTicketUseCase({ args, context });
    },
    ticketStatusUpdate: async (
      _parent: any,
      args: MutationTicketStatusUpdateArgs,
      context: ApolloContext
    ): Promise<TicketPayload> => {
      return await updateTicketStatusUseCase({ args, context });
    },
    ticketDelete: async (
      _parent: any,
      args: MutationTicketDeleteArgs,
      context: ApolloContext
    ): Promise<TicketDeletePayload> => {
      return await deleteTicketUseCase({ args, context });
    },
  },
};
