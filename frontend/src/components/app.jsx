//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx'
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx'
import MainSection from './MainSection/MainSection.jsx'
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx'
import LoginModal from './LoginModal/LoginModal.jsx'

//HOOKS
import useIsAuthenticated from '../hooks/useIsAuthenticated.js';

export default function App() {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            <GlobalHeader />

            {/* after login check if user is authenticated to remove login modal */}
            {!isAuthenticated && <LoginModal />}

            <div id='appLayout'>
            <LibrarySidebar />
            <MainSection />      
            </div>

            <PlayerFooter />        
        </>

    );
}