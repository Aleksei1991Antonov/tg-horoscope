import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { LoveStandaloneView } from './love/LoveStandaloneView'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LoveStandaloneView />
    </StrictMode>,
)
