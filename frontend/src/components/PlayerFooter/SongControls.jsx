function SongControls({ audio, isPlaying, setIsPlaying, settings, toggleSetting, setCurrentSong, nextSong, previousSong }) {

    function handlePlayPause(){
        if (!audio) return;
        setIsPlaying(!isPlaying);  
    };

    function handlePrevSong(){
        if(previousSong == null) {
            audio.currentTime = 0;
            return;
        }
        if(audio.currentTime <= 1){
            audio.pause();
            setCurrentSong(previousSong);
        } else {
            audio.currentTime = 0;
        }
    };

    function handleNextSong(){
        audio.pause();
        setCurrentSong(nextSong);
    };
    
    return(
        <div id='customPlayer'>
            <button aria-label='shuffle' className='shuffle noBgBttn'></button>
            <button 
                aria-label='previous song' 
                className='prev noBgBttn'
                onClick={handlePrevSong}
            />
            <button 
                aria-label='play or pause song' 
                className={`circularBttn footerPlay ${isPlaying ? 'pause' : 'play'}`} 
                onClick={handlePlayPause}
            />
            <button disabled={nextSong == null}
                aria-label='next song' 
                className='next noBgBttn'
                onClick={handleNextSong}
            />
            <button 
                aria-label='repeat Song' 
                className={`repeat ${settings.isOnRepeat ? 'active' : ''} noBgBttn` }
                onClick={() => {toggleSetting('isOnRepeat')}}
            />
            </div>
    );
};

export default SongControls;