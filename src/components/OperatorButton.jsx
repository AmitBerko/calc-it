import React from 'react'

function OperatorButton({operator, value, result, setResult, moves, setMoves, edit = false}) {

    function handleCalculation() {
        const parsedValue = parseFloat(value)
        if (moves == 0) return
        setMoves(moves - 1)
        if (operator == '+')
            setResult(result + parsedValue)
        else if (operator == '-')
            setResult(result - parsedValue)
        else if (operator == '/')
            setResult(parseInt(100 * result / parsedValue) / 100) // Rounds 2 digits after dot
        else
            setResult(result * parsedValue)
    }

    function handleEdit() {
        
    }

    return (
        <>
            {edit
                ? <button className="operator" onClick={handleEdit}>OPR</button>
                : <button className="operator" onClick={handleCalculation}>{operator}{value}</button>
            }
        </>
        
    )
}

export default OperatorButton