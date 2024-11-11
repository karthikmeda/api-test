// App.js
import React from "react";
import "./App.css";
import axios from "axios"; // Import axios

class App extends React.Component {
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            DataisLoaded: false,
            showImage: false,
        };
    }

    // Function to fetch data from the Spotify API
    fetchSpotifyTrack = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/tracks/',
            params: {
                ids: '4WNcduiCmDNfmTEz7JvmLv'
            },
            headers: {
                'x-rapidapi-key': 'd582a15015msh2bbf42ee7acbdf6p171f4djsn6222913ef5de',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            this.setState({
                items: response.data,
                DataisLoaded: true,
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Execute fetch when the component mounts
    componentDidMount() {
        this.fetchSpotifyTrack();
    }

    // Render the component
    render() {
        const { DataisLoaded, items ,showImage} = this.state;
        if (!DataisLoaded) {
            return (
                <div>
                    <h1>Please wait some time....</h1>
                </div>
            );
        }

        // Display the track information
        return (
            <div className="App">
                <h1 className="geeks">Spotify Track Information</h1>
                {items && items.tracks && items.tracks.length > 0 && (
                    <div>
                        <h2>Track Details:</h2>
                        <p><strong>Track Name:</strong> {items.tracks[0].name}</p>
                        <p><strong>Artist:</strong> {items.tracks[0].artists[0].name}</p>
                        <p><strong>Album:</strong> {items.tracks[0].album.name}</p>
                        <audio id="audioPreview" controls style={{ display: 'none' }}>
                        <source src={items.tracks[0].preview_url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                    <button onClick={() => {
                            const audioElement = document.getElementById('audioPreview');
                            if (audioElement) {
                                audioElement.play();
                            }
                            this.setState({ showImage: true }); // Show image when button is pressed
                        }}>
                            Play Preview
                        </button>

                        {/* Image that appears when the button is clicked */}
                        {showImage && (
                            <img
                                src="https://img.lovepik.com/free-png/20211215/lovepik-song-of-love-png-image_401669880_wh1200.png"
                                alt="Song of Love"
                                style={{ marginTop: '20px', width: '300px' }}
                            />
                        )}

                    </div>
                )}
            </div>
        );
    }
}

export default App;
