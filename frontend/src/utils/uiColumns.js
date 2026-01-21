const UI_COLUMNS_BY_TYPE = {
  playlist: ['album', 'date_added'],
  artist: ['popular'],
  album: [],
  song: [],
  episode: [],
  show: ['popular'],
  collection_tracks: ['album', 'date_added'],
  collection_episodes: ['date_added'],
  tracks: ['album', 'date_added'],
  episodes: ['date_added'],
  search: ['album']
}

const getColumns = (id, type) => {
  return id === 'tracks' || id === 'episodes'
    ? UI_COLUMNS_BY_TYPE[id]
    : UI_COLUMNS_BY_TYPE[type];
};

export default getColumns;