import React from 'react'

const Mode = props => {

  const data = {
    smallData: 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}',
    bigData: 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}'
  }

  return (
    <div className="container text-center mt-5">
      <h3>Выбери размер данных</h3>
      <div className="mt-4">
        <button
          className="btn btn-primary mr-4"
          onClick={() => props.selectedMode(data["smallData"])}
        >Маленький</button>
        <button
          className="btn btn-danger"
          onClick={() => props.selectedMode(data["bigData"])}
        >Большой</button>
      </div>
    </div>
  )
}

export default Mode