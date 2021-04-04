import { ContactsOutlined } from '@ant-design/icons';
import { Viewer } from '@toast-ui/react-editor';
import { useEffect, useState } from 'react';

const PostViewer = ({ data }) => {
  //자체 image 반응형으로 만들기
  const content = data.content;
  let imageContent = data.content;

  console.log(window.innerWidth);
  if (content.match('<img src=') && window.innerWidth <= 1200) {
    imageContent = content.replace(
      '<img src=',
      `<img width="${window.innerWidth - 50}" src=`
    );
  }
  console.log(imageContent);
  return <Viewer initialValue={imageContent} />;
};

export default PostViewer;
