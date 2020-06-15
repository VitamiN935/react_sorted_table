import {useCallback, useState} from "react";
import _ from "lodash";

export const usePagination = (pageSize) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = useCallback(({selected}) => {
    setCurrentPage(selected)
  }, [])

  const getChunkDate = useCallback((data) => {
    return _.chunk(data, pageSize)[currentPage]
  }, [pageSize, currentPage])

  return {currentPage, getChunkDate, handlePageClick}
}