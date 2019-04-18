import React from 'react'
import magic_wind from '../magic_wind.png'
import './Header.css'
import PropTypes from 'prop-types'

function Header ({ randomize, showResult, isWinner, tryAgain, isFetching }) {
  return (
    <div className={`header_wrapper ${showResult && 'flex_off'}`}>
      <p>
        Билет 1
      </p>
      {!showResult
        ? <div className={'img_btn'} onClick={randomize}>
          <img className={'img'} src={magic_wind} alt={'wind'}/>
        </div>
        : <div>
          <p>{isWinner ? 'Ого, вы выиграли! Поздравляем!' : 'В следующий раз повезет!'}</p>
          {!isFetching && <button className='btn' onClick={tryAgain}>Попробовать еще раз</button>}
        </div>
      }
    </div>
  )
}

export default Header

Header.propTypes = {
  randomize: PropTypes.func.isRequired,
  showResult: PropTypes.bool,
  isWinner: PropTypes.bool,
  tryAgain: PropTypes.func
}