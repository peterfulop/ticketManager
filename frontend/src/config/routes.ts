import { NotFound } from '../pages/404/not-found';
import { ConfirmUser } from '../pages/confirm-user/confirm-user';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { ProjectDetailsPage } from '../pages/project/project-details/project-details';
import { ProjectsPage } from '../pages/project/projects/projects';
import { SignupPage } from '../pages/signup/signin';
import { TicketsDetailsPage } from '../pages/ticket/ticket-details/ticket-details';
import { TicketsPage } from '../pages/ticket/tickets/tickets';
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
    path: RoutePath.PROJECT_DETAILS,
    auth: true,
    component: ProjectDetailsPage,
    name: 'Project details page',
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
    component: TicketsDetailsPage,
    name: 'Ticket details page',
  },
];

const routes: IRoute[] = [
  ...authRoutes,
  ...mainRoutes,
  ...projectRoutes,
  ...ticketRoutes,
];

export default routes;
