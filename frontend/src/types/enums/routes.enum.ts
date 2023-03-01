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

  DASHBOARD = '/projects/:projectId/dashboard',
  DASHBOARD_PROJECT_DETAILS = '/projects/:projectId/dashboard',
  DASHBOARD_SPRINT_DETAILS = '/projects/:projectId/dashboard/:sprintId/sprint',
  DASHBOARD_USER_DETAILS = '/projects/:projectId/dashboard/:userId/member',
  DASHBOARD_TICKET_DETAILS = '/projects/:projectId/dashboard/:ticketId/ticket',
}
