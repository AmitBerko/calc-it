import React, { useState } from 'react';

const CalculatorContext = React.createContext({
    moves: 0,
    setMoves: () => { },
    goal: 0,
    setGoal: () => { },
    result: 0,
    setResult: () => { }
});

const CalculatorProvider = ({ children }) => {
    const [moves, setMoves] = useState(0);
    const [goal, setGoal] = useState(0);
    const [result, setResult] = useState(0);

    return (
        <CalculatorContext.Provider
            value={{
                moves,
                setMoves,
                goal,
                setGoal,
                result,
                setResult
            }}
        >
            <div className="inputs-container">
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
            </div>

            {children}
        </CalculatorContext.Provider>
    );
};

export { CalculatorContext, CalculatorProvider };
