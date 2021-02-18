import { Card } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import moment from 'moment';

moment.locale('ko'); //한글로
const PostContainer = () => {
  const { posts } = useSelector((state) => state.post);
  return (
    <>
      {posts.map((post) => {
        return (
          <Link href={`/posts/${post.id}`}>
            <Card>
              {post.title} {post.creator} {moment(post.createdAt).fromNow()}
            </Card>
          </Link>
        );
      })}
    </>
  );
};

export default PostContainer;
