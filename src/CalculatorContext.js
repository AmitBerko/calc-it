import React, { useState } from 'react'

// Create a new context for the calculator
const CalculatorContext = React.createContext()

const CalculatorProvider = ({ children }) => {
    // Define the states
    const [levelSettings, setLevelSettings] = useState({
        moves: 0,
        result: 0,
        goal: 0,
    })

    const [initialLevelSettings, setInitialLevelSettings] = useState({
        moves: 0,
        result: 0,
        goal: 0,
    })

    const [buttons, setButtons] = useState([
        { id: 0, type: 'emptyButton' },
        { id: 1, type: 'emptyButton' },
        { id: 2, type: 'clrButton' },
        { id: 3, type: 'emptyButton' },
        { id: 4, type: 'emptyButton' },
        { id: 5, type: 'emptyButton' },
        { id: 6, type: 'emptyButton' },
        { id: 7, type: 'emptyButton' },
        { id: 8, type: 'emptyButton' },
    ])

    const [isPlayMode, setIsPlayMode] = useState(false)
    // Function to update the initial values based on user input
    const updateInitialValues = () => {
        const moves = parseInt(document.getElementById('initial-moves').value)
        const result = parseInt(document.getElementById('initial-result').value)
        const goal = parseInt(document.getElementById('goal-input').value)

        // Handle invalid input cases
        if (goal == result || moves == 0 || isNaN(moves) || isNaN(result) || isNaN(goal)) {
            setLevelSettings(prevSettings => ({
                ...prevSettings,
                result: 'bad input'
            }))
            return
        }

        // Update the state variables with the new values
        setLevelSettings({ moves: moves, result: result, goal: goal })
        setInitialLevelSettings({ moves: moves, result: result, goal: goal })
    }

    return (
        // Provide the state variables and setters through the context
        <CalculatorContext.Provider
            value={{
                levelSettings,
                setLevelSettings,
                initialLevelSettings,
                setInitialLevelSettings,
                buttons,
                setButtons,
                isPlayMode,
                setIsPlayMode,
            }}
        >
        {!isPlayMode && 
            <div className="inputs-container">
                <h1>Level Settings</h1>
                <div className="input-group">
                    <label htmlFor="initial-moves">Initial Moves:</label>
                    <input type="number" id="initial-moves" />
                </div>
                <div className="input-group">
                    <label htmlFor="initial-result">Initial Result:</label>
                    <input type="number" id="initial-result" />
                </div>
                <div className="input-group">
                    <label htmlFor="goal-input">Goal:</label>
                    <input type="number" id="goal-input" />
                </div>
                <button className="update" onClick={updateInitialValues}>
                    Update
                </button>
            </div>
        }
            {children}
        </CalculatorContext.Provider>
    )
}

export { CalculatorContext, CalculatorProvider }
