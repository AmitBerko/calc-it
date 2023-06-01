import React, { useContext } from 'react'
import { CalculatorContext } from '../CalculatorContext'

function EditButton({ ...props }) {
    // Accessing the CalculatorContext
    const { buttons, setButtons } = useContext(CalculatorContext)

    // Variable declarations
    let { type } = props
    let selectedEmptyId
    let className
    let content
    let onClick

    // Container IDs for toggling visibility
    const containers = [
        'operator-container',
        'add-digit-container',
        'transform-container',
        'pow-container'
    ]

    // Determine button properties based on type
    if (type == 'operatorButton') {
        className = 'operator'
        content = 'OPR'
        onClick = handleOperatorEdit
    } else if (type == 'addDigitButton') {
        className = 'add-digit'
        content = 'NUM'
        onClick = handleAddDigitEdit
    } else if (type == 'specialButton') {
        className = 'special'
        let specialType = props.specialType
        if (specialType == 'mirror') {
            onClick = handleMirrorEdit
            content = 'Mirror'
        } else if (specialType == 'reverse') {
            onClick = handleReverseEdit
            content = 'Reverse'
        } else if (specialType == 'sum') {
            onClick = handleSumEdit
            content = 'SUM'
        } else if (specialType == 'transform') {
            onClick = handleTransformEdit
            content = '_=>_'
        } else if (specialType == 'pow') {
            onClick = handlePowEdit
            content = <p>X<sup>a</sup></p>
        } else if (specialType == 'delete') {
            onClick = handleDeleteEdit
            content = '<<'
        } else if (specialType == 'plusMinus') {
            onClick = handlePlusMinusEdit
            content = '+/-'
        }
    }

    // Adds a button to the calculator
    function addButton(buttonObject) {
        // Check if there is a selected button container
        if (!document.getElementsByClassName('selected')[0]) return

        // Get the ID of the selected button container
        selectedEmptyId = parseInt(document.getElementsByClassName('selected')[0].id)

        // Update the buttons state with the new button added
        setButtons(
            buttons.map(button => {
                if (button.id == selectedEmptyId) {
                    return { id: button.id, ...buttonObject }
                } else {
                    return button
                }
            })
        )

        // Hide the container after adding the button
        toggleContainers()
    }

    // Toggles the visibility of containers
    function toggleContainers(curContainer = '') {
        let container
        for (let i = 0; i < containers.length; i++) {
            if (containers[i] == curContainer) {
                container = document.getElementById(curContainer)
                container.classList.remove('hidden')
            } else {
                container = document.getElementById(containers[i])
                container.classList.add('hidden')
            }
        }

        // Hide the editor container when no container is specified
        if (curContainer == '') {
            document.getElementsByClassName('editor-container')[0].style.display = 'none'
        }
    }

    // Clear input fields
    function clearInputFields(...inputIds) {
        inputIds.forEach((id) => {
            document.getElementById(id).value = ''
        })
    }

    function handleOperatorEdit() {
        // Show the operator container
        toggleContainers('operator-container')

        // Get the operator and value inputs
        const operator = document.getElementById('operator-input').value
        const value = parseInt(document.getElementById('operator-value-input').value)

        // Validate inputs
        if (operator == '' || isNaN(value)) return

        // Create an operator button object
        const operatorButton = { type: 'operatorButton', operator, value }

        // Add the operator button to the calculator
        addButton(operatorButton)

        // Clear input fields
        clearInputFields('operator-input', 'operator-value-input')
    }

    function handleAddDigitEdit() {
        // Show the add digit container
        toggleContainers('add-digit-container')

        // Get the value input
        const value = parseInt(document.getElementById('add-digit-input').value)

        // Validate input
        if (isNaN(value)) return

        // Create an add digit button object
        const addDigitButton = { type: 'addDigitButton', value }

        // Add the add digit button to the calculator
        addButton(addDigitButton)

        // Clear input fields
        clearInputFields('add-digit-input')
    }

    function handleTransformEdit() {
        // Show the transform container
        toggleContainers('transform-container')

        // Get the transform inputs
        const transformFrom = parseInt(document.getElementById('transform-from-input').value)
        const transformTo = parseInt(document.getElementById('transform-to-input').value)

        // Validate inputs
        if (isNaN(transformFrom) || isNaN(transformTo)) return

        // Create a transform button object
        const transformButton = {
            type: 'specialButton',
            specialType: 'transform',
            transformFrom,
            transformTo
        }

        // Add the transform button to the calculator
        addButton(transformButton)

        // Clear input fields
        clearInputFields('transform-from-input', 'transform-to-input')
    }

    function handlePowEdit() {
        // Show the pow container
        toggleContainers('pow-container')

        // Get the power input
        const power = parseInt(document.getElementById('pow-input').value)

        // Validate input
        if (isNaN(power)) return

        // Create a pow button object
        const powButton = { type: 'specialButton', specialType: 'pow', power }

        // Add the pow button to the calculator
        addButton(powButton)

        // Clear input field
        clearInputFields('pow-input')
    }

    function handleReverseEdit() {
        // Create a reverse button object
        const reverseButton = { type: 'specialButton', specialType: 'reverse' }

        // Add the reverse button to the calculator
        addButton(reverseButton)
    }

    function handleSumEdit() {
        // Create a sum button object
        const sumButton = { type: 'specialButton', specialType: 'sum' }

        // Add the sum button to the calculator
        addButton(sumButton)
    }

    function handleMirrorEdit() {
        // Create a mirror button object
        const mirrorButton = { type: 'specialButton', specialType: 'mirror' }

        // Add the mirror button to the calculator
        addButton(mirrorButton)
    }

    function handleDeleteEdit() {
        // Create a delete button object
        const deleteButton = { type: 'specialButton', specialType: 'delete' }

        // Add the delete button to the calculator
        addButton(deleteButton)
    }

    function handlePlusMinusEdit() {
        // Create a plus-minus button object
        const plusMinusButton = { type: 'specialButton', specialType: 'plusMinus' }

        // Add the plus-minus button to the calculator
        addButton(plusMinusButton)
    }

    return (
        <>
            <button onClick={onClick} className={className}>{content}</button>
        </>
    )
}

export default EditButton