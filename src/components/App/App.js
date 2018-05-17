import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify from "../../util/Spotify.js";

class App extends Component {
  constructor(props) {
    super(props);

    const mySearchResults = [];

    const myPlaylistName = "new playlistname";
    const myPlaylistTracks = [];

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

    if (!term) return;

    console.log("-- App.js -- search");
    console.log("Searchterm: " + term);

    Spotify.search(term).then(resultValue => {
      console.log("--- response before setState")
      console.log(resultValue);
      this.setState({searchResults: resultValue});
    });
  }

  updatePlaylistName(name) {
    console.log("-- App.js -- updatePlaylistName");
    this.setState({playlistName: name});
  }

  addTrack(track) {
    console.log("-- App.js -- addTrack: " + track.id);
    const resultTracks = this.removeFromList(track, this.state.searchResults);
    const playlistTracks = this.state.playlistTracks;
    playlistTracks.push(track);
    // if (tracks.some(trackVal => trackVal.id === track.id)) {
    //   console.log("Track already exists");
    //   return;
    // }

    this.setState({playlistTracks: playlistTracks, searchResults: resultTracks});
  }

  removeTrack(track) {
    console.log("-- App.js -- removeTrack: " + track.id);
    const playlistTracks = this.removeFromList(track, this.state.playlistTracks);
    const resultTracks = this.state.searchResults;
    // resultTracks.splice(track.pos, 0, track);
    resultTracks.push(track);
    resultTracks.sort(function(a, b){return a.pos - b.pos});

    this.setState({playlistTracks: playlistTracks, searchResults: resultTracks});
  }

  removeFromList(track, list) {
    return list.filter(element => {
      return element.id !== track.id;
    });
  }

  savePlaylist() {
    console.log("-- App.js -- savePlaylist ");
    const trackUris = this.state.playlistTracks.map(trackValue =>{
      return trackValue.uri;
    });

    Spotify.savePlaylist(this.state.playlistName, trackUris);

    // reset playlist after save
    this.setState({
      playlistName: "new playlist",
      playlistTracks: []
    });

  }

  render() {
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
