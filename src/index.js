import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import CalculatorPage from './pages/CalculatorPage';
import { CalculatorProvider } from './CalculatorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Routes>
                <Route path="/" element={<CalculatorProvider><CalculatorPage /></CalculatorProvider>} />
                <Route path="/:levelId" element={<CalculatorProvider><CalculatorPage /></CalculatorProvider>} />
            </Routes>
        </React.StrictMode>
    </BrowserRouter>
);
