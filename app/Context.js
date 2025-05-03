"use client"
import { createContext, useContext, useState, useRef, useEffect } from "react";

const RadioContext = createContext();

export const useRadio = () => useContext(RadioContext);

export const RadioProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio in a useEffect to ensure it runs only in the client
  useEffect(() => {
    audioRef.current = new Audio();
  }, []);

  const selectTrack = (track) => {
    if (!audioRef.current) return;
    setCurrentTrack(track);
    audioRef.current.src = track.src;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const stopRadio = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <RadioContext.Provider value={{ currentTrack, isPlaying, selectTrack, stopRadio }}>
      {children}
    </RadioContext.Provider>
  );
};
