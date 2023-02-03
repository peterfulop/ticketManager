export const authTypeDefs = `#graphql
 extend type Mutation {
    signup(input:SignupInput!):AuthPayload!
    signin(input:CredentialsInput!):AuthPayload!
    confirmUser(token:String!):ConfirmPayload!
    confirmResend(email:String!):AuthPayload!
  }

  input SignupInput {
    name: String!
    credentials:CredentialsInput!
    passwordConfirm: String!
  }

  input CredentialsInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  type ConfirmPayload {
    userErrors: [UserError!]!
    confirmed: Boolean
  }
`;
