export const ticketTypeDefs = `#graphql
  extend type Query {
    getTicket(id: ID!): TicketPayload!
    getMyTickets: TicketsPayload!
  }

  extend type Mutation {
    ticketCreate(input: TicketCreateInput!): TicketPayload!
    ticketUpdate(input: TicketUpdateInput!): TicketPayload!
    ticketDelete(id: ID!): TicketDeletePayload!
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

  input TicketCreateInput {
    projectId: String!
    title: String!
    status: TicketStatus!
    priority: TicketPriority!
    description: String
    comment: String
    references: [String]
  }

  input TicketUpdateInput {
    ticketId: ID!
    projectId: String
    title: String
    status: TicketStatus
    priority: TicketPriority
    description: String
    comment: String
    references: [String]
  }

  type Ticket {
    id: ID!
    userId: String!
    projectId: String!
    title: String!
    status: TicketStatus!
    priority: TicketPriority!
    description: String
    comment: String
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
    ticketTitle: String
  }

`;
