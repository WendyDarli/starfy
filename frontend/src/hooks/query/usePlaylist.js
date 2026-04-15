import getPlaylist from "../../api/getPlaylist.js";
import { useQuery } from "@tanstack/react-query";
import useUrlParams from '../utils/useUrlParams.js';


function usePlaylist(){
    const { id, type } = useUrlParams();

    return useQuery({
        queryKey: ['playlist', id],
        queryFn: () => getPlaylist(type, id),
        enabled: !!id && !!type,
        refetchOnWindowFocus: false,
        refetchInterval: 1000,
    });
};

export default usePlaylist;