import { Viewer } from '@toast-ui/react-editor';

const PostViewer = ({ data }) => {
  //자체 image 반응형으로 만들기
  const content = data.content;
  let imageContent = data.content;
  const regex = /src\=/gi; //src= 를 찾는 Regular Expression
  if (content.match('<img src=') && window.innerWidth <= 1200) {
    // img태그가 하나라도 존재하고 window 가로사이즈가 1200px보다 낮다면
    imageContent = content.replace(
      // 정규표현식에 일치하는 img파일의 width를 모두를 현재 window.innerWidth사이즈의 -50 px만큼 (반응형)
      regex,
      `width="${window.innerWidth - 50}" src=`
    );
  }
  return <Viewer initialValue={imageContent} />;
};

export default PostViewer;
