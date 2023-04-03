import { NotFound } from '../pages/404';
import { ConfirmUser } from '../pages/confirm-user';
import { DashboardPage } from '../pages/dashboard';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { ProfilePage } from '../pages/profile';
import { ProjectsPage } from '../pages/projects';
import { SignupPage } from '../pages/signup';
import { TicketsPage } from '../pages/tickets';

import { RoutePath } from '../types/enums/routes.enum';
import IRoute from '../types/interfaces/route.iterface';

const authRoutes: IRoute[] = [
  {
    path: RoutePath.LOGIN,
    auth: false,
    component: LoginPage,
    name: 'Login',
  },
  {
    path: RoutePath.SIGNUP,
    auth: false,
    component: SignupPage,
    name: 'Register',
  },
  {
    path: RoutePath.LOGOUT,
    auth: false,
    component: SignupPage,
    name: 'Logout',
  },
  {
    path: RoutePath.CONFIRM_USER,
    auth: false,
    component: ConfirmUser,
    name: 'User confirm',
  },
];

const mainRoutes: IRoute[] = [
  {
    path: RoutePath.HOME,
    auth: false,
    component: HomePage,
    name: 'Home',
  },
  {
    path: RoutePath.PROFILE,
    auth: true,
    component: ProfilePage,
    name: 'Profile',
  },
  {
    path: RoutePath.NOT_FOUND,
    auth: false,
    component: NotFound,
    name: '404',
  },
];

const projectRoutes: IRoute[] = [
  {
    path: RoutePath.PROJECTS,
    auth: true,
    component: ProjectsPage,
    name: 'Projects page',
  },

  {
    path: RoutePath.PROJECTS_DETAILS,
    auth: true,
    component: ProjectsPage,
    name: 'Projects page',
  },
];

const dashboardRoutes: IRoute[] = [
  {
    path: RoutePath.DASHBOARD,
    auth: true,
    component: DashboardPage,
    name: 'Dashboard page',
  },
  {
    path: RoutePath.DASHBOARD_USER_DETAILS,
    auth: true,
    component: DashboardPage,
    name: 'User details page',
  },
  {
    path: RoutePath.DASHBOARD_TICKET_DETAILS,
    auth: true,
    component: DashboardPage,
    name: 'Ticket details page',
  },
  {
    path: RoutePath.DASHBOARD_SPRINT_DETAILS,
    auth: true,
    component: DashboardPage,
    name: 'Sprint details page',
  },
];

const ticketRoutes: IRoute[] = [
  {
    path: RoutePath.TICKETS,
    auth: true,
    component: TicketsPage,
    name: 'Tickets page',
  },
  {
    path: RoutePath.TICKET_DETAILS,
    auth: true,
    component: TicketsPage,
    name: 'Tickets page',
  },
];

const routes: IRoute[] = [
  ...authRoutes,
  ...mainRoutes,
  ...projectRoutes,
  ...dashboardRoutes,
  ...ticketRoutes,
];

export default routes;
