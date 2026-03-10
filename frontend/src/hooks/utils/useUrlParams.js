import { useMatch, useParams } from 'react-router';
    
// This hook figures out what page the user is bassed on the URL params
export default function useUrlParams(){
    const { id } = useParams();
    
    const matches = {
        collection: useMatch('/collection/:id'),
        playlist: useMatch('/playlist/:id'),
        artist: useMatch('/artist/:id'),
        album: useMatch('/album/:id'),
        song: useMatch('/song/:id'),
        episode: useMatch('/episode/:id'),
        show: useMatch('/show/:id'),
    };

    const type =
        Object.entries(matches).find(([, match]) => match)?.[0] ?? null;
        
    return { id, type };
}



