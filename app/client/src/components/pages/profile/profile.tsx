import EnStrings from '../../../utilities/strings';
import { useGetMyProfileQuery } from '../../common-queries/common-queries.generated';
import { MainLayout } from '../../component-library/main-layout/main-layout';

export const Profile = (): JSX.Element => {
  const { data, error, loading } = useGetMyProfileQuery({
    fetchPolicy: 'no-cache',
  });

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
