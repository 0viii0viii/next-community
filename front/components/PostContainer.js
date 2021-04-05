import { Card, Col, Row } from 'antd';
import Link from 'next/link';
import moment from 'moment';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

const PaginationWrapper = styled.div`
  .paginate-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    list-style: none;

    margin-left: auto;
    margin-right: auto;
    width: 100%;
    border-radius: 3px;
    max-width: 100%;
    flex-wrap: wrap;
    background: white;
  }
  .paginate-a {
    color: black;
    &:hover {
      color: #1890ff;
    }
  }
  .paginate-li {
    padding: 0.5rem 1rem;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    &:hover {
      border: 1px solid #1890ff;
    }
  }
  .paginate-next-a {
    padding: 0.5rem 1rem;
    border: 1px solid #d9d9d9;
    color: black;
    &:hover {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
  .paginate-prev-a {
    padding: 0.5rem 1rem;
    border: 1px solid #d9d9d9;
    color: black;
    &:hover {
      border: 1px solid #1890ff;
      color: #1890ff;
    }
  }
  .paginate-active {
    border: 1px solid #1890ff;

    color: #1890ff;
  }
`;
const PostContainerCard = styled(Card)`
  cursor: pointer;
  &:hover {
    border-left: 4px solid yellow;
    background: #d9d9d9;
  }
`;
const PostDetail = styled.div`
  margin-top: 5px;
`;

const P = styled.p`
  display: inline;
  padding: 5px;
  color: gray;
`;
const CommentLength = styled.p`
  display: inline;
  color: blue;
`;

const ImageContainer = styled.img`
  width: 50px;
  float: right;
  height: 50px;
`;

export default PostContainer;
