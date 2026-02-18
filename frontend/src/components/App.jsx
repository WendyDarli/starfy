//COMPONENTS
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import Player from './Player/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

//HOOKS
import { Suspense } from 'react';
import { useState } from 'react';
import useAuth from '../hooks/query/useAuth.js';
import { Outlet } from 'react-router';
import useCurrentSong from '../hooks/utils/useCurrentSong.js';
import useSongControls from '../hooks/utils/useSongControls.js';


export default function App() {
    const [ songsList, setSongsList ] = useState(null);
    const { data: user, isLoading } = useAuth();

    const isAuthenticated = !!user;

    const { currentSong, setCurrentSong, isPlaying, setIsPlaying} = useCurrentSong();
    const { nextSong, previousSong, randomSong } = useSongControls(currentSong, songsList);
    
    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            <GlobalHeader user={user}/>
            {!isAuthenticated && <LoginModal />}
            
            <div id='appLayout'>
                <Suspense fallback={<p>Loading...</p>}>
                    <LibrarySidebar />
                </Suspense>

                <MainSection>
                    <Outlet context={{ currentSong, setCurrentSong, isPlaying, setIsPlaying, setSongsList }}/>
                </MainSection>  
            </div>

            <Player 
                currentSong={currentSong} 
                setCurrentSong={setCurrentSong} 
                isPlaying={isPlaying} 
                setIsPlaying={setIsPlaying} 
                nextSong={nextSong} 
                previousSong={previousSong} 
                randomSong={randomSong} 
            />  
        </>

    );
}