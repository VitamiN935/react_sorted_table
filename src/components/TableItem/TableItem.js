import React from 'react'

const TableItem = (props) => {
  const {id, firstName, lastName, email, phone, onClick} = props
  return (
    <tr onClick={onClick}>
      <th scope="row">{id}</th>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>{email}</td>
      <td>{phone}</td>
    </tr>
  )
}

export default TableItem