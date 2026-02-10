import { useQuery } from '@tanstack/react-query';
import getLyrics from '../../api/getLyrics.js';

function useLyrics(currentSong) {

    return useQuery({
        queryKey: ['lyrics', currentSong?.id],
        queryFn: () => getLyrics(currentSong),
        enabled: !!currentSong?.id,
    }); 
};

export default useLyrics;