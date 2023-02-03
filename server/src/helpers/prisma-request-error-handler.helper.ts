import { Prisma } from '@prisma/client';
import { DBErrorMessages } from '../enum/db-error-messages.enum';
import { UserError } from '../types/graphql-generated/graphql';

type ErrorPayload = {
  userErrors: UserError[];
};

export const prismaRequestErrorHandler = (error: any): ErrorPayload => {
  const errorPayload: ErrorPayload = {
    userErrors: [],
  };
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const data = Object.values(
      (error?.meta as Record<string, unknown>) || {}
    ).map((item) => {
      return item as string[];
    })[0];

    switch (error.code) {
      case 'P2002':
        errorPayload.userErrors.push({
          message: DBErrorMessages.UNIQUE_CONSTRAINT_FAIL,
          values: [...data],
        });
        break;
      default:
        errorPayload.userErrors.push({
          message: error.message,
          values: [...data],
        });
        break;
    }
  } else {
    errorPayload.userErrors.push({
      message: error.message,
      values: [],
    });
  }
  return errorPayload;
};
