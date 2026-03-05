import './SongVolumeControls.css';
import {useState, useRef, useEffect} from 'react';
import { useSong } from '../../../context/songContext';

function SongVolumeControls(){
    const [isHoldingDown, setIsHoldingDown] = useState(false);
    const inputRef = useRef(null);

    const {
        volumeLevel,
        handleVolumeChange,
        muteSong
    } = useSong();


    function updateVolumePaint(){
        if(!inputRef.current) return;

        const color = isHoldingDown ? '#A2C7FF' : '#FFFFFF';
        const percent = volumeLevel * 100;
        inputRef.current.style.background =`linear-gradient(to right, 
            ${color} ${percent}%, 
            #2A2A2A ${percent}%`;  
    }
    useEffect(updateVolumePaint, [volumeLevel, isHoldingDown]);

    const handleHoverPaint ={
        onMouseDown: () => setIsHoldingDown(true),
        onMouseEnter: () => setIsHoldingDown(true),
        onMouseUp: () => setIsHoldingDown(false),
        onMouseLeave: () => setIsHoldingDown(false),
    }

    function getVolumeIconClass() {
        if(volumeLevel == 0) {
        return 'muteVolume';

        } else if(volumeLevel > 0 && volumeLevel <= 0.5) {
        return 'lowVolume';

        } else {
        return 'highVolume';
        } 
    };
    
    return(
        <>
            <button 
                aria-label='mute song' 
                className={`noBgBttn ${getVolumeIconClass(volumeLevel)}`} 
                onClick={muteSong}
            />
                
            <input 
                aria-label='change volume' 
                type='range'
                ref={inputRef}
                className='volumeControl' 
                min={0} max={1} step={0.1} value={volumeLevel} 
                onChange={handleVolumeChange}
                {...handleHoverPaint}
            />
        </>
    );
};

export default SongVolumeControls;