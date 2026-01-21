import { useMatch, useParams } from 'react-router';
    
const TYPES = [
    'collection',
    'playlist',
    'artist',
    'album',
    'song',
    'episode',
    'show',
    'search',
];

export default function useUrlParams(){
    const { id } = useParams();
    const type = TYPES.find(t =>
        useMatch(`/${t}/:id`)
    );
    
        return { id, type };
}



