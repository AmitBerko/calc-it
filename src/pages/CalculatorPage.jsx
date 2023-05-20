import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import '../styles.scss'
import EditButton from '../components/EditButton'
import CalculatorButton from '../components/CalculatorButton'
import { CalculatorContext } from '../CalculatorContext'

function CalculatorPage() {
    const {
        levelSettings,
        setLevelSettings,
        initialLevelSettings,
        setInitialLevelSettings,
        buttons,
        setButtons,
        isPlayMode,
        setIsPlayMode,
    } = useContext(CalculatorContext)

    const { levelId } = useParams()

    const fetchData = async () => {
        try {
            const response = await axios.get(`/levelsapi/${levelId}`);
            const levelData = response.data;
            if (!levelData) return
            setButtons(levelData.buttons)
            setInitialLevelSettings(levelData.initialLevelSettings)
            setLevelSettings(levelData.initialLevelSettings)
            setIsPlayMode(true)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    useEffect(() => {
        fetchData()
    }, [levelId])
    
    const editorButtons = [
        { id: 0, type: 'operatorButton' },
        { id: 1, type: 'addDigitButton' },
        { id: 2, type: 'specialButton', specialType: 'reverse' },
        { id: 3, type: 'specialButton', specialType: 'mirror' },
        { id: 4, type: 'specialButton', specialType: 'transform' },
        { id: 5, type: 'specialButton', specialType: 'plusMinus' },
        { id: 6, type: 'specialButton', specialType: 'delete' },
        { id: 7, type: 'specialButton', specialType: 'sum' },
        { id: 8, type: 'specialButton', specialType: 'pow' },
    ]

    async function saveLevel() {
        try {
            const response = await axios.post('/levelsapi', {
                buttons: buttons,
                initialLevelSettings: initialLevelSettings,
            })
            // const levelId = response.data.levelId
        } catch (error) {
            console.log(error)
        }
    }

    async function loadLevel(levelId) {
        try {
            const response = await axios.get(`/levelsapi/${levelId}`);
            console.log(response)
            const levelData = JSON.parse(JSON.stringify(response.data));
            if (!levelData) return // If level doesn't exist, return
            setButtons(levelData.buttons)
            setInitialLevelSettings(levelData.initialLevelSettings)
            setLevelSettings(levelData.initialLevelSettings)
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    return (
        <>
        {!isPlayMode &&
            <div className="editor-container">
                <div className="editor-buttons-container">
                    {editorButtons.map(button => {
                        return <EditButton key={button.id} {...editorButtons[button.id]}></EditButton>
                    })}
                </div>
                <div id="inputs">
                    <div className="hidden" id="operator-container">
                        <label>Operator:</label>
                        <select id="operator-input">
                            <option value=""></option>
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="x">x</option>
                            <option value="/">/</option>
                        </select>
                        <br></br>
                        <label htmlFor="operator-value-input">Value:</label>
                        <input
                            type="number"
                            id="operator-value-input"
                        />
                    </div>
                    <div className="hidden" id="add-digit-container">
                        <label htmlFor="add-digit-input">Value:</label>
                        <input
                            type="number"
                            id="add-digit-input"
                        />
                    </div>
                    <div className="hidden" id="transform-container">
                        <label htmlFor="transform-from-input">From:</label>
                        <input
                            type="number"
                            id="transform-from-input"
                        />
                        <br></br>
                        <label htmlFor="transform-to-input">To:</label>
                        <input
                            type="number"
                            id="transform-to-input"
                        />
                    </div>
                    <div className="hidden" id="pow-container">
                        <label htmlFor="pow-input">Value:</label>
                        <input
                            type="number"
                            id="pow-input"
                        />
                    </div>
                </div>
            </div>
        }
            <div className="calculator-container">
                <div className="screen-outline">
                    <div className="screen">
                        <div className="level-info">
                            <div id="moves">MOVES: {levelSettings.moves}</div>
                            <div id="goal">GOAL: {levelSettings.goal}</div>
                        </div>
                        <div id="result">{levelSettings.result}</div>
                    </div>
                </div>
                <div className="buttons-container">
                    {buttons.map((button) => {
                        return <CalculatorButton key={button.id} {...buttons[button.id]} />
                    })}
                </div>
            </div>
            <button className="update test" onClick={() => {
                setIsPlayMode(!isPlayMode)
            }}>asdasd</button>
            <p>play mode: {isPlayMode.toString()}</p>

            <button className="update test" onClick={saveLevel}>save level</button>
            <button 
            className="update test" 
            onClick={() => loadLevel(parseInt(document.getElementById('testInput').value))}
            >load level</button>
            <input id="testInput"></input>
        </>
    )
}

export default CalculatorPage