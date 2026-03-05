import { useQuery } from '@tanstack/react-query';
import getLyrics from '../../api/getLyrics.js';

function useLyrics(currentSongData) {

    return useQuery({
        queryKey: ['lyrics', currentSongData?.name],
        queryFn: () => getLyrics(currentSongData),
        enabled: !!currentSongData?.name,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    }); 
};

export default useLyrics;