import {useState, useRef, useEffect} from 'react';
function SongVolumeControls({ audio }){
    const [volumeLevel, setVolumeLevel] = useState(0.5);

    const previousVolume = useRef(volumeLevel); //remember value before mute

    useEffect(() => {
        if(!audio) return;
        audio.volume = volumeLevel;

    }, [volumeLevel]);



    function handleVolumeChange(e) {
        setVolumeLevel(parseFloat(e.target.value));
    };

    function muteSong() {
        if(!audio) return;
        if(volumeLevel > 0) {
            previousVolume.current = volumeLevel;
            setVolumeLevel(0);
        } else {
            setVolumeLevel(previousVolume.current);
        }
    };

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
                className='volumeControl' 
                min={0} max={1} step={0.1} value={volumeLevel} 
                onChange={handleVolumeChange}
            />
        </>
    );
};

export default SongVolumeControls;