import './TrackRow.css';
import toast from "react-hot-toast";
import { useState } from 'react';
import { Link } from 'react-router';
import { useSong } from '../../context/songContext.jsx';
import useUrlParams from '../../hooks/utils/useUrlParams.js'
import useToggleFavoriteSong from '../../hooks/ui/useToggleFavoriteSong.js';

import getColumns from '../../utils/uiColumns';
import formatDuration from '../../utils/formatDuration.js'

import equalizer from '../../assets/blueIcons/equalizer.gif';
import playIcon from '../../assets/whiteIcons/play-arrow.svg';
import pauseIcon from '../../assets/whiteIcons/pause.svg';

function TrackRow({ item, index, source }) {

    const {
      currentSongRef,
      setCurrentSongRef,
      isPlaying,
      setIsPlaying,
  } = useSong();


  const isEpisode = item.type === 'episode';
  const { id, type } = useUrlParams();
  const columns = getColumns(id, type);
  const [ isHovered, setIsHovered ] = useState(false);
  let isThisTheActiveSong =
    currentSongRef?.id === item?.id &&
    currentSongRef?.sourceId === source?.id;

  // Toggle favorite and show toast
  const {handleFavoriteToggle, isLoading} = useToggleFavoriteSong( item.isFavorite, item.id );

    function handleLiked(){
        const result = handleFavoriteToggle();

        if(result === 'added'){
            toast.success('Added to favorites');
        }
        if(result === 'removed'){
            toast('Removed from favorites');
        }
    }

  // Disable like and play bttn for episodes/shows
  const isNonPlayableContent = () =>
    (type === 'collection' && id === 'episodes') ||
    type === 'show' ||
    type === 'episode';


  function formatDate(dateString){
      if(!dateString) return '';
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
  };

  function handlePlayClick() {
    if (!currentSongRef || !isThisTheActiveSong) {
      setCurrentSongRef({
        source: source.type,
        sourceId: source.id,
        id: item.id,
      });
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    };
  };


  function handleIconChange(){
    if (isThisTheActiveSong && isPlaying && isHovered) {
      return <img src={pauseIcon} alt='pause' />;
    }
    if (isThisTheActiveSong && isPlaying) {
      return <img src={equalizer} alt='playing' className='rowPlayIcon'/>;
    } 
    if (isHovered) {
      return <img src={playIcon} alt='play' />;
    }
    if (isNonPlayableContent) {
      return <img src={playIcon} alt='play' />;
    }
    return <p className={`trackNumber ${isThisTheActiveSong ? 'active' : ''}`}>{index + 1}</p>;
  };

  return (
    <div className="songContainer">
      
      <button className='trackRowPlayBttn'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {handlePlayClick()}}
        disabled={isNonPlayableContent()}>
        {handleIconChange()}
      </button>

      <div className="songNameContainer">
        <img src={item.imageUrl} className="songImg" alt="" />

        <div>
          <Link to={isEpisode ? `/episode/${item.id}` : `/song/${item.id}`} className={`whiteLink ${isThisTheActiveSong ? 'active' : ''}`}> {item.name} </Link>

          <span className="songArtists">
            {item.artists.map((a, i) => (
              <span key={a.id}>
                <Link to={isEpisode ? `/show/${a.id}` : `/artist/${a.id}`} className="grayLink">
                  {a.name}
                  {i < item.artists.length - 1 && ', '}
                </Link>
              </span>
            ))}
          </span>
        </div>
      </div>

      {columns?.includes('album')
      ? ( <Link to={`/album/${item.albumOrShow?.id}`} className="grayLink"> {item.albumOrShow?.name} </Link> ) 
      : <p></p>}
      <p>{formatDate(item.added_at)}</p>
      <button
        className={`noBgBttn ${item?.isFavorite ? 'likedBttn' : 'likeBttn'}`}
        onClick={() => handleLiked()}
        disabled={isLoading || isNonPlayableContent()}
      />
      <p>{formatDuration(item.duration_ms)}</p>
    </div>
  );
};

export default TrackRow;