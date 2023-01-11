import { Link } from 'react-router-dom';
import { Navigation } from '../../enums/navigation.enum';
import EnStrings from '../../utilities/strings';

export const NotFound = (): JSX.Element => {
  return (
    <div>
      <h2>{EnStrings.SCREENS.NOT_FOUND.LABELS[404]}</h2>
      <p>{EnStrings.SCREENS.NOT_FOUND.LABELS.PAGE_NOT_FOUND}</p>
      <Link to={Navigation.HOME}>
        {EnStrings.SCREENS.NOT_FOUND.BUTTONS.HOMEPAGE_BUTTON}
      </Link>
    </div>
  );
};
