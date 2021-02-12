import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AppLayout from '../components/AppLayout';

import { LOAD_ME_REQUEST } from '../reducers/types';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_ME_REQUEST,
    });
  }, []);
  return (
    <AppLayout>
      <div> Hello, Next!</div>
    </AppLayout>
  );
};

export default Home;
