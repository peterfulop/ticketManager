export enum RoutePath {
  HOME = '/',
  NOT_FOUND = '/*',
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  PROFILE = '/profile',
  CONFIRM_USER = '/user/confirm/:confirmToken',
  PROJECT_DETAILS = '/projects/:projectId',
  PROJECTS = '/projects',
  TICKET_DETAILS = '/projects/:projectId/tickets/:ticketId',
  TICKETS = '/projects/:projectId/tickets',
}
