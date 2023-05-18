import React, { useContext } from 'react'
import { CalculatorContext } from '../CalculatorContext'

function CalculatorButton({ ...props }) {

    // Destructure values from context
    const {
        levelSettings,
        setLevelSettings,
        initialLevelSettings,
        setButtons,
    } = useContext(CalculatorContext)

    // Destructure props

    // Initialize variables related to the buttons
    const { type } = props
    let className
    let content
    let onClick

    // Determine button type and set variables accordingly
    if (type == 'operatorButton') {
        const { operator, value } = props
        className = 'operator'
        content = operator + value
        onClick = handleOperator
    } else if (type == 'clrButton') {
        className = 'clr'
        content = 'CLR'
        onClick = handleClear
    } else if (type == 'addDigitButton') {
        const { value } = props
        className = 'add-digit'
        content = value
        onClick = handleAddDigit
    } else if (type == 'specialButton') {
        const { specialType } = props
        className = 'special'
        if (specialType == 'mirror') {
            onClick = handleMirror
            content = 'Mirror'
        } else if (specialType == 'reverse') {
            onClick = handleReverse
            content = 'Reverse'
        } else if (specialType == 'sum') {
            onClick = handleSum
            content = 'SUM'
        } else if (specialType == 'pow') {
            const { power } = props
            onClick = handlePow
            content = <p style={{ transform: 'translateY(-0.325rem)' }}>X<sup>{power}</sup></p> // שייי
        } else if (specialType == 'delete') {
            onClick = handleDelete
            content = '<<'
        } else if (specialType == 'plusMinus') {
            onClick = handlePlusMinus
            content = '+/-'
        } else if (specialType == 'transform') {
            const { transformFrom, transformTo } = props
            onClick = handleTransform
            content = `${transformFrom}=>${transformTo}`
        }
    } else {
        className = 'empty'
        content = ''
        onClick = handleEmpty
    }

    function canMove() {
        // If there are no moves left or the result is 'too big' or 'success', return false
        if (levelSettings.moves == 0 || levelSettings.result == 'too big'
            || levelSettings.result == 'success')
            return false
        // Decrement the moves and return true
        setLevelSettings(prevSettings => ({
            ...prevSettings,
            moves: levelSettings.moves - 1,
        }))
        return true
    }

    function handleEmpty(event) {
        // Get the editor and button elements
        var editor = document.getElementsByClassName('editor-container')[0]
        var button = event.target
        // Get the last selected button
        var lastSelected = document.querySelector('.selected')
        // Add the 'selected' class to the button and show the editor
        button.classList.add('selected')
        editor.style.display = 'grid'
        // If the button is the last selected button, remove the 'selected' class and hide the editor
        if (button == lastSelected) {
            button.classList.remove('selected')
            editor.style.display = 'none'
        }
        // Otherwise, remove the 'selected' class from the last selected button
        else if (lastSelected != null)
            lastSelected.classList.remove('selected')
    }

    function handleClear() {
        // Reset the result and moves to their initial values
        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: initialLevelSettings.result,
            moves: initialLevelSettings.moves,
        }))
    }

    function handleOperator() {
        // If a move cannot be made, return
        if (!canMove()) return

        let { operator, value } = props
        const parsedValue = parseFloat(value)
        let newResult

        // Perform the appropriate operation based on the operator
        if (operator == '+') {
            newResult = levelSettings.result + parsedValue
        } else if (operator == '-') {
            newResult = levelSettings.result - parsedValue
        } else if (operator == '/') {
            newResult = parseInt(100 * levelSettings.result / parsedValue) / 100 // Rounds 2 digits after dot
        } else if (operator == 'x') {
            newResult = levelSettings.result * parsedValue
        }

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: newResult,
        }))
    }

    function handleAddDigit() {
        // If a move cannot be made, return
        if (!canMove()) return

        let { value } = props

        // Add a certain digit to the result
        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: parseInt(levelSettings.result + value.toString())
        }))
    }

    function handleReverse() {
        // If a move cannot be made, return
        if (!canMove()) return

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: parseInt(levelSettings.result.toString().split('').reverse().join(''))
        }))
    }

    function handleSum() {
        // If a move cannot be made, return
        if (!canMove()) return

        let temp = Math.abs(levelSettings.result)
        let sum = 0

        // Compute the sum of the digits of the result
        while (temp > 0) {
            sum += temp % 10
            temp = Math.floor(temp / 10)
        }

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: sum
        }))
    }


    function handleMirror() {
        // If a move cannot be made, return
        if (!canMove()) return

        let temp = Math.abs(levelSettings.result)
        let newResult = temp

        // Add a reversed result to the current result (for example, 123 should turn into 123321)
        while (temp > 0) {
            newResult = newResult * 10 + temp % 10
            temp = Math.floor(temp / 10)
        }

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: levelSettings.result > 0 ? newResult : -newResult
        }))
    }


    function handlePow() {
        // If a move cannot be made, return
        if (!canMove()) return

        let { power } = props

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: Math.pow(prevSettings.result, power)
        }))
    }

    
    function handleDelete() {
        // If a move cannot be made, return
        if (!canMove()) return

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            // remove the last digit from the result.
            result: parseInt(prevSettings.result / 10)
        }))
    }

    function handlePlusMinus() {
        // If a move cannot be made, return
        if (!canMove()) return

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: -prevSettings.result
        }))
    }

    function handleTransform() {
        // If a move cannot be made, return
        if (!canMove()) return

        let { transformFrom, transformTo } = props

        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: parseInt(prevSettings.result.toString().replaceAll(transformFrom, transformTo))
        }))
    }

    if (levelSettings.result == levelSettings.goal &&
        initialLevelSettings.result != levelSettings.result) {
        setTimeout(() => {
            setLevelSettings(prevSettings => ({
                ...prevSettings,
                result: 'success'
            }))
        }, 500)
    }

    function handleContextMenu(event) {
        // This function is called when the right mouse button is pressed on the button
        event.preventDefault() // Prevents the default context menu from showing up
        const clickedButton = event.target // Get the button that was right-clicked
        if (clickedButton.id == '2') return // Ignore the CLR button

        // Delete the button that was clicked
        setButtons(prevButtons => {
            return prevButtons.map(button => {
                if (button.id == clickedButton.id)
                    return { id: button.id, type: 'emptyButton' }
                else
                    return button
            })
        })
    }

    if (levelSettings.result >= 1000000) {
        setLevelSettings(prevSettings => ({
            ...prevSettings,
            result: 'too big'
        }))
    }


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