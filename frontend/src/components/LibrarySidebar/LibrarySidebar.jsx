import './LibrarySidebar.css';
import { useState } from 'react';

function LibrarySidebar() {
    const [isExpanded, setExpanded] = useState(false);

function toggleSidebar(){
    setExpanded(prev => !prev);
    document.getElementById("appLayout").style.setProperty("--sb-width", isExpanded ? "75px" : "340px");

}

    return(
        <aside className={`sidebarContainer ${isExpanded ? 'sb-expanded' : ''}`}>
            <div id='libraryHeader'>
                <button onClick={toggleSidebar} className='sidebarOpener noBgBttn'></button>
                <p>Your Library</p>                
            </div>

            <button className='createBttn circularBttn'><span className='bttnText'>Create</span></button>
            <nav>
                <button className='playlistItem active'>
                    <img className='playlistImg' src='src\assets\jeff.jpeg'/>
                    <span className='playlistInfo'>
                        <p className='playlistName active'>Library Name</p>
                        <p className='playlistAuthor'>Library Info</p>   
                    </span>
                    
                </button>

                <button className='playlistItem'>
                    <img className='playlistImg' src='src\assets\jeff.jpeg'/>
                    <span className='playlistInfo'>
                        <p className='playlistName'>Library Name</p>
                        <p className='playlistAuthor'>Library Info</p>   
                    </span>
                    
                </button>
            </nav>
        </aside>
    )
}

export default LibrarySidebar;