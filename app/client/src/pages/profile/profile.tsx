import { useParams } from 'react-router';
import EnStrings from '../../utilities/strings';

export const Profile = () => {
  const { id } = useParams();

  if (!id) {
    return <div>{EnStrings.SCREENS.POSTS.ERRORS.MISSING_USER_ID}</div>;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data, loading, error, refetch } = useGetProfileQuery({
  //   variables: {
  //     userId: id,
  //   },
  // });

  // if (loading) {
  //   return <div>{EnStrings.COMMONS.LOADING}</div>;
  // }

  // if (error || !data) {
  //   return <div>{EnStrings.SCREENS.POSTS.ERRORS.ERROR_ON_LOADING}</div>;
  // }

  // const { getProfile: profile } = data;

  return (
    <div>
      <div
        style={{
          marginBottom: '2rem',
          display: 'flex ',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h1>{'profile?.user.name'}</h1>
          <p>{'profile?.bio'}</p>
        </div>
        <div>
          {/* {profile?.isMyProfile ? (
            <AddPostModal userId={id} refetch={refetch} />
          ) : null} */}
        </div>
      </div>
      <div>
        {/* {profile?.user.posts.map((post) => {
          return (
            <PostElement
              key={post.id}
              title={post.title}
              content={post.content}
              date={post.createdAt}
              id={post.id}
              user={profile.user.name}
              published={post.published}
              isMyProfile={profile.isMyProfile}
            />
          );
        })} */}
      </div>
    </div>
  );
};
