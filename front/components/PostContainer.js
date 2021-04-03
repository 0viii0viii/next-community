import { Card, Col, Row, Pagination } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import {
  PostDetail,
  P,
  PaginationWrapper,
  PostContainerCard,
  ImageContainer,
  CommentLength,
} from '../components/style/styles';
import { useEffect, useState } from 'react';
import Router, { useRouter } from 'next/router';
import ReactPaginate from 'react-paginate';
import { HeartTwoTone } from '@ant-design/icons';

moment.locale('ko'); //한글로
const PostContainer = ({ data }) => {
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      if (data.error) {
        // Handle error
      } else {
        // Set posts from postData
        setPosts(data.posts);
      }
    }
  }, [data]);

  console.log(data.posts, '데이터');
  const handlePagination = (page) => {
    const path = router.pathname;
    const query = router.query;
    query.page = page.selected + 1;
    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <>
      {posts.map(
        ({
          id,
          title,
          creator,
          category,
          createdAt,
          fileUrl,
          Comments,
          Likers,
          view,
        }) => {
          return (
            <Link href={`/posts/${id}`}>
              <PostContainerCard>
                <Row>
                  <Col xs={24}>
                    {title} <CommentLength>[{Comments.length}]</CommentLength>
                    <ImageContainer src={fileUrl} />
                  </Col>
                  <Col xs={24}>
                    <PostDetail>
                      <P>
                        <HeartTwoTone
                          twoToneColor="#eb2f96"
                          style={{ marginRight: '5px' }}
                        />
                        {Likers.length}
                      </P>
                      <P> 조회 {view}</P>
                      <P>{category} </P>
                      <P>{creator}</P>
                      <P>{moment(createdAt).fromNow()} </P>
                    </PostDetail>
                  </Col>
                </Row>
              </PostContainerCard>
            </Link>
          );
        }
      )}
      <PaginationWrapper>
        <ReactPaginate
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          initialPage={data.curPage - 1}
          pageCount={data.maxPage}
          onPageChange={handlePagination}
          containerClassName={'paginate-wrap'}
          subContainerClassName={'paginate-inner'}
          pageClassName={'paginate-li'}
          pageLinkClassName={'paginate-a'}
          activeClassName={'paginate-active'}
          nextLinkClassName={'paginate-next-a'}
          previousLinkClassName={'paginate-prev-a'}
          breakLinkClassName={'paginate-break-a'}
        />
      </PaginationWrapper>
    </>
  );
};

export default PostContainer;
