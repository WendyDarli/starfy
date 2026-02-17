import './GlobalHeader.css';
import starfyIcon from '../../assets/whiteIcons/starfy.svg';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'

function GlobalHeader ({ user }){
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [searchValue, setSearchValue] = useState('');

    const buttonStyle = {
    backgroundImage: `url(${user?.images?.[0]?.url})`
    }

    //if user leaves search page clean search input
    useEffect(() => {
        if (!pathname.startsWith('/search')) {
                setSearchValue('');
            }  
    }, [pathname]);

    return (
        <div className='headerContainer'>
            <img id='starfyIcon' src={starfyIcon} alt='starfy Icon'></img>
            <div id='middleHeader'>
                <Link className='circularBttn homeBttn'  to='/'></Link>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (!searchValue?.trim()) return;
                        navigate(`/search/${searchValue}`)
                    }}>
                    <button id='searchBttn' type='submit'></button>
                    <input  
                        id='searchInput' 
                        type='text' 
                        placeholder='What do you want to play?'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    ></input>                  
                </form>                
            </div>

            <Link className='profileBttn' style={buttonStyle} to='/profile'></Link>
        </div>
    )
};

export default GlobalHeader;