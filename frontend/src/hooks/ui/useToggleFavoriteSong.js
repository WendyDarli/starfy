import useFavoriteSongMutation from "../query/useFavoriteSongMutation";

function useToggleFavoriteSong( isFavorite, songId){
  const { favorite, unfavorite } = useFavoriteSongMutation();
  const isLoading = favorite.isPending || unfavorite.isPending;
  
  function handleFavoriteToggle(){
    if(!songId) return;

     if(isFavorite){
            unfavorite.mutate({ id: songId });
        } else {
            favorite.mutate({ id: songId });
        }
  };
  return {handleFavoriteToggle, isLoading};

};

export default useToggleFavoriteSong

