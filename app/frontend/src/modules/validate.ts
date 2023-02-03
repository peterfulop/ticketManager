import client from '../apollo-client';
import { ConfirmUserDocument } from '../apollo/common-queries/auth.generated';
import { User } from '../apollo/graphql-generated/types';
// import { ConfirmUserDocument } from '../graphql/auth/auth.generated';

type ValidateInputs = {
  token: string;
  callback: (error: string | null, user: User | null) => void;
};

export const Validate = async (input: ValidateInputs) => {
  const { token, callback } = input;
  try {
    const response = await client.mutate({
      mutation: ConfirmUserDocument,
      variables: {
        confirmUserToken: token as string,
      },
    });
    if (response.errors) {
      callback('Unable to validate.', null);
    }
    const { token: serverSideToken } = response.data.confirmUser;
    if (serverSideToken) {
      callback(null, serverSideToken);
    } else {
      callback('Unable to validate.', null);
    }
  } catch (error) {
    callback('Unable to validate.', null);
  }
};
