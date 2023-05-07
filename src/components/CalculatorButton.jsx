import React, {useContext} from 'react'
import { CalculatorContext } from '../CalculatorContext'

function CalculatorButton({...props}) {
    const { moves, setMoves, goal, result, setResult, buttons, setButtons,
            initialMoves, initialResult, hasValuesUpdated } = useContext(CalculatorContext)
    let type = props.type
    let className
    let content
    let onClick
    let hasWon = false

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

    function canMove() {
        if (moves == 0)
            return false
        setMoves(prevMoves => prevMoves - 1)
        return true
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
        if (!canMove()) return
        let {operator, value} = props
        const parsedValue = parseFloat(value)
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
        if (!canMove()) return
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

    if (result == goal && initialMoves > moves && initialResult != result) {
        hasWon = true
        setTimeout(() => {
            setResult('success')
        }, 750);
    }

    function handleContextMenu(event) {
        event.preventDefault();
        const clickedButton = event.target; // get the button that was right-clicked
        if (clickedButton.id == '2') return

        setButtons(prevButtons => {
            return prevButtons.map(button => {
                if (button.id == clickedButton.id)
                    return {type: 'emptyButton'}
                else
                    return button
            })
        })
    }

    return (
        <button onClick={onClick} className={className} onContextMenu={handleContextMenu} disabled={hasWon} {...props}>{content}</button>
    )
}

export default CalculatorButton