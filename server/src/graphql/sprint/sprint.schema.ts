export const sprintTypeDefs = `#graphql
  extend type Query {
    getSprint(id: ID!): SprintPayload!
    getSprints(input:SearchSprintInput): SprintsPayload!
  }

  extend type Mutation {
    sprintCreate(input: SprintCreateInput!): SprintPayload!
    sprintClose(sprintId: ID!): SprintPayload!
    sprintUpdate(input: SprintUpdateInput!): SprintPayload!
    sprintDelete(id: ID!): BooleanPayload!
  }

  input SearchSprintInput {
    projectId: String
    title: String
    goal: String
  }

  input SprintCreateInput {
    projectId: String!
    title: String!
    goal: String!
    startDate: String!
    endDate: String!
  }

  input SprintUpdateInput {
    sprintId: ID!
    projectId: String
    title: String
    goal: String
    startDate: String
    endDate: String
  }

  type Sprint {
    id: ID!
    userId: String!
    projectId: String!
    title: String!
    goal: String!
    closed: Boolean!
    startDate: String!
    endDate: String!
    createdAt: String
    updatedAt: String
  }

  type SprintPayload {
    userErrors: [UserError!]!
    sprint: Sprint
  }

  type SprintsPayload {
    userErrors: [UserError!]!
    sprints: [Sprint!]
  }

`;
