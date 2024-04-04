import { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import PlayerContext from '../PlayerContext';

export default function Overlay() {
    const { isPlaying, setPlayingState } = useContext(PlayerContext);
    const [player, setPlayer] = useState(null);

    const handlePlayerReady = (event) => {
        setPlayer(event.target);
        console.log('Player is ready');
    };

    const handleStateChange = (event) => {
        if (event.data === YT.PlayerState.PLAYING) {
          setPlayingState(true);
        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
          setPlayingState(false);
        }
      };

    const VIDEO_ID = '2e8x3fFZP3Q';

    useEffect(() => {
        if (player) {
          if (isPlaying) {
            player.playVideo();
          } else {
            player.pauseVideo();
          }
        }
        console.log('playing state overlay', isPlaying);
      }, [player, isPlaying]);

    return (
        <>
            <div className="main-container">
                <h1 className="title">DJ REN</h1>
            </div>
            <div className="right-container">
                <div className="data">
                    <h2 className="header">WHEN:</h2>
                    <p className="text">April 26th, 2024</p>
                </div>
                <div className="data">
                    <h2 className="header">WHERE:</h2>
                    <p className="text">160 W 75th St. Apt, 2B</p>
                </div>
            </div>
            <div className="video">

            <YouTube
                id='player'
                videoId="2e8x3fFZP3Q"
                onReady={handlePlayerReady}
                onStateChange={handleStateChange}
                onPlay={() => console.log('Playing')}
                onError={(e) => console.log('Error', e)}
                opts={{
                    playerVars: {
                        
                        autoplay: 0,
                        controls: 0,
                        disablekb: 1, 
                        modestbranding: 1,
                        rel: 0, 
                        showinfo: 0,
                    },
                }}
                
                />
            </div>
        </>
    );
}