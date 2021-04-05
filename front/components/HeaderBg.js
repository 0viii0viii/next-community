import styled from 'styled-components';
import img from '../img/logo2.jpg';

const HeaderBg = () => {
  return <Background></Background>;
};

const Background = styled.div`
  height: 200px;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: 50% 75%;
  background-size: cover;
`;

export default HeaderBg;
