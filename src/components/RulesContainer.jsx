import React from 'react'

const RulesContainer = ({ onClose }) => {
    return (
        <div className="rules-container">
            <h1>Game Rules:</h1>
            <p>
                The goal of the game is to reach a specific number by strategically making moves using the available buttons.
                Each button represents a mathematical operation or action that can be applied to the current result.
            </p>

            <h2>Building a Level:</h2>
            <ol>
                <li>
                    <strong>Edit Settings: </strong>
                    On the right side of the screen, you can find the level settings panel.
                    Here, you can configure various parameters for the level, such as the initial result, the goal, and number of moves.
                </li>
                <li>
                    <strong>Adding Buttons: </strong>
                    To add a button to the level, simply click on an empty button slot.
                    A menu will appear where you can choose the type of button you want to add.
                    Select the desired button type, and it will be added to the level.
                </li>
                <li>
                    <strong>Deleting Buttons: </strong>
                    If you wish to remove a button from the level, right-click on the button you want to delete and
                    it will be removed from the calculator.
                </li>
            </ol>

            <h2>Button Functionality:</h2>
            <ul>
                <li>
                    <strong>Operator Button: </strong>
                    Performs a specific mathematical operation (e.g., addition, subtraction, multiplication) on the current result.
                </li>
                <li>
                    <strong>Add Digit Button: </strong>
                    Adds a digit (or a number) to the current result. Represented by a purple button (e.g., clicking on a "10" purple button would change the result from 123 to 12310)
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
                    Changes the sign of the current number. Represented by +/-.
                </li>
                <li>
                    <strong>Delete Button: </strong>
                    Deletes the last digit from the current number. Represented by &lt;&lt; (e.g., clicking the delete button would turn the result 123 to 12)
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
            <button onClick={onClose}>Close</button>
        </div>
    )
}

export default RulesContainer
