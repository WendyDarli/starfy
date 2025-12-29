// this should receive a state from bttn with playlist id
import './PlaylistDisplay.css';

function PlaylistDisplay({ activeId }){
    return(
        <div>
            <div className='playlistHeader'>
                <img src='\src\assets\jeff.jpeg' className="playlistCover"></img>
                <div>
                    <p>playlist</p>
                    <h1 className='playlistTitle' >Playlist name</h1>
                    <p>owner • 333 songs</p>
                </div>                
            </div>

            <div className='songsContainer'>
                <button className='circularBttn playPause playPausePlaylist'></button>
            
                <div>
                    <div className="songsHeader">
                        <p>#</p>
                        <p>title</p>
                        <p>Album</p>
                        <p>Date added</p>
                        <p>Dur</p>           
                    </div>
                        <hr></hr>
                    <div>
                        <div className='songContainer'>
                            <p>1</p>
                            <div className='songNameContainer'>
                                <img src='\src\assets\jeff.jpeg' className='songImg'></img>
                                <div>
                                    <a href='' className='whiteLink'>name</a>
                                    <a href=''>artist</a>
                                </div>
                            </div>
                            <a href=''>album</a>
                            <p>5 days ago</p>
                            <p>3:90</p>
                        </div>

                        <div className='songContainer'>
                            <p>2</p>
                            <div className='songNameContainer'>
                                <img src='\src\assets\jeff.jpeg' className='songImg'></img>
                                <div>
                                    <a href='' className='whiteLink'>name</a>
                                    <a href=''>artist</a>
                                </div>
                            </div>
                            <a href=''>album</a>
                            <p>5 days ago</p>
                            <p>3:90</p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistDisplay;