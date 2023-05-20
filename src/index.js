import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CalculatorPage from './pages/CalculatorPage';
import { CalculatorProvider } from './CalculatorContext';
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <BrowserRouter>
        <CalculatorProvider>
            <React.StrictMode>
                <Routes>
                    <Route path="/" element={<CalculatorPage />} />
                    <Route path="/levels/:levelId" element={<CalculatorPage />} />
                </Routes>
            </React.StrictMode>
        </CalculatorProvider>
    </BrowserRouter>,
)