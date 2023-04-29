import React from 'react'

function EmptyButton({ id }) {

    function handleClick(event) {
        var editor = document.getElementsByClassName('editor-container')[0]
        var button = event.target
        var lastSelected = document.querySelector('.selected')
        button.classList.add('selected')
        editor.style.display = 'grid'
        if (button == lastSelected) {
            button.classList.remove('selected')
            editor.style.display = 'none'
        }
        else if (lastSelected != null)
            lastSelected.classList.remove('selected')
    }

    return (
        <button className="empty" onClick={handleClick} id={id}></button>
    )
}

export default EmptyButton