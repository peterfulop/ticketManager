export enum ERoutePath {
  HOME = '/',
  NOT_FOUND = '/*',
  SIGNUP = '/signup',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PROFILE = '/profile',
  CONFIRM_USER = '/user/confirm/:confirmToken',
  PROJECTS = '/projects',
  PROJECTS_DETAILS = '/projects/:projectId',
  TICKET_DETAILS = '/projects/:projectId/tickets/:ticketId',
  TICKETS = '/projects/:projectId/tickets',
}
