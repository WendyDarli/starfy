import './TracksHeader.css';
import clockIcon from '../../assets/grayIcons/clock.svg';


function TracksHeader({ tracksHeader, type }) {
    return (
        <div className="songsHeader"> 
            {type === 'artist' 
                ? <p>Popular</p>
                : <>
                    <p>#</p>
                    <p>title</p>
                    {tracksHeader?.showAlbum ? <p>Album</p> : <p></p>}
                    {tracksHeader?.showDateAdded ? <p>Date added</p> : <p></p>}
                    <img className="clockIcon" src={clockIcon}/>
                </>
            }
        </div>
    );
}

export default TracksHeader;