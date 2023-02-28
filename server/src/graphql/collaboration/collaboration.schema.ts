export const collaborationTypeDefs = `#graphql
  extend type Query {
    getCollaboration(id: ID!): CollaborationPayload!
    getCollaborations: CollaborationsPayload!
  }

  extend type Mutation {
    collaborationCreate(input: CollaborationCreateInput!): BooleanPayload!
    collaborationDelete(id: ID!): BooleanPayload!
  }

  enum Role {
  SUPER_ADMIN
  ADMIN
  TEAMLEAD
  DEVELOPER
  USER
}

   type Collaboration {
    id: ID!
    userId: String!
    projectId: String!
    inviterId: String!
    role: Role!
    createdAt: String
    updatedAt: String
  }

  input CollaborationCreateInput {
    userId: String!
    projectId: String!
    role: Role!
  }

  type CollaborationPayload {
    userErrors: [UserError!]!
    collaboration: Collaboration
  }

   type CollaborationsPayload {
    userErrors: [UserError!]!
    collaboration: [Collaboration!]!
  }

`;
