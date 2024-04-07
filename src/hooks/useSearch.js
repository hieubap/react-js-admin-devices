import React, { useEffect, useRef, useState } from "react";

function useSearch({ refreshData = () => {} } = {}) {
  const timeoutRef = useRef();
  const textSearch = useRef("");
  const onSearch = (e) => {
    textSearch.current = e.target.value;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      refreshData(textSearch.current || "", true);
    }, 800);
  };

  useEffect(() => {
    refreshData("", true);
  }, []);

  return {
    textSearch: textSearch.current,
    onSearch,
  };
}

export default useSearch;
