
/*import React from 'react';
import ReactDOM from 'react-dom/client';
import ARDisplay from './ARDisplay';
// 2) Obtener referencia al componente root

const elemento = document.getElementById('root');

// 3) Instruir a React que tome control de este elemento
const root = ReactDOM.createRoot(elemento);

// 4) Crear el componente

// 5) Mostrar el componente en la pantalla
root.render(<ARDisplay />);
*/
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Make sure this imports App, not ARDisplay

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(<App />); // This should render App, which includes ARDisplay



