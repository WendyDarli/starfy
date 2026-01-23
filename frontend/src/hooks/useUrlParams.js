import { useMatch, useParams } from 'react-router';
    
export default function useUrlParams(){
    const { id } = useParams();
    const types = 
        useMatch('/collection/:id')?.pathnameBase && 'collection' ||
        useMatch('/playlist/:id')?.pathnameBase && 'playlist' ||
        useMatch('/artist/:id')?.pathnameBase && 'artist' ||
        useMatch('/album/:id')?.pathnameBase && 'album' ||
        useMatch('/song/:id')?.pathnameBase && 'song' ||
        useMatch('/episode/:id')?.pathnameBase && 'episode' ||
        useMatch('/show/:id')?.pathnameBase && 'show';


    
    return { id, type: types };
}



