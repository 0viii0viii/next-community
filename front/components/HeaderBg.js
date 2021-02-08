import styled from 'styled-components';
import img from '../img/logo.jpg';

const Background = styled.div`
  background-image: url(${img});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  height: 200px;
`;

const HeaderBg = () => {
  return <Background />;
};

export default HeaderBg;
