import React from 'react'
import magic_wind from '../magic_wind.png'
import './Header.css'

function Header ({ randomize, showResult, isWinner }) {
  return (
    <div className={`header_wrapper ${showResult && 'flex_off'}`}>
      <p>
        Билет 1
      </p>
      {!showResult
        ? <div className='img_btn' onClick={randomize}>
          <img className='img' src={magic_wind} alt="wind"/>
        </div>
        : <p>{isWinner ? 'Ого, вы выиграли! Поздравляем!' : 'В следующий раз повезет!'}</p>
      }
    </div>
  )
}

export default Header