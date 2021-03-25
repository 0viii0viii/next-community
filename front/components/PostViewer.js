import { Viewer } from '@toast-ui/react-editor';

const PostViewer = ({ data }) => {
  return <Viewer initialValue={data.content} />;
};

export default PostViewer;
