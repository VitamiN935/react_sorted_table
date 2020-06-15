import React, {useState} from 'react'
import './Form.scss'
import Input from "../Input/Input";

const Form = props => {
  const [form, setForm] = useState({
    id: 0, firstName: '', lastName: '', email: '', phone: ''
  })
  const [validForm, setValidForm] = useState(false)

  const changeHandler = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
    const isValidForm = form.email && form.firstName && form.lastName && form.phone
    setValidForm(isValidForm)
  }

  const configInputs = [
    {id: 'ID',  type:'number', name:'id', required:true, value:form.id, onChange: changeHandler},
    {id: 'firstName', name:'firstName', required:true, value:form.firstName, onChange: changeHandler},
    {id: 'lastName', name:'lastName', required:true, value:form.lastName, onChange: changeHandler},
    {id: 'email', type:'email',  name:'email', required:true, value:form.email, onChange: changeHandler},
    {id: 'phone', type:'tel',  name:'phone', required:true, value:form.phone, onChange: changeHandler, pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"},
  ]

  const resetForm = () => setForm({id: 0, firstName: '', lastName: '', email: '', phone: ''})

  const submitHandler = (e) => {
    e.preventDefault()
    props.onClick(form)
    resetForm();
  }
  const clickFormHandler = e => e.stopPropagation()

  return (
    <div className="container mt-5 ">
      <div className="form-center">
        <form onSubmit={submitHandler} className="form-app" onClick={clickFormHandler}>
          <h2 className="text-center">Внести данные</h2>
          {configInputs.map(input => (
            <div className="form-group" key={input.id}>
              <Input {...input}/>
            </div>
          ))}
          <button
            disabled={!validForm}
            type="submit"
            className="btn btn-primary"
          >Создать
          </button>
        </form>
      </div>
    </div>
  )
}

export default Form

