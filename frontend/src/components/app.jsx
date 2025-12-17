import { useState } from 'react';

//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

//HOOKS
import useIsAuthenticated from '../hooks/useIsAuthenticated.js';
import useDisplaySection from '../hooks/useDisplaySection.js';
import useFetchUserData from '../hooks/useFetchUserData.js';
import useFetchUserLibrary from '../hooks/useFetchUserLibrary.js'

export default function App() {
    const isAuthenticated = useIsAuthenticated();
    const { displaySection, setDisplaySection, ActiveComponent } = useDisplaySection();
    const user = useFetchUserData();
    const library = useFetchUserLibrary();
    const [activeId, setActiveId] = useState(null);

    return (
        <>
            <GlobalHeader setDisplaySection={setDisplaySection} user={user}/>
            {!isAuthenticated && <LoginModal />}
            
            <div id='appLayout'>
                <LibrarySidebar library={library} setDisplaySection={setDisplaySection} activeId={activeId} setActiveId={setActiveId} />
                <MainSection  >
                    <ActiveComponent key={displaySection} user={user} activeId={activeId} />
                </MainSection>  
            </div>

            <PlayerFooter />        
        </>

    );
}