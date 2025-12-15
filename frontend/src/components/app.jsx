//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx'
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx'
import MainSection from './MainSection/MainSection.jsx'
import PlayerFooter from './PlayerFooter/PlayerFooter.jsx'

export default function App() {

    return (
        <>
            <GlobalHeader />

            <div id='appLayout'>
            <LibrarySidebar />
            <MainSection />      
            </div>

            <PlayerFooter />        
        </>

    );
}