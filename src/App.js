import React, { useState, useEffect } from 'react'
import './App.css'
import { Store } from './Store'
import GameField from './components/GameField'
import Header from './components/Header'
import Footer from './components/Footer'
import { add_first_table_number, del_first_table_number } from './actions/firstTable'
import { add_second_table_number, del_second_table_number } from './actions/secondTable'

function App () {
  const { state: store, dispatch } = React.useContext(Store)
  const [firstTable, setFirstTable] = useState([])
  const [secondTable, setSecondTable] = useState([])
  const [showResult, setResult] = useState(false)
  const [isWinner, setWinner] = useState(false)

  useEffect(() => {
    if (firstTable.length === 0) {
      let arrayForTable = []
      for (let i = 0; i < 19; i++) {
        arrayForTable.push({ id: i, isActive: false })
      }
      setFirstTable(arrayForTable)
    }

    if (secondTable.length === 0) {
      let arrayForTable = []
      for (let i = 0; i < 2; i++) {
        arrayForTable.push({ id: i, isActive: false })
      }
      setSecondTable(arrayForTable)
    }
  })

  function toggleFirstTable (id) {
    if (store.firstTableResults.length < 8 || firstTable[id].isActive) {
      setFirstTable(firstTable.map(el => el.id !== id ? el : { ...el, isActive: !el.isActive }))
      if (firstTable[id].isActive) {
        dispatch(del_first_table_number(id))
      } else {
        dispatch(add_first_table_number(id))
      }
    }
  }

  function toggleSecondTable (id) {
    if (store.secondTableResults.length < 1 || secondTable[id].isActive) {
      setSecondTable(secondTable.map(el => el.id !== id ? el : { ...el, isActive: !el.isActive }))
      if (secondTable[id].isActive) {
        dispatch(del_second_table_number(id))
      } else {
        dispatch(add_second_table_number(id))
      }
    }
  }

  function shuffle (array) {
    let currentIndex = array.length, temporaryValue, randomIndex
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1
      temporaryValue = array[currentIndex]
      array[currentIndex] = array[randomIndex]
      array[randomIndex] = temporaryValue
    }

    return array
  }

  function getWinNumbers () {
    let winCombitation = []
    for (let i = 0; i < 18; i++) {
      winCombitation.push(i)
    }
    shuffle(winCombitation)
    winCombitation.splice(8)
    return winCombitation
  }

  function getResults () {
    if((store.firstTableResults.length === 8 && store.secondTableResults.length === 1)) {
      let winCombitationFirstField = getWinNumbers()
      let winCombitationSecondField = Math.round(Math.random())
      let first_field = store.firstTableResults.filter(num => winCombitationFirstField.includes(num.id))
      let second_field = winCombitationSecondField === store.secondTableResults[0]
      if (first_field.length === 8 || first_field.length === 7 && second_field) {
        setWinner(true)
      } else {
        setWinner(false)
      }
      setResult(true)
      sendResults(store, isWinner, 2)
    } else {
      alert('Пожалуйста, выберите числа')
    }
  }

  function sendResults(state, isWinnder, times) {
    return fetch('https://finch-test', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstField: state.firstTableResults,
        secondField: state.secondTableResults,
        isTicketWon: isWinner
      })
    }).then(res=>res.json())
      .then(res => console.log(res))
      .catch(() => {
        if(times !== 0) {
          setTimeout(() => sendResults(state, isWinnder, times-1), 2000)
        } else {
          alert('Не удалось отправить данные')
        }
      })
  }

  function randomize () {
    let randomNumbersForFirstTable = getWinNumbers()
    let randomNumberForSecondTable = Math.round(Math.random())

    if (store.firstTableResults.length === 0 && store.secondTableResults.length === 0) {
      setFirstTable(firstTable.map(el => randomNumbersForFirstTable.includes(el.id) ? { ...el, isActive: true } : el))
      if (store.firstTableResults.length < 8) {
        for (let i = 0; i < randomNumbersForFirstTable.length; i++) {
          dispatch(add_first_table_number(randomNumbersForFirstTable[i]))
        }
      }
      setSecondTable(secondTable.map(el => el.id === randomNumberForSecondTable ? { ...el, isActive: true } : el))
      if (store.secondTableResults.length < 1) {
        dispatch(add_second_table_number(randomNumberForSecondTable))
      }
    }
  }

  if (!showResult) {
    return (
      <div className={'game_wrapper'}>
        <Header showWind={showResult} randomize={randomize}/>
        <main className={'main-content'}>
          <section>
            <p>
              Поле 1. Отметьте 8 чисел
            </p>
            <GameField field={firstTable} onClick={toggleFirstTable}/>
          </section>
          <section>
            <p>
              Поле 2 Отметьте 1 число
            </p>
            <GameField field={secondTable} onClick={toggleSecondTable}/>
          </section>
        </main>
        <Footer showResults={getResults}/>
      </div>
    )
  } else {
    return (
      <div className={'game_wrapper'}>
        <Header isWinner={isWinner} showResult={showResult} randomize={randomize}/>
      </div>
    )
  }

}

export default App
