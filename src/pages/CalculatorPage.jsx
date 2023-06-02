import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../styles.scss'
import EditButton from '../components/EditButton'
import CalculatorButton from '../components/CalculatorButton'
import { CalculatorContext } from '../CalculatorContext'
import { db } from '../config/firebase'
import { getDocs, collection, addDoc, updateDoc } from 'firebase/firestore'
import RulesContainer from '../components/RulesContainer'

function CalculatorPage() {
    // Destructuring values from the CalculatorContext
    const {
        levelSettings,
        setLevelSettings,
        setInitialLevelSettings,
        buttons,
        setButtons,
        isPlayMode,
        setIsPlayMode,
        hideContainers,
        setHideContainers
    } = useContext(CalculatorContext)

    // Variables to handle rules container
    const [showRules, setShowRules] = useState(false)

    const handleShowRules = () => {
        setShowRules(true)
        setHideContainers(true)
    }

    const handleCloseRules = () => {
        setShowRules(false)
        setHideContainers(false)
    }

    // Extracting levelId from the URL parameters
    const { levelId } = useParams()

    // Reference to the 'levels' collection in the database
    const levelsRef = collection(db, 'levels')

    useEffect(() => {
        const loadLevel = async () => {
            try {
                // Handle empty level id
                if (!levelId) {
                    setHideContainers(false)
                    return
                }

                // Retrieve all level documents from the 'levels' collection
                const data = await getDocs(levelsRef)

                // Map the retrieved documents to extract necessary data
                const levels = data.docs.map((doc) => {
                    return { id: doc.id.slice(0, 5), ...doc.data() }
                })

                // Find the level to load based on the levelId
                const levelToLoad = levels.find((level) => level.id == levelId)

                // If the level to load is not found, redirect to the home page
                if (!levelToLoad) {
                    window.location.href = '/'
                    setHideContainers(false)
                    return
                }

                // Update the buttons, levelSettings, and initialLevelSettings based on the loaded level
                setButtons(levelToLoad.buttons)
                setLevelSettings(levelToLoad.initialLevelSettings)
                setInitialLevelSettings(levelToLoad.initialLevelSettings)
                setIsPlayMode(true)
                setHideContainers(false)
            } catch (error) {
                console.log(`error: ${error}`)
            }
        }

        // Call the loadLevel function when the component mounts or when levelId changes
        loadLevel()
    }, [levelId])

    // Editor buttons configuration
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

    return (
        <>
            { !isPlayMode && !hideContainers &&
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
            { !hideContainers && 
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
            }

            { !hideContainers &&
                <svg class="info-button" viewBox="0 0 16 16" onClick={handleShowRules}>
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
                </svg>
            }


            {showRules && <RulesContainer onClose={handleCloseRules} />}
        </>
    )
}

export default CalculatorPage