import './SongControls.css';
import { useSong } from '../../../context/songContext';

function SongControls() {
    
    const { 
        isPlaying, 
        audioRef, 

        handlePlayPause, 
        playNext, 
        playPrevious, 
        handleOnRepeat, 
        handleShuffle, 
        settings
    } = useSong();


    const audio = audioRef?.current;

    function handlePrevSong(){
        if(playPrevious == null) {
            audio.currentTime = 0;
            return;
        }
        if(audio.currentTime <= 1){
            audio.pause();
            playPrevious();
            audio.play();
        } else {
            audio.currentTime = 0;
        }
    };
    
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
            <button disabled={playNext == null}
                aria-label='next song' 
                className='next noBgBttn'
                onClick={() => playNext()}
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