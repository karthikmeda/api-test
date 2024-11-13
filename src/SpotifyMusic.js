import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SpotifyMusic() {
    const CLIENT_ID = "b174b09e83a04b26a4d3db03251215cc";
    const REDIRECT_URI = "http://localhost:3000";
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
    const RESPONSE_TYPE = "token";

    const [token, setToken] = useState(null);
    const [searchKey, setSearchKey] = useState("");
    const [artists, setArtists] = useState([]);

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

    const searchArtists = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    q: searchKey,
                    type: "artist"
                }
            });
            setArtists(data.artists.items);
        } catch (error) {
            console.error("Error fetching artists:", error);
        }
    };

    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id}>
                {artist.images.length ? (
                    <img width={"100%"} src={artist.images[0].url} alt={artist.name} />
                ) : (
                    <div>No Image</div>
                )}
                <p>{artist.name}</p>
            </div>
        ));
    };

    return (
        <div>
            <h1>Spotify Music</h1>
            {!token ? (
                <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
            ) : (
                <button onClick={logout}>Logout</button>
            )}

            {token ? (
                <form onSubmit={searchArtists}>
                    <input type='text' onChange={e => setSearchKey(e.target.value)} />
                    <button type={"submit"}>Search</button>
                </form>
            ) : (
                <h2>Please login</h2>
            )}

            {renderArtists()}
        </div>
    );
}

export default SpotifyMusic;
