import getPlaylist from "../api/getPlaylist";
import { useQuery } from "@tanstack/react-query";
import useUrlParams from '../hooks/useUrlParams.js';


function usePlaylist(){
    const { id, type } = useUrlParams();

    return useQuery({
        queryKey: ['playlist', id],
        queryFn: () => getPlaylist(type, id),
        enabled: !!id && !!type, 
    });
};

export default usePlaylist;