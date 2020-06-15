import React from 'react'
import './SelectRow.scss'

const SelectRow = (props) => {
  const {firstName, lastName, description = '', address = {}} = props
  return (
    <div className="card">
      <h5 className="card-header">Выбран пользователь: {firstName + " " + lastName}</h5>
      <div className="card-body">
        <p className="cart-text">Описание:</p>
        <textarea>{description}</textarea>
        <p className="cart-text">Адрес проживания: <b>{address.streetAddress || ''}</b></p>
        <p className="cart-text">Город: <b>{address.city || ''}</b></p>
        <p className="cart-text">Провинция/штат: <b>{address.state || ''}</b></p>
        <p className="cart-text">Индекс: <b>{address.zip || ''}</b></p>
      </div>
    </div>
  )
}

export default SelectRow