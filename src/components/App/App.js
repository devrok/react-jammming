import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import TrackItem from "../helpers/TrackItem.js";

class App extends Component {
  constructor(props) {
    super(props);

    const mySearchResults = [
      new TrackItem(1, "Song 1", "Artist 1", "Album 1"),
      new TrackItem(2, "Song 2", "Artist 2", "Album 2"),
    ];

    const myPlaylistName = "my playlist";
    const myPlaylistTracks = [
      new TrackItem(3, "Song 3", "Artist 3", "Album 3"),
      new TrackItem(4, "Song 4", "Artist 4", "Album 4"),
    ];

    this.state = { searchResults: mySearchResults,
      playlistName: myPlaylistName,
      playlistTracks: myPlaylistTracks
    };

    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    const tracks = this.state.playlistTracks;

    if (tracks.some(trackVal => trackVal.id === track.id)) {
      return;
    }

    tracks.push(track);
    this.setState({playlistTracks: track});
  }

  render() {
    let results = this.state.searchResults;
    console.log(results);

    // the component for playlist has to be remove actually
    // because if not correct initialized it leads to an error;
    // 1hour of my life! => AAAAAAH!
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

// <div>
//   <h1>Ja<span className="highlight">mmm</span>ing</h1>
//   <div className="App">
//     <SearchBar />
//     <div className="App-playlist">
//       <SearchResults searchResults={this.state.searchResults} />
//       <Playlist />
//     </div>
//   </div>
// </div>


// <div>
//   <h1>Ja<span class="highlight">mmm</span>ing</h1>
//   <div class="App">
//     <!-- Add a SearchBar component -->
//     <div class="App-playlist">
//     <!-- Add a SearchResults component -->
//     <!-- Add a Playlist component -->
//     </div>
//   </div>
// </div>
