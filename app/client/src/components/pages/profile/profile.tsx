import EnStrings from '../../../utilities/strings';
import { MainLayout } from '../../main-layout/main-layout';
import { useGetMyProfileQuery } from './query/profile.generated';

export const Profile = (): JSX.Element => {
  const { data, error, loading } = useGetMyProfileQuery();

  if (loading) {
    return <div>{EnStrings.COMMONS.LOADING}</div>;
  }

  if (error || !data) {
    return <div>{EnStrings.SCREENS.POSTS.ERRORS.ERROR_ON_LOADING}</div>;
  }

  const { user } = data.getMyProfile;

  return (
    <MainLayout>
      <h1>Profile</h1>
      <div>
        <h3>{user?.name}</h3>
        <h3>{user?.email}</h3>
        <p>{user?.createdAt}</p>
      </div>
    </MainLayout>
  );
};
