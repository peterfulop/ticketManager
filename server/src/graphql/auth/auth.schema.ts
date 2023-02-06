export const authTypeDefs = `#graphql
 extend type Mutation {
    signup(input:SignupInput!):AuthPayload!
    signin(input:CredentialsInput!):SigninPayload!
    confirmUser(token:String!):ConfirmPayload!
    confirmResend(email:String!):ConfirmResendPayload!
  }

  extend type Query {
    verifyUser(token:String!):VerifyPayload!
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

  type SigninPayload {
    userErrors: [UserError!]!
    token: String
    user: User
  }

  type AuthPayload {
    userErrors: [UserError!]!
    token: String
  }

  type ConfirmPayload {
    userErrors: [UserError!]!
    confirmed: Boolean
  }

  type ConfirmResendPayload {
    userErrors: [UserError!]!
    resent: Boolean
  }

  type VerifyPayload {
    userErrors: [UserError!]!
    user: User
  }
`;
