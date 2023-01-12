import { NavLink } from 'react-router-dom';
import { NavigationItem } from '../../helpers/navigation';

export const NavigationLink = (props: { navigationItem: NavigationItem }) => {
  return (
    <NavLink
      key={props.navigationItem.title}
      to={props.navigationItem.href}
      className={(navData) => (navData.isActive ? 'active' : '')}
    >
      {props.navigationItem.title}
    </NavLink>
  );
};
