import { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import PlayerContext from '../PlayerContext';
import { motion } from 'framer-motion';

export default function Overlay() {
    const { isPlaying, setPlayingState } = useContext(PlayerContext);
    const [player, setPlayer] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0); // Add this line


    const handlePlayerReady = (event) => {
        setPlayer(event.target);
        console.log('Player is ready');
    };

    const handleStateChange = (event) => {
      if (event.data === YT.PlayerState.PLAYING) {
        setPlayingState(true);
      } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
        setPlayingState(false);
        if (event.data === YT.PlayerState.ENDED) { // Add this condition
          setCurrentIndex((prevIndex) => prevIndex + 1); // Increment the index when the video ends
        }
      }
    };

    const VIDEO_ID = '2e8x3fFZP3Q';
    const vidArray = ['DAXhz9YkbWY', '2e8x3fFZP3Q']

    useEffect(() => {
      if (player) { // Add this condition
        if (isPlaying) {
          player.playVideo(); // Load the video at the current index
        } else {
          player.pauseVideo();
        }
      }
      // console.log('playing state overlay', isPlaying);
      console.log('current index', currentIndex);
    }, [player, isPlaying, currentIndex, vidArray]);


    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 1.5 } },
    };
    
    const titleVariants = {
      hidden: { y: 0, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 1.5, delay: 0.6 } },
    };
    
    const dataVariants = {
      hidden: { x: 0, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 1.5, delay: 1.0 } } ,
    };
    const dataVariants2 = {
      hidden: { x: 0, opacity: 0 },
      visible: { x: 0, opacity: 1, transition: { duration: 1.5, delay: 1.4 } } ,
    };

    return (
        <>
            <motion.div 
              className="main-container" 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              >
                <motion.h1 className="title" variants={titleVariants} >DJ REN</motion.h1>
            </motion.div>
            <motion.div 
            className="right-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            >
                <motion.div className="data" variants={dataVariants}>
                    <motion.h2 className="header">WHEN:</motion.h2>
                    <motion.p className="text">April 26th, 2024</motion.p>
                </motion.div>
                <motion.div className="data" variants={dataVariants2}>
                    <motion.h2 className="header" >WHERE:</motion.h2 >
                    <motion.p className="text">TBD</motion.p>
                </motion.div>
            </motion.div>
            <div className="video">

              <YouTube
                id='player'
                videoId={VIDEO_ID}
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