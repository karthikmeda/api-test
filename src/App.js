// src/App.js
import React from 'react';
//import SpotifyMusic from './SpotifyMusic.js';
import SongList from './SongList.js';
//import SpotifyTrack from './SpotifyTrack.js';
//import SpotifyLyrics from './SpotifyLyrics.js';

const App = () => {
  return (
    <div className="App">
      {/* <h1>Spotify Track Info</h1> */}
      {/* Replace 'trackId' with an actual Spotify track ID */}
      {/* <SpotifyTrack/> */}
      {/* <SpotifyLyrics /> */}
      {/* <SpotifyMusic></SpotifyMusic> */}
      <SongList />
    </div>
  );
};

export default App;
