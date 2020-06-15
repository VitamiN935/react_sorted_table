import React from 'react'
import './Modal.scss'
import {CSSTransition} from "react-transition-group";

const Modal = (props) => {
  const cls = ['my-modal'];
  if (!props.isOpen) {
    cls.push('close')
  }

  return (
    <CSSTransition
      timeout={300}
      in={props.isOpen}
      classNames={'modal'}
    >
      <div className={cls.join(' ')} onClick={props.onClick}>
        {props.children}
      </div>
    </CSSTransition>
  )
}

export default Modal