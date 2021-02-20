import { Card } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import moment from 'moment';

moment.locale('ko'); //한글로
const PostContainer = () => {
  const { posts } = useSelector((state) => state.post);
  console.log(posts, '하잉');
  return (
    <>
      {posts.map(({ id, title, creator, createdAt, Comments }) => {
        return (
          <Link href={`/posts/${id}`}>
            <Card>
              {title} {creator} {moment(createdAt).fromNow()}
              {Comments.length}
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export default PostContainer;
