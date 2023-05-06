import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import CalculatorPage from './pages/CalculatorPage'
import { CalculatorProvider } from './CalculatorContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <CalculatorProvider>
        <React.StrictMode>
            <CalculatorPage />
        </React.StrictMode>
    </CalculatorProvider>
)