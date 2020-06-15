import React from 'react'
import TableItem from "../TableItem/TableItem";
import TableHeader from "../TableHeader/TableHeader";

const Table = (props) => {
  const {data, onClickHeader,onClick, displayFields, sortedField, sortDirection} = props

  if (!data.length) {
    return <h2 className="center">Данных в таблице нет</h2>
  }

  return (
    <table className="table">
      <thead className="thead-dark">
      <tr>
        {
          displayFields.map((field, idx) => (
            <TableHeader
              key={field + idx}
              content={field}
              onClick={onClickHeader}
              sortedField={sortedField}
              sortDirection={sortDirection}
            />
          ))
        }
      </tr>
      </thead>
      <tbody>
      {
        data.map(item => (
          <TableItem
            key={item.id + item.phone}
            onClick={() => onClick(item)}
            {...item}
          />
        ))
      }
      </tbody>
    </table>
  )
}

export default Table

