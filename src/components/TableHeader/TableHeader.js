import React from 'react'
import './TableHeader.scss'

const TableHeader = (
  {content, sortedField = '', sortDirection = 'asc', onClick = f => f}
) => {
  const sortUp = <i className="fa fa-sort-up"> </i>
  const sortDown = <i className="fa fa-sort-down"> </i>
  let icon = ''
  if (sortedField === content) {
    icon = sortDirection === 'asc' ? sortDown : sortUp
  }
  return (
    <th
      scope="col"
      onClick={() => onClick(content)}
    >
      <span>{content}</span>{icon}
    </th>
  )
}

export default TableHeader

// <th
// scope="col"
// onClick={() => onClick('id')}
// >id </th>

