import { useState, useEffect } from 'react';

// Hook to check user authentication status based on access token
export default function useIsAuthenticated(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = new URLSearchParams(window.location.search).get('access_token');

        if(token){
            localStorage.setItem('access_token', token);
            setIsAuthenticated(true);
            window.history.replaceState({}, document.title, "/");
            return;
        }

        setIsAuthenticated(!!localStorage.getItem('access_token'));

    }, []) 
    
    return isAuthenticated;
};
