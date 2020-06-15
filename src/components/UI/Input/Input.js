import React from 'react'

const Input = props => {
  const {
    type = 'text', className = '', id = '', name = '',
    value = '', onChange = f => f, required = false,
    placeholder = '', pattern = ''
  } = props

  return (
    <>
      {id && <label htmlFor={id}>{id}</label>}
      <input
        type={type}
        className={className || 'form-control'}
        id={id}
        required={required}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        pattern={pattern || null}
      />
    </>
  )
}

export default Input