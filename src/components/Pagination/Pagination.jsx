import React, { useMemo } from "react";
import { StyledPagination } from "./styled";

const RANGE = 5;
function Pagination({
  currentPage = 0,
  onChangePage = () => {},
  size = 10,
  total = 10,
  style = {},
}) {
  const items = useMemo(() => {
    const pageSize = size || 10;
    const totalPage = Math.ceil(total / pageSize);
    if (2 * RANGE > totalPage) {
      return Array.from(Array(totalPage).keys()).reduce(
        (a = [], b) => [...a, b + 1],
        []
      );
    }
    if (currentPage < RANGE) {
      return Array.from(Array(RANGE * 2).keys()).reduce(
        (a = [], b) => [...a, b + 1],
        []
      );
    }
    if (currentPage > totalPage - RANGE) {
      return Array.from(Array(RANGE * 2).keys()).reduce(
        (a = [], b) => [...a, b + totalPage - 2 * RANGE + 1],
        []
      );
    }
    for (let i = 0; i < RANGE * 2 + 1; i++) {}
    return Array.from(Array(RANGE * 2 + 1).keys())
      .reduce((a = [], b) => [...a, currentPage - b + RANGE], [])
      .reverse();
  }, [currentPage, total]);
  return (
    <StyledPagination style={style}>
      {/* <li>
        <a href="javascript:void(0);">
          {"<"}
        </a>
      </li> */}
      {items.map((item, index) => (
        <li
          key={index}
          style={{ cursor: "pointer" }}
          onClick={() => onChangePage(item)}
        >
          <a className={item == currentPage ? "active active-page" : ""}>
            {item == -1 ? "..." : item}
          </a>
        </li>
      ))}
      {/* <li>
        <a href="javascript:void(0);">
          {">"}
        </a>
      </li> */}
    </StyledPagination>
  );
}

export default Pagination;
