
function formatSpotifyItems(items, extra = {}){
    return items.map(item => {
        const source = item.track ?? item.episode ?? item;

        const artists = source.artists 
            ? source.artists.map(a => ({ name: a.name, id: a.id }))
            : source.show 
                ? [{ name: source.show.name, id: source.show.id }]
                : [];
        return{
            ...source,
            artists,
            added_at: item.added_at || null,
            albumOrShow: source.album ?? source.show ?? null,
            imageUrl: 
                source.images?.[0]?.url ?? 
                source.album?.images?.[0]?.url ?? 
                null,
             ...extra(item)
        }
    });
}

module.exports = formatSpotifyItems;