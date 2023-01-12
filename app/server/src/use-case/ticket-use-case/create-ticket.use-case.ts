import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  MutationTicketCreateArgs,
  TicketPayload,
} from '../../types/graphql-generated/graphql';
import { reduceObjectBy } from '../../utils/reduce-object';

export type CreateTicketInput = {
  args: MutationTicketCreateArgs;
  context: ApolloContext;
};

export const createTicketUseCase = async (
  input: CreateTicketInput
): Promise<TicketPayload> => {
  const {
    title,
    status,
    priority,
    type,
    projectId,
    description,
    comment,
    references,
  } = input.args.input;
  const userId = input.context.user?.userId;
  const { prisma, user } = input.context;

  const ticketPayload: TicketPayload = {
    userErrors: [],
    ticket: null,
  };

  if (!userId) {
    return {
      ...ticketPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userExists) {
    return {
      ...ticketPayload,
      userErrors: [{ ...userError, message: DBErrorMessages.UNAUTHENTICATED }],
    };
  }

  if (!title || !status) {
    const missingFields = Object.keys(reduceObjectBy(input.args.input, true));
    return {
      ...ticketPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_FIELDS,
          values: missingFields,
        },
      ],
    };
  }

  const isProjectExists = await prisma.project.findFirst({
    where: {
      userId: user?.userId,
      id: projectId,
    },
  });

  if (!isProjectExists) {
    return {
      ...ticketPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.MISSING_RECORD,
          values: [projectId],
        },
      ],
    };
  }

  if (references?.length) {
    const missingRefs: string[] = [];
    await Promise.all(
      references?.map(async (ref) => {
        const isReferenceExists = await prisma.ticket.findUnique({
          where: {
            id: String(ref),
          },
        });
        if (!isReferenceExists) {
          missingRefs.push(String(ref));
        }
      })
    );

    if (missingRefs?.length) {
      return {
        ...ticketPayload,
        userErrors: [
          {
            ...userError,
            message: DBErrorMessages.MISSING_RECORD,
            values: [...missingRefs],
          },
        ],
      };
    }
  }

  try {
    const ticket = await prisma.ticket.create({
      data: {
        userId,
        projectId,
        title,
        status,
        priority,
        type,
        comment,
        description,
        references: references as string[],
      },
    });
    return {
      ...ticketPayload,
      ticket: {
        ...ticket,
        status,
        priority,
        type,
        createdAt: ticket.createdAt.toISOString(),
        updatedAt: ticket.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error);
    return {
      ...ticketPayload,
      userErrors,
    };
  }
};
