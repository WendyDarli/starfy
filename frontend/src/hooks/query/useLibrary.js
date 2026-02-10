import getUserLibrary from "../../api/getUserLibrary";
import { useSuspenseQuery } from "@tanstack/react-query";

function useLibrary() {
    return useSuspenseQuery({
        queryKey: ['library'],
        queryFn: getUserLibrary,
        refetchOnWindowFocus: false,
    });
}

export default useLibrary;