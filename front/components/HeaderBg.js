import { Col, Row } from 'antd';
import styled from 'styled-components';
import img from '../img/logo.jpg';

const Background = styled.div`
  background-image: url(${img});
  background-size: 1300px;
  height: 200px;
`;

const HeaderBg = () => {
  return <Background />;
};

export default HeaderBg;
