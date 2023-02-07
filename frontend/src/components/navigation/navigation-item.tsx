import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../types/enums/routes.enum';
import { IReact } from '../../types/interfaces/common.interface';

interface INavigationItem extends IReact {
  to: RoutePath;
}

export const NavigationItem: FC<INavigationItem> = (props) => {
  return (
    <NavLink
      to={props.to}
      className={({ isActive }) => (isActive ? 'link-active' : 'link')}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
      }}
    >
      {props.children}
    </NavLink>
  );
};
