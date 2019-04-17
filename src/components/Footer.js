import React from 'react'
import './Footer.css'

function Footer ({ showResults }) {
  return (
    <div className={'btn_wrapper'}>
      <button className={'btn'} onClick={showResults}>Показать результат</button>
    </div>
  )
}

export default Footer