import './TrackRow.css';
import { Link } from 'react-router';
import getColumns from '../../utils/uiColumns';
import useUrlParams from '../../hooks/useUrlParams.js'

function TrackRow({ item, index }) {
  const isEpisode = item.type === 'episode';
  const { id, type } = useUrlParams();
  const columns = getColumns(id, type);
  
    function formatDate(dateString){
        if(!dateString) return '';
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };

    function formatDuration(ms){
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

  return (
    <div className="songContainer">
      <p>{index + 1}</p>

      <div className="songNameContainer">
        <img src={item.imageUrl} className="songImg" alt="" />

        <div>
          <Link to={isEpisode ? `/episode/${item.id}` : `/song/${item.id}`} className="whiteLink"> {item.name} </Link>

          <span className="songArtists">
            {item.artists.map((a, i) => (
              <span key={a.id}>
                <Link to={isEpisode ? `/show/${a.id}` : `/artist/${a.id}`}>
                  {a.name}
                  {i < item.artists.length - 1 && ', '}
                </Link>
              </span>
            ))}
          </span>
        </div>
      </div>

      {columns.includes('album')
      ? ( <Link to={`/album/${item.albumOrShow.id}`}> {item.albumOrShow.name} </Link> ) 
      : <p></p>}

      <p>{formatDate(item.added_at)}</p>
      <p>{formatDuration(item.duration_ms)}</p>
    </div>
  );
};
export default TrackRow;