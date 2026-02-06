import './TrackRow.css';
import { useState } from 'react';
import { Link } from 'react-router';
import { useOutletContext } from 'react-router';
import useUrlParams from '../../hooks/useUrlParams.js'

import getColumns from '../../utils/uiColumns';
import formatDuration from '../../utils/formatDuration.js'

import equalizer from '../../assets/blueIcons/equalizer.gif';
import playIcon from '../../assets/whiteIcons/play-arrow.svg';
import pauseIcon from '../../assets/whiteIcons/pause.svg';

function TrackRow({ item, index }) {
  const isEpisode = item.type === 'episode';
  const { currentSong, setCurrentSong, isPlaying, setIsPlaying } = useOutletContext();
  const { id, type } = useUrlParams();
  const columns = getColumns(id, type);
  const [ isHovered, setIsHovered ] = useState(false);
  let isThisTheActiveSong = currentSong?.id === item?.id && currentSong?.index === index;

  const currentSongObj = {
    artistsName: item.artists,
    songName: item.name,
    id: item.id,
    img: item.imageUrl,
    duration_ms: item.duration_ms,
    albumName: item.albumOrShow?.name,
    external_ids: item.external_ids?.isrc || '',
    index: index
  };

  function formatDate(dateString){
      if(!dateString) return '';
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
  };

  function handlePlayClick() {
    if (!currentSong || currentSong.id !== item.id) {
      setCurrentSong(currentSongObj);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    };
  }

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
    return <p className={`trackNumber ${isThisTheActiveSong ? 'active' : ''}`}>{index + 1}</p>;
  };

  return (
    <div className="songContainer">
      
      <button className='trackRowPlayBttn'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {setCurrentSong(currentSongObj); handlePlayClick()}}>
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
      <p>{formatDuration(item.duration_ms)}</p>
    </div>
  );
};
export default TrackRow;