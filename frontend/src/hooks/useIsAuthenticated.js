import { useState, useEffect } from 'react';

// Hook to check user authentication status based on access token
export default function useIsAuthenticated(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    useEffect(() => {
        fetch('http://127.0.0.1:3000/isAuthenticated', {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => {
                if (!res.ok) throw new Error('Not authenticated');
                return res.json();
            })
        .then(data => setIsAuthenticated(true))
        .catch(err => setIsAuthenticated(false));

    }, []);
 
    return isAuthenticated;
};
