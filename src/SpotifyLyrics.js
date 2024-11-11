// SpotifyLyrics.js
import React from "react";
import "./App.css"; // Ensure this points to your CSS file
import axios from "axios"; // Import axios for HTTP requests

class SpotifyLyrics extends React.Component {
    // Constructor to initialize state
    constructor(props) {
        super(props);
        this.state = {
            items: null,
            DataisLoaded: false,
        };
    }

    // Function to fetch lyrics from the API
    fetchLyrics = async () => {
        const options = {
            method: 'GET',
            url: 'https://spotify23.p.rapidapi.com/track_lyrics/',
            params: {
                id: '1brwdYwjltrJo7WHpIvbYt' // Ensure this matches what the API expects
            },
            headers: {
                'x-rapidapi-key': 'd582a15015msh2bbf42ee7acbdf6p171f4djsn6222913ef5de',
                'x-rapidapi-host': 'spotify23.p.rapidapi.com'
            }
        };

        try {
            // Make the API request
            const response = await axios.request(options);
            console.log('Full response:', response.data); // Log the full response for inspection

            // Update the state if response structure is correct
            if (response.data && response.data.lyrics) {
                this.setState({
                    items: response.data,
                    DataisLoaded: true,
                });
            } else {
                console.log('No lyrics found in the response.');
                this.setState({ DataisLoaded: true });
            }
        } catch (error) {
            console.error('Error fetching data:', error.message);

            // Log additional error details if available
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            }
            this.setState({ DataisLoaded: true });
        }
    };

    // Lifecycle method to call the function after the component mounts
    componentDidMount() {
        this.fetchLyrics();
    }

    // Render the component
    render() {
        const { DataisLoaded, items } = this.state;
        if (!DataisLoaded) {
            return (
                <div>
                    <h1>Please wait some time....</h1>
                </div>
            );
        }

        // Display the Lyrics information
        return (
            <div className="App">
                <h1 className="geeks">Spotify Track Information</h1>
                {items && items.lyrics && items.lyrics.lines ? (
                    <div className="container">
                        {items.lyrics.lines.map((line, index) => (
                            <p className="item" key={index}>{line.words}</p>
                        ))}
                    </div>
                ) : (
                    <div><h2>Lyrics not found.</h2></div>
                )}
            </div>
        );
    }
}

export default SpotifyLyrics;
