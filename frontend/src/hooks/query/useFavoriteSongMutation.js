    import putFavoriteSong from '../../api/putFavoriteSong';
    import deleteFavoriteSong from '../../api/deleteFavoriteSong';
    import { useMutation, useQueryClient } from '@tanstack/react-query';
    import useUrlParams from '../utils/useUrlParams';
    import { useParams } from 'react-router';

    function useToggleFavoriteSong(){
        const queryClient = useQueryClient();
        const { id: playlistId } = useUrlParams();
        const { query } = useParams();

        const favorite = useMutation({
            mutationFn: ({ id }) => putFavoriteSong(id),
            onSuccess: () => { 
                queryClient.invalidateQueries({
                queryKey: ['playlist', playlistId]
            });
                queryClient.invalidateQueries({
                    queryKey: ['searchResults', query]
            });
        }
        });

        const unfavorite = useMutation({
            mutationFn: ({ id }) => deleteFavoriteSong(id),
            onSuccess: () => { queryClient.invalidateQueries({
                queryKey: ['playlist', playlistId]
                });
             queryClient.invalidateQueries({
                queryKey: ['searchResults', query]
                });
        
            }
        });

        return { favorite, unfavorite };
    };

    export default useToggleFavoriteSong;