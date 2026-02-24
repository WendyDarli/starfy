import getUserLibrary from "../../api/getUserLibrary";
import { useSuspenseQuery } from "@tanstack/react-query";
import useAuth from '../../hooks/query/useAuth';

function useLibrary() {
    const { data: user, isLoading, isError } = useAuth();
    const enabled = !!user && !isLoading && !isError;
    
    return useSuspenseQuery({
        queryKey: ['library'],
        queryFn: getUserLibrary,
        refetchOnWindowFocus: false,
        enabled
    });
}

export default useLibrary;