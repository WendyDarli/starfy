import { useQuery } from '@tanstack/react-query';
import getLyrics from '../../api/getLyrics.js';

function useLyrics(nowPlaying) {

    return useQuery({
        queryKey: ['lyrics', nowPlaying?.name],
        queryFn: () => getLyrics(nowPlaying),
        enabled: !!nowPlaying?.name,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    }); 
};

export default useLyrics;