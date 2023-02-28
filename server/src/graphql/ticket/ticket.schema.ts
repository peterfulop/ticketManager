export const ticketTypeDefs = `#graphql
  extend type Query {
    getTicket(projectId: ID!, id: ID!): TicketPayload!
    getTickets(projectId: ID!, input:SearchTicketInput): TicketsPayload!
  }

  extend type Mutation {
    ticketCreate(input: TicketCreateInput!): TicketPayload!
    ticketUpdate(input: TicketUpdateInput!): TicketPayload!
    ticketDelete(id: ID!): BooleanPayload!
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
    priority: TicketPriority!
    type: TicketType!
    sprintId: String
    status: TicketStatus
    storyPoints: Int
    description: String
    references: [String]
  }

  input TicketUpdateInput {
    ticketId: ID!
    sprintId: String
    status: TicketStatus
    projectId: String
    title: String
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
    sequenceId: String!
    storyPoints: Int
    description: String
    sprintId: String
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

`;
