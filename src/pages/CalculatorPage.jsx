import React from 'react'
import "../styles.scss"

function CalculatorPage() {
  return (
    <>
    <div className="calculator-container">
        <div className="screen-outline">
            <div className="screen">
                <div className="level-info">
                    <div id="moves">MOVES: 1</div>
                    <div id="goal">GOAL: 456</div>
                </div>
                <div id="result">9876543</div>
            </div>
        </div>
        <div className="buttons-container">
            <button className="empty"></button>
            <button className="empty"></button>
            <button className="clr">CLR</button>
            <button className="empty"></button>
            <button className="operator">+5</button>
            <button className="empty"></button>
            <button className="operator">/2</button>
            <button className="empty"></button>
            <button className="empty"></button>
        </div>
    </div>
    </>
  )
}

export default CalculatorPage