import React, { useContext } from 'react'
import { CalculatorContext } from '../CalculatorContext'

function CalculatorButton({...props}) {
    const { moves, setMoves, goal, result, setResult, buttons, setButtons,
            initialMoves, initialResult } = useContext(CalculatorContext)
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
        } else if (specialType == 'pow') {
            props.onClick = handlePow
            let { power } = props
            content = <p style={{ transform: 'translateY(-0.325rem)' }}>X<sup>{power}</sup></p> // שייי
        } else if (specialType == 'delete') {
            props.onClick = handleDelete
            content = '<<'
        } else if (specialType == 'plusMinus') {
            props.onClick = handlePlusMinus
            content = '+/-'
        } else if (specialType == 'transform') {
            props.onClick = handleTransform
            let { transformFrom, transformTo } = props
            content = `${transformFrom}=>${transformTo}`
        }
    } else {
        className = 'empty'
        content = ''
        onClick = handleEmpty
    }

    function canMove() {
        if (moves == 0 || result == 'too big' || result == 'success')
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
        } else if (lastSelected != null)
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
        else if (operator == 'x')
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
        if (!canMove()) return
        setResult((prevResult) => {
            return parseInt(prevResult.toString().split('').reverse().join(''))
        })
    }

    function handleSum() {
        if (!canMove()) return
        let temp = Math.abs(result), sum = 0
        while (temp > 0) {
            sum += temp % 10
            temp = Math.floor(temp / 10)
        }
        setResult(sum)
    }

    function handleMirror() {
        if (!canMove()) return
        let temp = Math.abs(result)
        let newResult = temp
        while (temp > 0) {
            newResult = newResult * 10 + temp % 10
            temp = Math.floor(temp / 10)
        }
        setResult(newResult)
    }

    function handlePow() {
        if (!canMove()) return
        let { power } = props
        setResult((prevResult) => {
            return Math.pow(prevResult, power)
        })
    }

    function handleDelete() {
        if (!canMove()) return
        setResult((prevResult) => {
            return parseInt(prevResult / 10)
        })
    }

    function handlePlusMinus() {
        if (!canMove()) return
        setResult((prevResult) => -prevResult)
    }

    function handleTransform() {
        if (!canMove()) return
        let { transformFrom, transformTo } = props
        setResult(parseInt(result.toString().replaceAll(transformFrom, transformTo)))
    }

    if (result == goal && initialResult != result) {
        setTimeout(() => {
            setResult('success')
        }, 500);
    }

    function handleContextMenu(event) {
        event.preventDefault();
        const clickedButton = event.target; // Get the button that was right-clicked
        if (clickedButton.id == '2') return // Ignore the CLR button

        setButtons(prevButtons => {
            return prevButtons.map(button => {
                if (button.id == clickedButton.id)
                    return {id: button.id, type: 'emptyButton'}
                else
                    return button
            })
        })
    }

    if (result >= 1000000)
        setResult('too big')

    return (
        <button 
            onClick={onClick}
            className={className} 
            onContextMenu={handleContextMenu} 
            {...props}>
            {content}
        </button>
    )
}

export default CalculatorButton