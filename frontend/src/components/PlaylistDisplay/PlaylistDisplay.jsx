// this should receive a state from bttn with playlist id
function PlaylistDisplay({ activeId }){
    return(
        <div>
            <h1>Playlist</h1>
            <p>{activeId}</p>
        </div>
    )
}

export default PlaylistDisplay;