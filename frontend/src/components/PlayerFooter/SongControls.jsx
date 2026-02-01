function SongControls({ audio, isPlaying, setIsPlaying }){

    function handlePlayPause(){
        if (!audio) return;
        setIsPlaying(!isPlaying);  
    };
    
    return(
        <div id='customPlayer'>
          <button aria-label='shuffle' className='shuffle noBgBttn'></button>
          <button aria-label='previous song' className='prev noBgBttn'></button>
          <button aria-label='play or pause song' className={`circularBttn ${isPlaying ? 'pause' : 'play'}`} onClick={handlePlayPause}></button>
          <button aria-label='next song' className='next noBgBttn'></button>
          <button aria-label='repeat Song' className='repeat noBgBttn'></button>
        </div>


    );
};

export default SongControls;