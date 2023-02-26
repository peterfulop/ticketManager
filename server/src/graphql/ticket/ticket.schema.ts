export const ticketTypeDefs = `#graphql
  extend type Query {
    getTicket(id: ID!): TicketPayload!
    getMyTickets(input:SearchTicketInput): TicketsPayload!
  }

  extend type Mutation {
    ticketCreate(input: TicketCreateInput!): TicketPayload!
    ticketUpdate(input: TicketUpdateInput!): TicketPayload!
    ticketDelete(id: ID!): TicketDeletePayload!
    ticketStatusUpdate(input:TicketStatusUpdateInput!):TicketPayload!
  }

  input SearchTicketInput {
    id: String
    projectId: String
    sprintId: String
    title: String
    status: TicketStatus
    priority: TicketPriority
    type: TicketType
    description: String
  }

  enum TicketStatus {
    TO_DO
    IN_PROGRESS
    BLOCKED
    REVIEW
    DONE
    ARCHIVED
    BACKLOG
  }

  enum TicketPriority {
    URGENT
    HIGHT
    MEDIUM
    LOW
  }

  enum TicketType {
    BUG
    TASK
    STORY
    EPIC
  }

  input TicketCreateInput {
    projectId: String!
    title: String!
    status: TicketStatus!
    priority: TicketPriority!
    storyPoints: Int
    sprintId: String!
    type: TicketType!
    description: String
    references: [String]
  }

  input TicketUpdateInput {
    ticketId: ID!
    sprintId: String!
    projectId: String
    title: String
    status: TicketStatus
    priority: TicketPriority
    storyPoints: Int
    type: TicketType
    description: String
    references: [String]
  }

  input TicketStatusUpdateInput {
    ticketId: ID!
    status: TicketStatus!
  }

  type Ticket {
    id: ID!
    userId: String!
    projectId: String!
    title: String!
    status: TicketStatus!
    priority: TicketPriority!
    type: TicketType!
    storyPoints: Int
    description: String
    sequenceId: String!
    sprintId: String!
    references: [String]
    createdAt: String
    updatedAt: String
  }

  type TicketPayload {
    userErrors: [UserError!]!
    ticket: Ticket
  }

  type TicketsPayload {
    userErrors: [UserError!]!
    tickets: [Ticket!]
  }

  type TicketDeletePayload {
    userErrors: [UserError!]!
    success: Boolean
  }

`;
