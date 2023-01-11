import EnStrings from '../../utilities/strings';
import './Post.css';

type PostProps = {
  title: string;
  content: string;
  date: string;
  user: string;
  published: boolean;
  id: string;
  isMyProfile?: boolean;
};

export const PostElement = (props: PostProps): JSX.Element => {
  const { date, published, isMyProfile, title, user, content, id } = props;

  // const [publishPostMutation] = usePostPublishMutation();

  const formatedDate = new Date(Number(date));

  const createdAtBy = `${
    EnStrings.SCREENS.POSTS.POST.LABELS.CREATED_AT
  } ${String(formatedDate).split(' ').splice(0, 3).join(' ')} ${
    EnStrings.SCREENS.POSTS.POST.LABELS.BY
  } ${user}`;

  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: 'hotpink' } : {}}
    >
      {isMyProfile && !published && (
        <p
          className="Post__publish"
          // onClick={async () =>
          //   // await publishPostMutation({
          //   //   variables: {
          //   //     input: {
          //   //       postId: id,
          //   //       published: true,
          //   //     },
          //   //   },
          //   // })
          // }
        >
          {EnStrings.SCREENS.POSTS.POST.BUTTONS.PUBLISH}
        </p>
      )}
      {isMyProfile && published && (
        <p
          className="Post__publish"
          // onClick={async () =>
          //   // await publishPostMutation({
          //   //   variables: {
          //   //     input: {
          //   //       postId: id,
          //   //       published: false,
          //   //     },
          //   //   },
          //   // })
          // }
        >
          {EnStrings.SCREENS.POSTS.POST.BUTTONS.UNPUBLISH}
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>{createdAtBy}</h4>
      </div>
      <p>{content}</p>
    </div>
  );
};
