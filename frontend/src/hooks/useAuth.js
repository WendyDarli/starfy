import { useState, useEffect } from 'react';

// Hook that fetches user data from backend and updates isAuthenticated and user state
export default function useAuth(){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    
    useEffect(() => {
        fetch('http://127.0.0.1:3000/isAuthenticated', {
            method: 'GET',
            credentials: 'include',
        })
        .then(res => {
            if (!res.ok) throw new Error('Not authenticated');
            return res.json();
        })
        .then(data => {
            setIsAuthenticated(true);
            setUser(data);
        })
        .catch(err => {
            setIsAuthenticated(false);
            console.log(err);
        });

    }, []);
 
    return { isAuthenticated, user };
};
