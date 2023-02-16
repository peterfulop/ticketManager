import client from '../apollo-client';
import { User } from '../apollo/graphql-generated/types';
import { VerifyUserDocument } from '../apollo/graphql/auth/auth.generated';

type ValidateInputs = {
  token: string;
  callback: (error: string | null, user: User | null) => void;
};

export const Validate = async (input: ValidateInputs) => {
  const { token, callback } = input;
  try {
    const response = await client.query({
      query: VerifyUserDocument,
      variables: {
        token,
      },
    });

    if (response.errors) {
      callback('Unable to validate.', null);
    }
    const { user } = response.data.verifyUser;
    if (user) {
      callback(null, user);
    } else {
      callback('Unable to validate.', null);
    }
  } catch (error) {
    callback('Unable to validate.', null);
  }
};
