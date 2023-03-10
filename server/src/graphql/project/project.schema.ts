export const projectTypeDefs = `#graphql
  extend type Query {
    getMyProjects: ProjectsPayload!
    getMyProject(id:ID!): ProjectPayload!
    getMyProjectIdByName(projectName: String!): ProjectIdByNamePayload!
  }

  extend type Mutation {
    projectCreate(input: ProjectCreateInput!): ProjectPayload!
    projectUpdate(input: ProjectUpdateInput!): ProjectPayload!
    projectDelete(id: ID!): ProjectDeletePayload!
  }

  input ProjectCreateInput {
    name: String!
  }

  input ProjectUpdateInput {
    projectId: String!
    name: String!
  }

  type Project {
    id: ID!
    name: String!
    sequence: Int!
    createdAt: String
    updatedAt: String
    tickets:[Ticket!]!
    user: User!
    userId: String!
  }

  type ProjectPayload {
    userErrors: [UserError!]!
    project: Project
  }

  type ProjectsPayload {
    userErrors: [UserError!]!
    projects: [Project!]!
  }


  type ProjectIdByNamePayload {
    userErrors: [UserError!]!
    projectId: ID
  }

  type ProjectDeletePayload {
    userErrors: [UserError!]!
    success: Boolean
  }

`;
