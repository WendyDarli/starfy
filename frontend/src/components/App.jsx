import { Toaster } from "react-hot-toast";

// COMPONENTS
import LoadingScreen from "./LoadingScreen/LoadingScreen.jsx";
import GlobalHeader from './GlobalHeader/GlobalHeader.jsx';
import LibrarySidebar from './LibrarySidebar/LibrarySidebar.jsx';
import MainSection from './MainSection/MainSection.jsx';
import Player from './Player/PlayerFooter.jsx';
import LoginModal from './LoginModal/LoginModal.jsx';

// HOOKS
import { Suspense } from 'react';
import useAuth from '../hooks/query/useAuth.js';
import { Outlet } from 'react-router';

// CONTEXT
import { SongProvider } from '../context/songContext.jsx';

export default function App() {
    const { data: user, isLoading } = useAuth();

    const isAuthenticated = !!user;
        
    if(isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            <SongProvider>
                <Toaster position='bottom-center' 
                containerStyle={{
                    bottom: 100
                }}/>
                {!isAuthenticated && <LoginModal />}
                
                {isAuthenticated && (
                    <>
                        <LoadingScreen onFinish={() => setShowLoading(false)} />
                        <GlobalHeader user={user}/>
                        <div id='appLayout'>
                            <Suspense fallback={<p>Loading...</p>}>
                                <LibrarySidebar />
                            </Suspense>

                            <MainSection>
                                <Outlet />
                            </MainSection>  
                        </div>

                        <Player /> 
                    </>
                )}
            </SongProvider>
        </>

    );
}