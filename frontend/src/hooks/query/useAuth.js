import getUser from '../../api/getUser.js';
import { useQuery } from '@tanstack/react-query';

function useAuth() {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        retry: false,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });
};

export default useAuth;