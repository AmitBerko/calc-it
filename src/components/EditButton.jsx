import React, { useContext } from 'react'
import { CalculatorContext } from '../CalculatorContext'


function EditButton({ ...props }) {
    const { buttons, setButtons } = useContext(CalculatorContext)
    let selectedEmptyId
    let type = props.type
    let className
    let content
    let onClick
    const containers = ['operator-container',
        'add-digit-container',
        'transform-container',
        'pow-container']

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

    function addButton(buttonObject) {
        if (!document.getElementsByClassName('selected')[0]) return
        selectedEmptyId = parseInt(document.getElementsByClassName('selected')[0].id)
        setButtons(
            buttons.map(button => {
                if (button.id == selectedEmptyId) {
                    return { id: button.id, ...buttonObject }
                }
                else {
                    return button
                }
            })
        )
    }

    function toggleContainers(curContainer = '') { // Keep empty to make everything hidden
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
        if (curContainer == '')
            document.getElementsByClassName('editor-container')[0].style.display = 'none'
    }

    function handleOperatorEdit() {
        toggleContainers('operator-container')
        let operator = document.getElementById('operator-input').value;
        let value = parseInt(document.getElementById('operator-value-input').value);
        if (operator == '' || isNaN(value)) return
        let operatorButton = { type: 'operatorButton', operator: operator, value: value };
        addButton(operatorButton);
        document.getElementById('operator-input').value = '';
        document.getElementById('operator-value-input').value = '';
        toggleContainers()
    }

    function handleAddDigitEdit() {
        toggleContainers('add-digit-container')
        let value = parseInt(document.getElementById('add-digit-input').value)
        if (isNaN(value)) return
        let addDigitButton = { type: 'addDigitButton', value: value };
        addButton(addDigitButton);
        document.getElementById('add-digit-input').value = ''
        toggleContainers()
    }

    function handleTransformEdit() {
        toggleContainers('transform-container')
        let transformFrom = parseInt(document.getElementById('transform-from-input').value)
        let transformTo = parseInt(document.getElementById('transform-to-input').value)

        if (isNaN(transformFrom) || isNaN(transformTo)) return
        let transformButton = { type: 'specialButton', specialType: 'transform',
            transformFrom: transformFrom, transformTo: transformTo };
        addButton(transformButton);
        document.getElementById('transform-from-input').value = ''
        document.getElementById('transform-to-input').value = ''
        toggleContainers()
    }

    function handlePowEdit() {
        toggleContainers('pow-container')
        let power = parseInt(document.getElementById('pow-input').value)
        if (isNaN(power)) return
        let powButton = { type: 'specialButton', specialType: 'pow', power: power }
        addButton(powButton);
        document.getElementById('pow-input').value = ''
        toggleContainers()
    }

    function handleReverseEdit() {
        toggleContainers()
        let reverseButton = { type: 'specialButton', specialType: 'reverse' }
        addButton(reverseButton)
    }

    function handleSumEdit() {
        toggleContainers()
        let sumButton = { type: 'specialButton', specialType: 'sum' }
        addButton(sumButton)
    }

    function handleMirrorEdit() {
        toggleContainers()
        let mirrorButton = { type: 'specialButton', specialType: 'mirror' }
        addButton(mirrorButton)
    }

    function handleDeleteEdit() {
        toggleContainers()
        let deleteButton = { type: 'specialButton', specialType: 'delete' }
        addButton(deleteButton)
    }

    function handlePlusMinusEdit() {
        toggleContainers()
        let plusMinusButton = { type: 'specialButton', specialType: 'plusMinus' }
        addButton(plusMinusButton)
    }

    return (
        <>
            <button onClick={onClick} className={className}>{content}</button>
        </>
    )
}

export default EditButton