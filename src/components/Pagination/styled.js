import styled from "styled-components";

export const StyledPagination = styled.ul`
  display: flex;
  list-style: none;
  justify-content: end;
  padding: 10px 10px 5px;

  li {
    margin: 0 10px 0 0;
    font-weight: 700;
  }
  
  a {
    border: 1px solid #ebebeb;
    display: block;
    border-radius: 5px;
    padding: 5px 9px;
    color: #808086;
    cursor: pointer;
    min-width: 36px;
    text-align: center;
  }

  .active-page {
    background-color: var(--chakra-colors-blue-500);
    color: #fff !important;
  }
`;
