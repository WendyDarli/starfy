import getPlaylist from "../../api/getPlaylist.js";
import { useQuery } from "@tanstack/react-query";

function useLikedSongs() {
    return useQuery({
        queryKey: ['likedSongs'],
        queryFn: () => getPlaylist('collection', 'tracks'),
        refetchOnWindowFocus: false,
    });
}

export default useLikedSongs;