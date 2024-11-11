// src/App.js
import React from 'react';
import SpotifyTrack from './SpotifyTrack';
import SpotifyLyrics from './SpotifyLyrics';

const App = () => {
  return (
    <div className="App">
      <h1>Spotify Track Info</h1>
      {/* Replace 'trackId' with an actual Spotify track ID */}
      <SpotifyTrack/>
      {/* <SpotifyLyrics /> */}
    </div>
  );
};

export default App;
