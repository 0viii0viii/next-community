import dynamic from 'next/dynamic';
import { useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import Router from 'next/router';
import { useEffect } from 'react';

const PostEditor = dynamic(() => import('../components/Editor'), {
  ssr: false,
});

const Post = () => {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    if (!me) {
      Router.push('/login');
    }
  }, [me]);

  if (!me) {
    return null;
  }
  return (
    <>
      <AppLayout>
        <PostEditor />
      </AppLayout>
    </>
  );
};

export default Post;
