import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import GlobalHeader from './components/GlobalHeader/GlobalHeader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalHeader />
  </StrictMode>,
)
