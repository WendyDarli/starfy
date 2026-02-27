import './SongControls.css';

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
            audio.play();
        } else {
            audio.currentTime = 0;
        }
    };

    function handleNextSong(){
        setCurrentSong(nextSong);
    };

    function handleOnRepeat() {
        if (settings.isShufflePlaylist) {
            toggleSetting('isShufflePlaylist');
    }
        toggleSetting('isOnRepeat');
    }

    function handleShuffle() {
        if (settings.isOnRepeat) {
            toggleSetting('isOnRepeat');
        }
        toggleSetting('isShufflePlaylist');
    }
    
    return(
        <div id='customPlayer'>
            <button 
                aria-label='shuffle' 
                className={`shuffle ${settings.isShufflePlaylist ? 'active' : ''} noBgBttn`} 
                onClick={handleShuffle}
            />
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
                onClick={handleOnRepeat}
            />
            </div>
    );
};

export default SongControls;