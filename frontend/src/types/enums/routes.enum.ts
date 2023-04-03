export enum RoutePath {
  HOME = '/',
  NOT_FOUND = '/*',
  SIGNUP = '/signup',
  LOGIN = '/login',
  LOGOUT = '/logout',
  PROFILE = '/profile',
  CONFIRM_USER = '/user/confirm/:confirmToken',
  PROJECTS = '/projects',
  PROJECTS_DETAILS = '/project/:projectId',
  TICKET_DETAILS = '/project/:projectId/ticket/:ticketId',
  TICKETS = '/project/:projectId/tickets',

  DASHBOARD = '/dashboard/:projectId',
  DASHBOARD_PROJECT_DETAILS = '/dashboard/:projectId',
  DASHBOARD_SPRINT_DETAILS = '/dashboard/:projectId/sprint/:sprintId',
  DASHBOARD_USER_DETAILS = '/dashboard/:projectId/member/:userId',
  DASHBOARD_TICKET_DETAILS = '/dashboard/:projectId/ticket/:ticketId',
}
