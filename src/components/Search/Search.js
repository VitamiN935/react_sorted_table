import React, {useState} from 'react'

const Search = ({onClick, label, btnText}) => {
  const [value, setValue] = useState('')

  return (
    <div className="input-group mb-3 mt-2">
      <input
        type="text"
        className="form-control"
        placeholder={label}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
        <div className="input-group-append">
          <button
            style={{marginLeft: '10px'}}
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => onClick(value)}
          >{btnText}</button>
        </div>
    </div>
  )
}

export default Search