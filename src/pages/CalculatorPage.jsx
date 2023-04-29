import React, { useState } from 'react'
import OperatorButton from '../components/OperatorButton'
import EmptyButton from '../components/EmptyButton'
import "../styles.scss"

function CalculatorPage() {
    const [result, setResult] = useState(9876) // Change later
    const [moves, setMoves] = useState(5) // Change later
    const [goal, setGoal] = useState(456) // Change later
    const [buttons, setButtons] = useState([
        { id: 0, type: 'emptyButton' },
        { id: 1, type: 'emptyButton' },
        { id: 2, type: 'clrButton', editable: false},
        { id: 3, type: 'emptyButton' },
        { id: 4, type: 'emptyButton' },
        { id: 5, type: 'operatorButton', operator: '+', value: 50},
        { id: 6, type: 'emptyButton' },
        { id: 7, type: 'emptyButton' },
        { id: 8, type: 'emptyButton' },
    ])

  return (
    <>
    <div className="editor-container">
        <div className="editor-buttons-container">
            <OperatorButton edit="true" /> 
            <button className="add-digit">Num</button>
            <button className="special">SUM</button>
            <button className="special">Reverse</button>
            <button className="special">Mirror</button>
            <button className="special">+/-</button>
            <button className="special">&lt;&lt;</button>
            <button className="special">_=&gt;_</button>
        </div>
        {/* <div className="inputs">
            test
        </div> */}
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
            {buttons.map(button => {
                switch (button.type) {
                    case 'clrButton':
                        return <button key={button.id} className="clr">CLR</button>
                    case 'operatorButton':
                        return <OperatorButton
                            operator={button.operator} value={button.value}
                            result={result} setResult={setResult}
                            moves={moves} setMoves={setMoves} key={button.id} />
                    case 'emptyButton':
                        return <EmptyButton 
                            buttons={buttons} setButtons={setButtons}
                            key={button.id} id={button.id} />
                }
            })
            }

        </div>
    </div>
    </>
  )
}

export default CalculatorPage