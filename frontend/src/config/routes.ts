import { NotFound } from '../pages/404';
import { ConfirmUser } from '../pages/confirm-user';
import { HomePage } from '../pages/home';
import { LoginPage } from '../pages/login';
import { ProfilePage } from '../pages/profile';
import { ProjectsPage } from '../pages/projects';
import { SignupPage } from '../pages/signup';
import { TicketsPage } from '../pages/tickets';

import { ERoutePath } from '../types/enums/routes.enum';
import IRoute from '../types/interfaces/route.iterface';

const authRoutes: IRoute[] = [
  {
    path: ERoutePath.LOGIN,
    auth: false,
    component: LoginPage,
    name: 'Login',
  },
  {
    path: ERoutePath.SIGNUP,
    auth: false,
    component: SignupPage,
    name: 'Register',
  },
  {
    path: ERoutePath.LOGOUT,
    auth: false,
    component: SignupPage,
    name: 'Logout',
  },
  {
    path: ERoutePath.CONFIRM_USER,
    auth: false,
    component: ConfirmUser,
    name: 'User confirm',
  },
];

const mainRoutes: IRoute[] = [
  {
    path: ERoutePath.HOME,
    auth: false,
    component: HomePage,
    name: 'Home',
  },
  {
    path: ERoutePath.PROFILE,
    auth: true,
    component: ProfilePage,
    name: 'Profile',
  },
  {
    path: ERoutePath.NOT_FOUND,
    auth: false,
    component: NotFound,
    name: '404',
  },
];

const projectRoutes: IRoute[] = [
  {
    path: ERoutePath.PROJECTS,
    auth: true,
    component: ProjectsPage,
    name: 'Projects page',
  },
  {
    path: ERoutePath.PROJECTS_DETAILS,
    auth: true,
    component: ProjectsPage,
    name: 'Projects page',
  },
];

const ticketRoutes: IRoute[] = [
  {
    path: ERoutePath.TICKETS,
    auth: true,
    component: TicketsPage,
    name: 'Tickets page',
  },
  {
    path: ERoutePath.TICKET_DETAILS,
    auth: true,
    component: TicketsPage,
    name: 'Tickets page',
  },
];

const routes: IRoute[] = [
  ...authRoutes,
  ...mainRoutes,
  ...projectRoutes,
  ...ticketRoutes,
];

export default routes;
