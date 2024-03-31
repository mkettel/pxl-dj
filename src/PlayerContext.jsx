import { createContext, useState } from 'react';

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
    console.log('toggled', isPlaying);
  };

  const setPlayingState = (state) => {
    setIsPlaying(state);
  };

  return (
    <PlayerContext.Provider value={{ isPlaying, togglePlay, setPlayingState }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContext;