import { navigationItems } from '../../helpers/navigation';
import { NavigationLink } from './navigation-item';
import './Navigation.css';

export const Navigation = (): JSX.Element => {
  return (
    <header>
      <nav>
        <ul>
          {navigationItems.map((navigationItem) => {
            return (
              <li key={navigationItem.title}>
                <NavigationLink navigationItem={navigationItem} />
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
