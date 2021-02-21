import styled from 'styled-components';
import { Pagination } from 'antd';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
`;

const Li = styled.li`
  margin-left: 10px;
  padding: 8px 16px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
  &:hover {
    background: #339af0;
  }
`;

const Paginations = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumber = [];

  // Math.ceil: 올림
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <Pagination
      defaultCurrent={1}
      total={Math.ceil(totalPosts / postsPerPage)}
      onChange={() => paginate(pageNumber)}
    />
    // <Ul>
    //   {pageNumber.map((pageNum) => (
    //     <Li key={pageNum} onClick={() => paginate(pageNum)}>
    //       {pageNum}
    //     </Li>
    //   ))}
    // </Ul>
  );
};

export default Paginations;
