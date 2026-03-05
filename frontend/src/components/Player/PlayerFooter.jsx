import './PlayerFooter.css';

// components
import SongInfo from './SongInfo/SongInfo.jsx';
import SongControls from './SongControls/SongControls.jsx';
import SongProgress from './SongProgress/SongProgress.jsx';
import LyricsButon from './LyricsButton/LyricsButton.jsx'
import SongVolumeControls from './SongVolumeControls/SongVolumeControls.jsx';
import AudioPlayer from './AudioPlayer/AudioPlayer.jsx';

function PlayerFooter() {

  return (
    <div className='footerContainer'>
      <SongInfo />
      <AudioPlayer />

      <div id='songControls'>
        <SongControls />
        <SongProgress />
      </div>

      <div id='extraControls'>
        <LyricsButon />
        <SongVolumeControls />
      </div>
    </div>
  );
}

export default PlayerFooter;