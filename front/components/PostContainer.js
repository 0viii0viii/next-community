import { Card, Col, Row } from 'antd';
import Link from 'next/link';

import moment from 'moment';
import { PictureOutlined } from '@ant-design/icons';
import { PostDetail, P } from '../components/style/styles';

moment.locale('ko'); //한글로
const PostContainer = ({ posts }) => {
  console.log(posts, '하잉');
  return (
    <>
      {posts.map(
        ({ id, title, creator, category, createdAt, fileUrl, Comments }) => {
          return (
            <Link href={`/posts/${id}`}>
              <Card>
                <Row>
                  <Col xs={24}>
                    {title} {fileUrl ? <PictureOutlined /> : ''}[
                    {Comments.length}]
                  </Col>
                  <Col xs={24}>
                    <PostDetail>
                      <P>{category} </P>
                      <P>{moment(createdAt).fromNow()} </P>
                      <P>{creator}</P>
                    </PostDetail>
                  </Col>
                </Row>
              </Card>
            </Link>
          );
        }
      )}
    </>
  );
};

export default PostContainer;
