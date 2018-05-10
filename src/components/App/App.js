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
      new TrackItem(1, "Song 1", "Artist 1", "Album 1", "uri"),
      new TrackItem(2, "Song 2", "Artist 2", "Album 2", "uri"),
    ];

    const myPlaylistName = "my playlist";
    const myPlaylistTracks = [
      new TrackItem(1, "Song 1", "Artist 1", "Album 1", "uri"),
      new TrackItem(3, "Song 3", "Artist 3", "Album 3", "uri"),
      new TrackItem(4, "Song 4", "Artist 4", "Album 4", "uri"),
    ];

    this.state = { searchResults: mySearchResults,
      playlistName: myPlaylistName,
      playlistTracks: myPlaylistTracks
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    console.log("-- App.js -- search");
    console.log("Searchterm: " + term);
  }

  updatePlaylistName(name) {
    console.log("-- App.js -- updatePlaylistName");
    this.setState({playlistName: name});
  }

  addTrack(track) {
    console.log("-- App.js -- addTrack: " + track.id);
    const tracks = this.state.playlistTracks;
    if (tracks.some(trackVal => trackVal.id === track.id)) {
      console.log("Track already exists");
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    console.log("-- App.js -- removeTrack: " + track.id);
    const tracks = this.state.playlistTracks.filter(element => {
      return element.id !== track.id;
    });
    this.setState({playlistTracks: tracks});
  }

  savePlaylist() {
    console.log("-- App.js -- savePlaylist ");
    const trackURIs = this.state.playlistTracks.map(trackValue =>{
      return trackValue.uri;
    })
  }

  render() {
    const results = this.state.searchResults;
    console.log(results);

    // the component for playlist has to be remove actually
    // because if not correct initialized it leads to an error;
    // 1hour of my life! => AAAAAAH!
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search.bind(this)}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}
              onAdd={this.addTrack.bind(this)}/>
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack.bind(this)}
              onNameChange={this.updatePlaylistName.bind(this)}
              onSave={this.savePlaylist.bind(this)}/>
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
