import { Collaboration, Project, Sprint, Ticket } from '@prisma/client';
import { ApolloContext } from '../../apollo';
import { DBErrorMessages } from '../../enum/db-error-messages.enum';
import { PrismaTable } from '../../enum/prisma-tables.enum';
import { userError } from '../../helpers/user-error';
import { UserError } from '../../types/graphql-generated/graphql';
import { Role } from '../../types/types';

export type CanUserMutateServiceInput = {
  id: string;
  targetTable: PrismaTable;
  prisma: ApolloContext['prisma'];
  userId?: string;
  role?: Role;
};

export type MutationPayload = {
  userErrors: UserError[];
};

export const canUserMutateService = async (
  input: CanUserMutateServiceInput
): Promise<MutationPayload> => {
  const { userId, id, prisma } = input;

  let authPayload: MutationPayload = {
    userErrors: [],
  };

  if (!userId) {
    return {
      ...authPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.AUTHORIZATION_FAILED,
        },
      ],
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return {
      ...authPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.USER_UNAUTHORIZED,
          values: [userId],
        },
      ],
    };
  }

  let result: Project | Ticket | Sprint | Collaboration | null = null;

  switch (input.targetTable) {
    case PrismaTable.PROJECT: {
      result = await prisma[PrismaTable.PROJECT].findUnique({
        where: {
          id,
        },
      });
      break;
    }
    case PrismaTable.TICKET: {
      result = await prisma[PrismaTable.TICKET].findUnique({
        where: {
          id,
        },
      });
      break;
    }
    case PrismaTable.SPRINT: {
      result = await prisma[PrismaTable.SPRINT].findUnique({
        where: {
          id,
        },
      });
      break;
    }
    case PrismaTable.COLLABORATION: {
      result = await prisma[PrismaTable.COLLABORATION].findUnique({
        where: {
          id,
        },
      });
      break;
    }
  }

  if (result?.userId !== userId) {
    authPayload = {
      ...authPayload,
      userErrors: [
        {
          ...userError,
          message: DBErrorMessages.PERMISSION_DENIED,
        },
      ],
    };
  }

  return {
    ...authPayload,
  };
};
