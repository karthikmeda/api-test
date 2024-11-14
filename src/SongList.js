// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// import "./SongList.css";

// function SongList() {
//     const CLIENT_ID = "b174b09e83a04b26a4d3db03251215cc";
//     const REDIRECT_URI = "http://localhost:3000";
//     const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
//     const RESPONSE_TYPE = "token";

//     const [token, setToken] = useState(null);
//     const [searchKey, setSearchKey] = useState("");
//     const [songs, setSongs] = useState([]);
//     const [lyrics, setLyrics] = useState({}); // State to store lyrics

//     useEffect(() => {
//         const hash = window.location.hash;
//         let token = window.localStorage.getItem("token");

//         if (!token && hash) {
//             try {
//                 token = hash.substring(1).split("&").find(ele => ele.startsWith("access_token")).split("=")[1];
//                 window.location.hash = "";
//                 window.localStorage.setItem("token", token);
//                 setToken(token);
//             } catch (error) {
//                 console.error("Error parsing token from hash:", error);
//             }
//         } else {
//             setToken(token);
//         }
//     }, []);

//     const logout = () => {
//         setToken(null);
//         window.localStorage.removeItem("token");
//     };

//     const searchSongs = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.get("https://api.spotify.com/v1/search", {
//                 headers: {
//                     Authorization: `Bearer ${token}`
//                 },
//                 params: {
//                     q: searchKey,
//                     type: "track",
//                     limit: 25 // You can adjust the number of results as needed
//                 }
//             });
//             setSongs(data.tracks.items);
//         } catch (error) {
//             console.error("Error fetching songs:", error);
//         }
//     };

//     const fetchLyrics = async (songName, artistName) => {
//         try {
//             const response = await axios.get(`https://api.lyrics.ovh/v1/${artistName}/${songName}`);
//             setLyrics(prevLyrics => ({
//                 ...prevLyrics,
//                 [`${songName}-${artistName}`]: response.data.lyrics || 'Lyrics not found'
//             }));
//         } catch (error) {
//             console.error("Error fetching lyrics:", error);
//         }
//     };

//     const handlePlay = (songName, artistName) => {
//         fetchLyrics(songName, artistName);
//     };

//     const renderSongs = () => {
//         return songs.map(song => (
//             <div key={song.id}>
//                 {song.album.images.length ? (
//                     <img width={"25%"} src={song.album.images[0].url} alt={song.name} />
//                 ) : (
//                     <div>No Image</div>
//                 )}
//                 <p><strong>{song.name}</strong> by {song.artists.map(artist => artist.name).join(", ")}</p>
//                 <audio
//                     controls
//                     onPlay={() => handlePlay(song.name, song.artists[0].name)}
//                 >
//                     <source src={song.preview_url} type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                 </audio>
//                 {lyrics[`${song.name}-${song.artists[0].name}`] && (
//                     <div className="lyrics">
//                         <h3>Lyrics:</h3>
//                         <p>{lyrics[`${song.name}-${song.artists[0].name}`]}</p>
//                     </div>
//                 )}
//             </div>
//         ));
//     };

//     return (
//         <div>
//             <h1>Spotify Music</h1>
//             <div className="controls-container">
                 
//                  <br></br>
//                  <br></br>
//             {token ? (
//                 <>
//                     <form onSubmit={searchSongs}>
//                         <input
//                             type="text"
//                             placeholder="Enter song or artist name..."
//                             onChange={e => setSearchKey(e.target.value)}
//                         />
//                         <input type="submit" value="Search" />
//                     </form>
//                     <button className="logout-button" onClick={logout}>Logout</button>
//                 </>
//             ) : (
//                 <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
//             )}
//         </div>

            

//             <div className="song-container">
//                 {renderSongs()}
//             </div>
//         </div>
//     );
// }

// export default SongList;


import React, { useEffect, useState } from 'react';
import "./SongList.css";

function SongList() {
    const CLIENT_ID = "b174b09e83a04b26a4d3db03251215cc";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [songs, setSongs] = useState([]);
    const [lyrics, setLyrics] = useState({});

    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");

        if (!token && hash) {
            try {
                token = hash.substring(1).split("&").find(ele => ele.startsWith("access_token")).split("=")[1];
                window.location.hash = "";
                window.localStorage.setItem("token", token);
                setToken(token);
            } catch (error) {
                console.error("Error parsing token from hash:", error);
            }
        } else {
            setToken(token);
        }
    }, []);

    const logout = () => {
        setToken(null);
        window.localStorage.removeItem("token");
    };

    const searchSongs = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchKey)}&type=track&limit=25`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setSongs(data.tracks.items);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    const fetchLyrics = async (songName, artistName) => {
        try {
            const response = await fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artistName)}/${encodeURIComponent(songName)}`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setLyrics(prevLyrics => ({
                ...prevLyrics,
                [`${songName}-${artistName}`]: data.lyrics || 'Lyrics not found'
            }));
        } catch (error) {
            console.error("Error fetching lyrics:", error);
        }
    };

    const handlePlay = (songName, artistName) => {
        fetchLyrics(songName, artistName);
    };

    const renderSongs = () => {
        return songs.map(song => (
            <div key={song.id}>
                {song.album.images.length ? (
                    <img width={"25%"} src={song.album.images[0].url} alt={song.name} />
                ) : (
                    <div>No Image</div>
                )}
                <p><strong>{song.name}</strong> by {song.artists.map(artist => artist.name).join(", ")}</p>
                <audio
                    controls
                    onPlay={() => handlePlay(song.name, song.artists[0].name)}
                >
                    <source src={song.preview_url} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                {lyrics[`${song.name}-${song.artists[0].name}`] && (
                    <div className="lyrics">
                        <h3>Lyrics:</h3>
                        <p>{lyrics[`${song.name}-${song.artists[0].name}`]}</p>
                    </div>
                )}
            </div>
        ));
    };

    return (
        <div>
            <h1>Spotify Music</h1>
            <div className="controls-container">
                {token ? (
                    <>
                        <form onSubmit={searchSongs}>
                            <input
                                type="text"
                                placeholder="Enter song or artist name..."
                                onChange={e => setSearchKey(e.target.value)}
                            />
                            <input type="submit" value="Search" />
                        </form>
                        <button className="logout-button" onClick={logout}>Logout</button>
                    </>
                ) : (
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
                )}
            </div>

            <div className="song-container">
                {renderSongs()}
            </div>
        </div>
    );
}

export default SongList;
