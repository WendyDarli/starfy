import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


//COMPONENTS
import GlobalHeader from './components/GlobalHeader/GlobalHeader.jsx'
import LibrarySidebar from './components/LibrarySidebar/LibrarySidebar.jsx'
import MainSection from './components/MainSection/MainSection.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalHeader />
    <div id='appLayout'>
      <LibrarySidebar />
      <MainSection />      
    </div>

  </StrictMode>
)
