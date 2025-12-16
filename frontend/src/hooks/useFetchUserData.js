import { useEffect, useState } from 'react';

export default function useFetchUserData(){
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        fetch('https://api.spotify.com/v1/me', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(res => res.json())
        .then(user => {
            setUser(user);
        });
    }, []);

    return user;

}

