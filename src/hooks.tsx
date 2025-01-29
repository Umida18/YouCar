import { useState } from "react";

export function usePagination(initialState: any) {
  const [state, setState] = useState(initialState);

  const setPage = (page: number) => {
    setState((prev: any) => ({ ...prev, currentPage: page }));
  };

  const setItemsPerPage = (items: number) => {
    setState((prev: any) => ({ ...prev, itemsPerPage: items, currentPage: 1 }));
  };

  return {
    ...state,
    setPage,
    setItemsPerPage,
  };
}
