import * as types from './actionTypes'
import _ from "lodash";

export const appReducer = (state, action) => {
  switch (action.type) {
    case types.SORT_BY_FIELD:
      const field = action.payload
      let dir = 'asc'
      if (field === state.sortedField) {
        dir = state.sortDirection === 'asc' ? 'desc' : 'asc'
      }
      return {...state, sortedField: field, sortDirection: dir}
    case types.SET_SELECTED_ROW:
      return {...state, selectedRow: action.payload}
    case types.SET_DATA:
      return {...state, data: [...action.payload, ...state.data]}
    case types.ADD_ITEM:
      return {...state, data: [action.payload, ...state.data]}
    case types.SET_MODE:
      return {...state, mode: action.payload}
    case types.SET_SEARCH_VALUE:
      return {...state, searchValue: action.payload}
    case types.MAKE_FILTER_DATE_TO_FIELD:
      const orderedData = _.orderBy(
        state.data, [state.sortedField], [state.sortDirection])
      return {...state, filteredData: orderedData}
    case types.FILTER_DATE_TO_SEARCH:
      let filteredData = state.filteredData
      if (state.searchValue) {
        let search = state.searchValue.toLowerCase()
        filteredData = state.filteredData.filter(item => {
          return item.firstName.toLowerCase().includes(search) ||
            item.lastName.toLowerCase().includes(search) ||
            item.email.toLowerCase().includes(search)
        })
      }
      return {...state, filteredData}
    default:
      return state;
  }
}