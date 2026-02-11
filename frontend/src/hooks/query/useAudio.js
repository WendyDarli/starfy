import getAudio from "../../api/getAudioUrl";
import { useQuery } from "@tanstack/react-query";

function useAudio(isrc) {
    return useQuery({
        queryKey: ['audio', isrc],
        queryFn: () => getAudio(isrc),
        enabled: !!isrc,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    }); 
    
}

export default useAudio;