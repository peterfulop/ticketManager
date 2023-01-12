import { NavigationPath } from '../enums/navigation.enum';

export type NavigationItem = {
  href: string;
  title: string;
};

export const navigationItems: NavigationItem[] = [
  {
    href: NavigationPath.HOME,
    title: 'Home',
  },
  {
    href: NavigationPath.PROFILE,
    title: 'Profile',
  },
  {
    href: NavigationPath.PROJECTS,
    title: 'Projects',
  },
  {
    href: NavigationPath.SIGNIN,
    title: 'Login',
  },
];
