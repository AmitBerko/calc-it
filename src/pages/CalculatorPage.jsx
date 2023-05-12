import React, { useState, useContext } from 'react'
import "../styles.scss"
import EditButton from '../components/EditButton'
import CalculatorButton from '../components/CalculatorButton'

import { CalculatorContext } from '../CalculatorContext'

function CalculatorPage() {
    const { moves, setMoves, goal, setGoal, result, setResult, buttons, setButtons } = useContext(CalculatorContext)
    const editorButtons = [
        { id: 0, type: 'operatorButton' },
        { id: 1, type: 'addDigitButton' },
        { id: 2, type: 'specialButton', specialType: 'reverse' },
        { id: 3, type: 'specialButton', specialType: 'mirror' },
        { id: 4, type: 'specialButton', specialType: 'transform' },
        { id: 5, type: 'specialButton', specialType: 'plusMinus' },
        { id: 6, type: 'specialButton', specialType: 'delete' },
        { id: 7, type: 'specialButton', specialType: 'sum' },
        { id: 8, type: 'specialButton', specialType: 'pow' },
    ]
    const printButtons = () => console.log(buttons)
    return (
        <>
            <div className="editor-container">
                <div className="editor-buttons-container">
                    {
                        editorButtons.map(button => {
                            return <EditButton key={button.id} {...editorButtons[button.id]}></EditButton>
                        })
                    }

                </div>
                <div id="inputs">
                    <div id="operator-container">
                        <label>Operator:</label>
                        <select id="operator-input">
                            <option value=""></option>
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="x">x</option>
                            <option value="/">/</option>
                        </select>
                        <br></br>
                        <label htmlFor="operator-value-input">Value:</label>
                        <input
                            type="number"
                            id="operator-value-input"
                        />
                    </div>

                    <div id="add-digit-container">
                        <label htmlFor="add-digit-input">Value:</label>
                        <input
                            type="number"
                            id="add-digit-input"
                        />
                    </div>
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
            </div>
            <button onClick={printButtons}>
                asdas
            </button>
        </>
    )
}

export default CalculatorPage