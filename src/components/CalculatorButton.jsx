import React, {useContext} from 'react'
import { CalculatorContext } from '../CalculatorContext'

function CalculatorButton({...props}) {
    const { moves, setMoves, goal, result, setResult } = useContext(CalculatorContext)
    let initialMoves = 0
    let initialResult = 0
    let type = props.type
    let className
    let content
    let onClick

    if (type == 'operatorButton') {
        className = 'operator'
        content = props.operator + props.value
        onClick = handleOperator
    } else if (type == 'clrButton') {
        className = 'clr'
        content = 'CLR'
        onClick = handleClear
    } else if (type == 'addDigitButton') {
        className = 'add-digit'
        content = props.value
        onClick = handleAddDigit
    } else if (type == 'specialButton') {
        className = 'special'
        let specialType = props.specialType
        if (specialType == 'mirror') {
            props.onClick = handleMirror
            content = 'Mirror'
        } else if (specialType == 'reverse') {
            props.onClick = handleReverse
            content = 'Reverse'
        } else if (specialType == 'sum') {
            props.onClick = handleSum
            content = 'SUM'
        }
    } else {
        className = 'empty'
        content = ''
        onClick = handleEmpty
    }
    
    // Empty Button
    function handleEmpty(event) {
        var editor = document.getElementsByClassName('editor-container')[0]
        var button = event.target
        var lastSelected = document.querySelector('.selected')
        button.classList.add('selected')
        editor.style.display = 'grid'
        if (button == lastSelected) {
            button.classList.remove('selected')
            editor.style.display = 'none'
        }
        else if (lastSelected != null)
            lastSelected.classList.remove('selected')
    }

    // Clear Button
    function handleClear() {
        setResult(initialResult)
        setMoves(initialMoves)
    }

    // Operator Button
    function handleOperator() {
        let {operator, value} = props
        const parsedValue = parseFloat(value)
        setMoves(moves - 1)
        if (operator == '+')
            setResult(prevResult => prevResult + parsedValue)
        else if (operator == '-')
            setResult(prevResult => prevResult - parsedValue)
        else if (operator == '/')
            setResult(prevResult => parseInt(100 * prevResult / parsedValue) / 100) // Rounds 2 digits after dot
        else if (operator == '*')
            setResult(prevResult => prevResult * parsedValue)
    }

    // Add Digit Button
    function handleAddDigit() {
        let {value} = props
        setResult(prevResult => parseInt(prevResult + value.toString()))
    }

    // Special Buttons
    function handleReverse() {
        console.log('reverse')
    }

    function handleSum() {
        console.log('sum')
    }

    function handleMirror() {
        console.log('mirror')
    }

    if (moves == -10)
        onClick = null

    return (
        <button onClick={onClick} className={className} {...props}>{content}</button>
    )
}

export default CalculatorButton