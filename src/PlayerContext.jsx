import { createContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState); // this will toggle the state between true and false
    console.log('playing state context', !isPlaying); // logging the current state
  };

  const setPlayingState = (state) => {
    setIsPlaying(state);
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
    console.log('modal state context', !isModalOpen);
   };

  return (
    <PlayerContext.Provider value={{ isPlaying, togglePlay, setPlayingState, isModalOpen, toggleModal, setIsModalOpen }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;