import { Button, Card } from 'antd';
import { useRouter } from 'next/router';
import AppLayout from './AppLayout';
import styled from 'styled-components';

const RedirectPage = () => {
  const router = useRouter();
  return (
    <>
      <AppLayout>
        <RedirectCard>
          <h1>접근할 수 없는 페이지입니다.</h1>
          <Button onClick={() => router.replace('/')}> 확인</Button>
        </RedirectCard>
      </AppLayout>
    </>
  );
};

const RedirectCard = styled(Card)`
  text-align: center;
  justify-content: center;
`;

export default RedirectPage;
