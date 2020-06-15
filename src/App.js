import React, {useCallback, useEffect, useMemo, useReducer} from 'react';
import Loader from "./components/Loader/Loader";
import Mode from "./components/Mode/Mode";
import Table from "./components/Table/Table";
import ReactPaginate from 'react-paginate'
import {PAGE_SIZE, DISPLAY_FIELD} from "./costants";
import SelectRow from "./components/SelectRow/SelectRow";
import Search from "./components/Search/Search";
import {useHttp} from "./hooks/useHttp";
import {usePagination} from "./hooks/usePaginate";
import Modal from "./components/Modal/Modal";
import Form from "./components/UI/Form/Form";
import {useModal} from "./hooks/useModal";
import {appReducer} from "./redux/App/appReducer";
import {APP_INITIAL_STATE} from "./redux/App/appInitState";
import * as types from "./redux/App/actionTypes";


function App() {
  const {loading, request} = useHttp()
  const {currentPage, handlePageClick, getChunkDate} = usePagination(PAGE_SIZE)
  const {open, closeModal, openModal} = useModal()
  const [state, dispatch] = useReducer(appReducer, APP_INITIAL_STATE)
  const {data, mode, sortedField, sortDirection, filteredData, selectedRow, searchValue} = state

  const rowClickHandler = useCallback((row) => {
    dispatch({type: types.SET_SELECTED_ROW, payload: row})
  }, [dispatch])

  useEffect(() => {
    dispatch({type: types.MAKE_FILTER_DATE_TO_FIELD})
    dispatch({type: types.FILTER_DATE_TO_SEARCH})
  }, [dispatch, sortedField, sortDirection, mode, searchValue, data])

  const sortByField = useCallback(field => {
    dispatch({type: types.SORT_BY_FIELD, payload: field})
  }, [dispatch])

  const selectedMode = useCallback(async url => {
    try {
      dispatch({type: types.SET_MODE, payload: true})
      const fetchData = await request(url);
      dispatch({type: types.SET_DATA, payload: fetchData})
    } catch (e) {
      console.log(e)
    }
  }, [request, dispatch])

  const createRow = useCallback((row) => {
    closeModal()
    dispatch({type: types.ADD_ITEM, payload: row})
  }, [closeModal, dispatch])

  const searchHandler = useCallback(text => {
    dispatch({type: types.SET_SEARCH_VALUE, payload: text})
  }, [dispatch])


  const form = useMemo(() => (
    <Modal onClick={closeModal} isOpen={open}>
      <Form onClick={createRow}/>
    </Modal>
  ), [createRow, open, closeModal])

  const paginate = useMemo(() => (
    <ReactPaginate
      previousLabel={'<'}
      nextLabel={'>'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      pageCount={Math.ceil(filteredData.length / PAGE_SIZE)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      initialPage={currentPage}
      forcePage={0}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      previousLinkClassName='page-link'
      nextLinkClassName='page-link'
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  ), [currentPage, handlePageClick, filteredData])

  if (!mode) {
    return <Mode selectedMode={selectedMode}/>
  }

  return (

    <div className="container mb-2">
      {
        loading ? <Loader/> : (
          <>
            {form}
            <Search
              onClick={searchHandler}
              btnText={'Найти'}
              label={'Поиск...'}
            />
            <button
              className="btn btn-outline-secondary mb-3"
              onClick={openModal}
            >Добавить
            </button>
            <Table
              data={filteredData.length > PAGE_SIZE ? getChunkDate(filteredData) : filteredData}
              onClickHeader={sortByField}
              onClick={rowClickHandler}
              displayFields={DISPLAY_FIELD}
              sortedField={sortedField}
              sortDirection={sortDirection}
            />
          </>
        )
      }
      {filteredData.length > PAGE_SIZE ? paginate : null}

      {
        !selectedRow ? null : <SelectRow {...selectedRow}/>
      }

    </div>
  );
}

export default App;
