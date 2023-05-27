import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../styles.scss'
import EditButton from '../components/EditButton'
import CalculatorButton from '../components/CalculatorButton'
import { CalculatorContext } from '../CalculatorContext'
import { db } from '../config/firebase'
import { getDocs, collection, addDoc, updateDoc } from 'firebase/firestore'

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
        hasLoaded,
        setHasLoaded,
    } = useContext(CalculatorContext)

    const { levelId } = useParams()

    const levelsRef = collection(db, 'levels')

    useEffect(() => {
        const loadLevel = async () => {
            try {
                if (!levelId) {
                    setHasLoaded(true)
                    return
                }
                const data = await getDocs(levelsRef)
                const levels = data.docs.map((doc) => {
                    return { id: doc.id.slice(0, 5), ...doc.data() }
                })
                const levelToLoad = levels.find((level) => {
                    return level.id == levelId
                })
                if (!levelToLoad) {
                    window.location.href = '/'
                    setHasLoaded(true)
                    return
                }
                setButtons(levelToLoad.buttons)
                setLevelSettings(levelToLoad.initialLevelSettings)
                setInitialLevelSettings(levelToLoad.initialLevelSettings)
                setIsPlayMode(true)
                setHasLoaded(true)
            } catch (error) {
                console.log(`error: ${error}`)
            }
        }
        loadLevel()
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
            const levelData = { id: null, buttons, initialLevelSettings }
            await addDoc(levelsRef, levelData)
                .then((docRef) => {
                    const id = docRef.id.slice(0, 5)
                    updateDoc(docRef, { id: id, ...docRef.data })
                    alert(`${window.location.hostname}/${id}`)
                })
        } catch (error) {
            console.log(`error: ${error}`)
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
            {hasLoaded && <div className="calculator-container">
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
            </div>}
            {!isPlayMode && hasLoaded && <button className="update test" onClick={saveLevel}>save level</button>}
        </>
    )
}

export default CalculatorPage