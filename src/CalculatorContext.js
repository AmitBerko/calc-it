import React, { useState } from 'react';

const CalculatorContext = React.createContext();

const CalculatorProvider = ({ children }) => {
    const [moves, setMoves] = useState(0);
    const [goal, setGoal] = useState(0);
    const [result, setResult] = useState(0);
    const [initialMoves, setInitialMoves] = useState(0);
    const [initialResult, setInitialResult] = useState(0);
    const [initialGoal, setInitialGoal] = useState(0);
    const [buttons, setButtons] = useState([
        { id: 0, type: 'emptyButton' },
        { id: 1, type: 'emptyButton' },
        { id: 2, type: 'clrButton' },
        { id: 3, type: 'emptyButton' },
        { id: 4, type: 'emptyButton' },
        { id: 5, type: 'operatorButton', operator: '+', value: 50 },
        { id: 6, type: 'emptyButton' },
        { id: 7, type: 'addDigitButton', value: 5 },
        { id: 8, type: 'specialButton', specialType: 'mirror' },
    ])

    const updateInitialValues = () => {
        setMoves(initialMoves);
        setResult(initialResult);
        setGoal(initialGoal);
    };

    return (
        <CalculatorContext.Provider
            value={{
                moves,
                setMoves,
                goal,
                setGoal,
                result,
                setResult,
                initialMoves,
                setInitialMoves,
                initialResult,
                setInitialResult,
                initialGoal,
                setInitialGoal,
                buttons,
                setButtons,
            }}
        >
            <div className="inputs-container">
                <h1>Level Settings</h1>
                <div className="input-group">
                    <label htmlFor="initial-moves">Initial Moves:</label>
                    <input
                        type="number"
                        id="initial-moves"
                        value={initialMoves}
                        onChange={(e) => setInitialMoves(parseInt(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="initial-result">Initial Result:</label>
                    <input
                        type="number"
                        id="initial-result"
                        value={initialResult}
                        onChange={(e) => setInitialResult(parseInt(e.target.value))}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="goal-input">Goal:</label>
                    <input
                        type="number"
                        id="goal-input"
                        value={initialGoal}
                        onChange={(e) => setInitialGoal(parseInt(e.target.value))}
                    />
                </div>
                <button className="update" onClick={updateInitialValues}>Update</button>
            </div>
            {children}
        </CalculatorContext.Provider>
    );
};


export { CalculatorContext, CalculatorProvider };