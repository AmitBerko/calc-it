import React, { useState, useContext } from 'react'
import "../styles.scss"
import EditButton from '../components/EditButton'
import CalculatorButton from '../components/CalculatorButton'

import { CalculatorContext } from '../CalculatorContext'

function CalculatorPage() {
    // const [result, setResult] = useState(9876) // Change later
    // const [moves, setMoves] = useState(5) // Change later
    // const [goal, setGoal] = useState(456) // Change later
    // here
    const {moves, setMoves, goal, setGoal, result, setResult, buttons, setButtons} = useContext(CalculatorContext)

    // const [buttons, setButtons] = useState([
    //     { id: 0, type: 'emptyButton' },
    //     { id: 1, type: 'emptyButton' },
    //     { id: 2, type: 'clrButton' },
    //     { id: 3, type: 'emptyButton' },
    //     { id: 4, type: 'emptyButton' },
    //     { id: 5, type: 'operatorButton', operator: '+', value: 50 },
    //     { id: 6, type: 'emptyButton' },
    //     { id: 7, type: 'addDigitButton', value: 5 },
    //     { id: 8, type: 'specialButton', specialType: 'mirror' },
    // ])

  return (
    <>
    <div className="editor-container">
        <div className="editor-buttons-container">
            <EditButton type="operatorButton" /> 
            <button className="add-digit">Num</button>
            <button className="special">Reverse</button>
            <button className="special">Mirror</button>
            <button className="special">_=&gt;_</button>
            <button className="special">+/-</button>
            <button className="special">&lt;&lt;</button>
            <button className="special">SUM</button>
            <button className="special">X<sup>a</sup></button>
        </div>
        <div id="inputs">
            test
        </div>
    </div>

    <div className="calculator-container">
        <div className="screen-outline">
            <div className="screen">
                <div className="level-info">
                    <div id="moves">MOVES: {moves}</div>
                    <div id="goal">GOAL: {goal}</div>
                </div>
                <div id="result">{result}</div>
            </div>
        </div>
        <div className="buttons-container">
            {
                // Don't need to pass anything related to moves, goal and result
                buttons.map((button) => {
                    return <CalculatorButton key={button.id} {...buttons[button.id]} />
                })
            }
        </div>
        <div>
            result: {result}
        </div>
    </div>
    </>
  )
}

export default CalculatorPage