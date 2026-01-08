import './TracksHeader.css';
import clockIcon from '../../assets/grayIcons/clock.svg';

function TracksHeader({ showAlbum = true, showDateAdded = true }) {
    return (
        <div className="songsHeader"> 
            <p>#</p>
            <p>title</p>
            {showAlbum && <p>Album</p>}
            {showDateAdded && <p>Date added</p>}
            <img className="clockIcon" src={clockIcon}/>
        </div>
    );
}

export default TracksHeader;