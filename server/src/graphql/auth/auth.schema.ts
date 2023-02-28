export const authTypeDefs = `#graphql
 extend type Mutation {
    signup(input:SignupInput!):BooleanPayload!
    signin(input:CredentialsInput!):SigninPayload!
    confirmUser(token:String!):BooleanPayload!
    confirmResend(email:String!):BooleanPayload!
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

  type VerifyPayload {
    userErrors: [UserError!]!
    user: User
  }
`;
