import React from 'react'
import './Footer.css'
import PropTypes from 'prop-types'

function Footer ({ getResults }) {
  return (
    <div className={'btn_wrapper'}>
      <button className={'btn'} onClick={getResults}>Показать результат</button>
    </div>
  )
}

export default Footer

Footer.propTypes = {
  getResults: PropTypes.func.isRequired
}

