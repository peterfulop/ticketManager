import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import { canUserMutateService } from '../../service/can-user-mutate/can-user-mutate.service';
import {
  BooleanPayload,
  MutationTicketDeleteArgs,
} from '../../types/graphql-generated/graphql';

export type DeleteTicketInput = {
  args: MutationTicketDeleteArgs;
  context: ApolloContext;
};

export const deleteTicketUseCase = async (
  input: DeleteTicketInput
): Promise<BooleanPayload> => {
  const { id } = input.args;
  const { prisma, user } = input.context;

  const ticketPayload: BooleanPayload = {
    userErrors: [],
    success: false,
  };

  if (!user) {
    return {
      ...ticketPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

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

    const references = await prisma.ticket.findMany({
      where: {
        references: {
          has: id,
        },
      },
    });

    await Promise.all(
      references.map(async (ticket) => {
        const updatedRefs = ticket.references.filter((ref) => ref !== id);
        await prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            references: updatedRefs,
          },
        });
      })
    );

    return {
      ...ticketPayload,
      success: true,
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...ticketPayload,
      userErrors,
    };
  }
};
