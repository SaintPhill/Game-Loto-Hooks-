import React from 'react'
import './GameField.css'
import PropTypes from 'prop-types'

function GameField ({ field, onClick }) {
  return (
    <div className={'field'}>
      {field.map((square, id) =>
        <div
          onClick={() => onClick(square.id)}
          className={`square ${square.isActive ? 'active' : ''}`}
          key={id}
        >
          <b className={'number'}>{square.id + 1}</b>
        </div>)
      }
    </div>
  )
}

export default GameField

GameField.propTypes = {
  field: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

