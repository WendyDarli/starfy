import './TracksHeader.css';
import clockIcon from '../../assets/grayIcons/clock.svg';
import getColumns from '../../utils/uiColumns';

function TracksHeader({ type, id }) {
    const columns = getColumns(id, type);

    return (
        <div className="songsHeader">   
            {columns.includes('popular') 
                ? <p>Popular</p>
                : <>
                    <p>#</p>
                    <p>title</p>
                    {columns.includes('album') ? <p>Album</p> : <p></p>}
                    {columns.includes('date_added') ? <p>Date added</p> : <p></p>}
                    <img className="clockIcon" src={clockIcon} />
                </>
            }
        </div>
    );
}

export default TracksHeader;