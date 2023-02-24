import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { prismaRequestErrorHandler } from '../../helpers/prisma-request-error-handler.helper';
import { userError } from '../../helpers/user-error';
import {
  MutationTicketCreateArgs,
  TicketPayload,
} from '../../types/graphql-generated/graphql';
import { generateSequenceId } from '../../utils/generate-sequence-id';
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
    storyPoints,
    projectId,
    description,
    comment,
    references,
  } = input.args.input;
  const { user } = input.context;
  const { prisma } = input.context;

  const ticketPayload: TicketPayload = {
    userErrors: [],
    ticket: null,
  };

  if (!user) {
    return {
      ...ticketPayload,
      userErrors: [
        { ...userError, message: DBErrorMessages.AUTHORIZATION_FAILED },
      ],
    };
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: user.userId,
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
    const newTicket = await prisma.ticket.create({
      data: {
        userId: user.userId,
        projectId,
        title,
        status,
        priority,
        type,
        storyPoints,
        comment,
        description,
        references: references as string[],
      },
    });

    if (!newTicket) {
      throw Error(DBErrorMessages.ERROR_ON_CREATE);
    }

    const updatedProject = await prisma.project.update({
      where: {
        id: newTicket.projectId,
      },
      data: {
        sequence: isProjectExists.sequence + 1,
      },
    });

    const { name, sequence } = updatedProject;

    const nextSequence = generateSequenceId({
      name,
      sequence,
    });

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: newTicket.id,
      },
      data: {
        sequenceId: nextSequence,
      },
    });

    return {
      ...ticketPayload,
      ticket: {
        ...updatedTicket,
        status,
        priority,
        type,
        storyPoints,
        sequenceId: nextSequence,
        createdAt: newTicket.createdAt.toISOString(),
        updatedAt: newTicket.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    const { userErrors } = prismaRequestErrorHandler(error as Error);
    return {
      ...ticketPayload,
      userErrors,
    };
  }
};
