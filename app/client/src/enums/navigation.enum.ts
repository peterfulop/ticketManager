export enum NavigationPath {
  HOME = '/',
  PROJECTS = '/projects',
  PROJECT = '/projects/:projectId',
  TICKETS = '/projects/:projectId/tickets',
  TICKET = '/projects/:projectId/tickets/:ticketId',
  SIGNUP = '/signup',
  SIGNIN = '/signin',
  PROFILE = '/profile',
}

export type NavigationPathType = keyof typeof NavigationPath;
