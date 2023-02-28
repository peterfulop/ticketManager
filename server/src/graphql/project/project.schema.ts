export const projectTypeDefs = `#graphql
  extend type Query {
    getProject(id:ID!): ProjectPayload!
    getMyProjects: ProjectsPayload!
    getProjectCollaborations: ProjectsPayload!
    getProjectIdByName(projectName: String!): ProjectIdByNamePayload!
  }

  extend type Mutation {
    projectCreate(input: ProjectCreateInput!): ProjectPayload!
    projectUpdate(input: ProjectUpdateInput!): ProjectPayload!
    projectDelete(id: ID!): BooleanPayload!
  }

  input ProjectCreateInput {
    name: String!
    shared: Boolean
  }

  input ProjectUpdateInput {
    projectId: String!
    name: String!
    shared: Boolean
  }

  type Project {
    id: ID!
    name: String!
    sequence: Int!
    shared: Boolean!
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

`;
