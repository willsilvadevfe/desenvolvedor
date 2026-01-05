import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Teste from './Teste.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Teste />
  </StrictMode>,
);
