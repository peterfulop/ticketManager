export enum RoutePath {
  HOME = '/',
  NOT_FOUND = '/*',
  SIGNUP = '/signup',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PROFILE = '/profile',
  CONFIRM_USER = '/user/confirm/:confirmToken',
  PROJECT_DETAILS = '/projects/:projectId',
  PROJECTS = '/projects',
  TICKET_DETAILS = '/projects/:projectId/tickets/:ticketId',
  TICKETS = '/projects/:projectId/tickets',
}
