import React from 'react'

const RulesContainer = ({ onClose }) => {
    const exampleLevels = [
        {
            title: 'Very Easy Level',
            link: 'https://calcit.pro/C3Se1',
            description: '',
        },
        {
            title: 'Easy Level',
            link: 'https://calcit.pro/h7uA2',
            description: '',
        },
        {
            title: 'Medium Level',
            link: 'https://calcit.pro/MXmrf',
            description: '',
        },
        {
            title: 'Hard Level',
            link: 'https://calcit.pro/l5kGH',
            description: '',
        },
        {
            title: 'Very Hard Level',
            link: 'https://calcit.pro/GGc2i',
            description: '',
        },
    ]

    return (
        <div className="rules-container">
            <h1>Game Rules</h1>
            <p>
                The goal is to reach the target number by strategically using buttons that perform mathematical operations on the current result.
            </p>

            <h2>Building a Level:</h2>
            <ol>
                <li>
                    <strong>Edit Settings: </strong>
                    On the right side of the screen, you can find the level settings panel.
                    There, you can configure various parameters for the level, such as the initial result, the goal, and number of moves.
                </li>
                <li>
                    <strong>Adding Buttons: </strong>
                    Click on an empty button slot and choose a button type to add it to the level.
                </li>
                <li>
                    <strong>Deleting Buttons: </strong>
                    Right-click on a button to remove it from the calculator.
                </li>
            </ol>

            <h2>Button Functionality:</h2>
            <ul>
                <li>
                    <strong>Operator Button: </strong>
                    Performs a mathematical operation on the current result.
                </li>
                <li>
                    <strong>Add Digit Button: </strong>
                    Adds the corresponding number to the current result. 
                </li>
                <li>
                    <strong>Reverse Button: </strong>
                    Reverses the current result (e.g., 1234 becomes 4321).
                </li>
                <li>
                    <strong>Mirror Button: </strong>
                    Mirrors the current number (e.g., 123 becomes 123321).
                </li>
                <li>
                    <strong>Transform Button: </strong>
                    Transforms a specific digit (or number) from one form to another. Represented by X=&gt;Y (e.g., clicking on a 2=&gt;3 would replace the result from 123 to 133).
                </li>
                <li>
                    <strong>Plus/Minus Button: </strong>
                    Changes the sign of the current number.
                </li>
                <li>
                    <strong>Delete Button: </strong>
                    Deletes the last digit from the current number. Represented by &lt;&lt;
                </li>
                <li>
                    <strong>Sum Button: </strong>
                    Computes the sum of all digits in the current number.
                </li>
                <li>
                    <strong>Power Button: </strong>
                    Raises the current number to a specified power.
                </li>
            </ul>
            <div className="link-container">
                <h2>Example Levels:</h2>
                <ul>
                    {exampleLevels.map((level, index) => (
                        <li key={index}>
                            <a href={level.link}>{level.title}</a> {level.description}
                        </li>
                    ))}
                </ul>
            </div>
            <button className="close-button" onClick={onClose}>Close</button>
        </div>
    )
}

export default RulesContainer
