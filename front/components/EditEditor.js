import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { Editor } from '@toast-ui/react-editor';
import 'codemirror/lib/codemirror.css'; // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css'; // Editor's Style
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { POST_EDIT_REQUEST } from '../reducers/types';

const EditEditor = () => {
  const { postDetail, postEditDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    if (postEditDone) {
      Router.push('/');
    }
  }, [postEditDone]);
  const dispatch = useDispatch();
  const editorRef = useRef();
  const [form, setValues] = useState({
    title: '',
    category: '',
    content: '',
    fileUrl: '',
    creator: me.nickname,
  });
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onClickSubmit = useCallback(() => {
    const { title, content, fileUrl, category, creator } = form;
    const body = { id, title, content, fileUrl, category, creator };

    dispatch({
      type: POST_EDIT_REQUEST,
      data: body,
    });
  }, [form]);

  const getDataFromEditor = (e) => {
    const Instance = editorRef.current.getInstance();
    const data = Instance.getHtml();

    if (data && data.match('<img src=')) {
      const whereImg_start = data.indexOf('<img src=');
      let whereImg_end = '';
      let ext_name_find = '';
      let result_Img_Url = '';
      const ext_name = ['jpeg', 'png', 'jpg', 'gif'];

      for (let i = 0; i < ext_name.length; i++) {
        if (data.match(ext_name[i])) {
          console.log(data.indexOf(`${ext_name[i]}`));
          ext_name_find = ext_name[i];
          whereImg_end = data.indexOf(`${ext_name[i]}`);
        }
      }
      console.log(ext_name_find);
      console.log(whereImg_end);

      if (ext_name_find === 'jpeg') {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 4);
      } else {
        result_Img_Url = data.substring(whereImg_start + 10, whereImg_end + 3);
      }

      console.log(result_Img_Url, 'result_img_Url'); //저장 backend

      setValues({
        ...form,
        fileUrl: result_Img_Url,
        content: data,
      });
    } else {
      setValues({
        ...form,
        fileUrl: null,
        content: data,
      });
    }
  };
  const uploadImage = (blob) => {
    let formData = new FormData();

    formData.append('upload', blob);

    return axios('http://localhost:5000/post/image', {
      method: 'POST',
      data: formData,

      headers: { 'Content-type': 'multipart/form-data' },
    }).then((response) => {
      if (response.data) {
        return response.data.url[0];
      }

      throw new Error('Server or network error');
    });
  };
  return (
    <>
      <div>
        <Form onFinish={onClickSubmit}>
          <select name="category" onChange={onChange}>
            <option value="자유">자유</option>
            <option value="유머">유머</option>
            <option value="이적 시장">이적 시장</option>
            <option value="경기 예측">경기 예측</option>
            <option value="경기 분석">경기 분석</option>
            <option value="경기 토론">경기 토론</option>
          </select>

          <Input
            type="text"
            name="title"
            placeholder={postDetail.title}
            onChange={onChange}
          />
          <Editor
            initialEditType="wysiwyg"
            initialValue={postDetail.content}
            previewStyle="tab"
            height="600px"
            useCommandShortcut={true}
            ref={editorRef}
            hooks={{
              addImageBlobHook: async (blob, callback) => {
                const upload = await uploadImage(blob);
                callback(upload, 'alt text');
                return false;
              },
            }}
            onBlur={getDataFromEditor}
          />
          <Button>취소</Button>
          <Button htmlType="submit">작성 완료</Button>
        </Form>
      </div>
    </>
  );
};

export default EditEditor;
