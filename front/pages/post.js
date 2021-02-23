import dynamic from 'next/dynamic';
import AppLayout from '../components/AppLayout';

const PostEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const Post = () => {
  return (
    <>
      <AppLayout>
        <PostEditor />
      </AppLayout>
    </>
  );
};

export default Post;
