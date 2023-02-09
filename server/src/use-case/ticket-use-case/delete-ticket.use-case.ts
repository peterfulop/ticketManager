import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  MutationTicketDeleteArgs,
  TicketDeletePayload,
} from '../../types/graphql-generated/graphql';

export type DeleteTicketInput = {
  args: MutationTicketDeleteArgs;
  context: ApolloContext;
};

export const deleteTicketUseCase = async (
  input: DeleteTicketInput
): Promise<TicketDeletePayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

  const ticketPayload: TicketDeletePayload = {
    userErrors: [],
    success: false,
  };

  const ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) {
    return {
      ...ticketPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.MISSING_RECORD }],
    };
  }

  const { userErrors } = await canUserMutateService({
    prisma,
    userId: user?.userId,
    id: ticket.id,
    targetTable: PrismaTable.TICKET,
  });

  if (userErrors.length) {
    return {
      ...ticketPayload,
      userErrors,
    };
  }

  try {
    await prisma.ticket.delete({ where: { id } });
    return {
      ...ticketPayload,
      success: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...ticketPayload,
      userErrors,
    };
  }
};
