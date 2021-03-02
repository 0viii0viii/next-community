import useSWR from 'swr';
import axios from 'axios';

const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);

const hello = () => {
  const { data, error } = useSWR('/post/hello', fetcher);
  console.log(data);

  if (error) {
    return null;
  }
  return <div>ㅎㅇ</div>;
};

export default hello;
