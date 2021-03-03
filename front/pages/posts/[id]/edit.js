import AppLayout from '../../../components/AppLayout';
import dynamic from 'next/dynamic';
import axios from 'axios';
import useSWR from 'swr';
import { useRouter } from 'next/router';
const EditEditor = dynamic(() => import('../../../components/EditEditor'), {
  ssr: false,
});
const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);
const Edit = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(`/post/detail/${id}`, fetcher);
  console.log(data, '하이');
  return (
    <>
      <AppLayout>
        <EditEditor data={data} />
      </AppLayout>
    </>
  );
};

export default Edit;
