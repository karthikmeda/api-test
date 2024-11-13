// src/App.js
import React from 'react';
//import SpotifyMusic from './SpotifyMusic';
import SongList from './SongList';
//import SpotifyTrack from './SpotifyTrack';
//import SpotifyLyrics from './SpotifyLyrics';

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
