"use client"

// RadioContext.js
import { createContext, useContext, useState, useRef } from 'react';

const RadioContext = createContext();

export const useRadio = () => useContext(RadioContext);

export const RadioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const selectTrack = (track) => {
    setCurrentTrack(track);
    audioRef.current.src = track.src;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopRadio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <RadioContext.Provider value={{ currentTrack, isPlaying, selectTrack, stopRadio }}>
      {children}
    </RadioContext.Provider>
  );
};
