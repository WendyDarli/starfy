import './GlobalHeader.css';
import starfyIcon from '../../assets/whiteIcons/starfy.svg';

function GlobalHeader (){
    return (
        <div className='headerContainer'>
            <img id='starfyIcon' src={starfyIcon} alt='starfy Icon'></img>
            <div id='middleHeader'>
                <button className=' circularBttn homeBttn' onClick={() => window.location.href = "/"} ></button>
                <form>
                    <button id='searchBttn' type='submit'></button>
                    <input  id='searchInput' type='text' placeholder='What do you want to play?'></input>
                    
                </form>                
            </div>

            <button>Profile</button>
        </div>
    )
};

export default GlobalHeader;