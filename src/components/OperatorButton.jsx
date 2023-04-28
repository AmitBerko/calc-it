import React from 'react'

function OperatorButton({operator, value, result, setResult, moves, setMoves}) {

    function handleClick() {
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

    return (
        <button className="operator" onClick={handleClick}>{operator}{value}</button>
    )
}

export default OperatorButton