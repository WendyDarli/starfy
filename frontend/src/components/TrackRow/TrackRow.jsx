import './TrackRow.css';

function TrackRow({ item, index, activeId, handleSongClick, headerImages }) {
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

  const media = item.track ?? item.episode ?? item;
  const albumOrShow = media.album ?? media.show ?? item;
  const imageUrl =
    albumOrShow.images?.[0]?.url ?? headerImages?.[0]?.url ?? null;

  const artists =
    media.artists ??
    (media.show ? [{ id: media.show.id, name: media.show.name }] : []);

  const showAlbum =
    activeId.type === 'playlist' || activeId.type === 'tracks';

  return (
    <div className="songContainer">
      <p>{index + 1}</p>

      <div className="songNameContainer">
        <img src={imageUrl} className="songImg" alt="" />

        <div>
          <a
            className="whiteLink"
            onClick={() => handleSongClick('playlist', media.id, 'song')}
          >
            {media.name}
          </a>

          <span className="songArtists">
            {artists.map((a, i) => (
              <span key={a.id}>
                <a onClick={() => handleSongClick('playlist', a.id, 'artist')}>
                  {a.name}
                </a>
                {i < artists.length - 1 && ', '}
              </span>
            ))}
          </span>
        </div>
      </div>

      {showAlbum && (
        <a onClick={() => handleSongClick('playlist', albumOrShow.id, 'album')}>
          {albumOrShow.name}
        </a>
      )}

      <p>{formatDate(item.added_at)}</p>
      <p>{formatDuration(media.duration_ms)}</p>
    </div>
  );
};
export default TrackRow;