function renderArtists(artists = []){
    return artists.map((a, i) => ( 
        <p key={a.id} id='songArtist'>
            {a.name}
            {i < artists.length - 1 && ', '}
        </p>  
    ));
};

export default renderArtists;