import React, { useContext } from 'react'
import { CalculatorContext } from '../CalculatorContext'


function EditButton({ ...props }) {
    const { buttons, setButtons } = useContext(CalculatorContext)
    let selectedEmptyId
    let type = props.type
    let className
    let content
    let onClick

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

    function handleOperatorEdit() {
        let operatorInput = document.getElementById('operator-container');
        if (operatorInput.style.display == 'none' || operatorInput.style.display == '') {
            operatorInput.style.display = 'block';
        } else {
            let operator = document.getElementById('operator-input').value;
            let value = parseInt(document.getElementById('operator-value-input').value);
            if (operator == '' || isNaN(value)) {
                operatorInput.style.display = 'none'
                return
            }
            let operatorButton = { type: 'operatorButton', operator: operator, value: value };
            addButton(operatorButton);
            operatorInput.style.display = 'none';
        }
    }

    function handleAddDigitEdit() {
        let addDigitInput = document.getElementById('add-digit-container');
        if (addDigitInput.style.display == 'none' || addDigitInput.style.display == '') {
            addDigitInput.style.display = 'block';
        } else {
            let value = parseInt(document.getElementById('add-digit-input').value)
            if (isNaN(value)) {
                addDigitInput.style.display = 'none'
                return
            }
            let addDigitButton = { type: 'addDigitButton', value: value };
            addButton(addDigitButton);
            addDigitInput.style.display = 'none';
        }
    }

    function handleReverseEdit() {
        let reverseButton = { type: 'specialButton', specialType: 'reverse' }
        addButton(reverseButton)
    }

    function handleSumEdit() {
        let sumButton = { type: 'specialButton', specialType: 'sum' }
        addButton(sumButton)
    }

    function handleMirrorEdit() {
        let mirrorButton = { type: 'specialButton', specialType: 'mirror' }
        addButton(mirrorButton)
    }

    function handleDeleteEdit() {
        let deleteButton = { type: 'specialButton', specialType: 'delete' }
        addButton(deleteButton)
    }

    function handleTransformEdit() {
        console.log('transform')
    }

    function handlePowEdit() {
        console.log('pow')
    }

    function handlePlusMinusEdit() {
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