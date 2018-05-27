import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Spotify, {QUERYLIMIT} from "../../util/Spotify.js";
import PagingItem from "../helpers/PagingItem.js";

class App extends Component {
  constructor(props) {
    super(props);

    const mySearchResults = [];
    const mySearchResultItem = new PagingItem([], "", "", 0, 0, 0);
    const myPlaylistName = "new playlistname";
    const myPlaylistTracks = [];

    this.state = { searchResults: mySearchResults,
      searchResultItem: mySearchResultItem,
      playlistName: myPlaylistName,
      playlistTracks: myPlaylistTracks
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.loadPreviousPage = this.loadPreviousPage.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.stopTrack = this.stopTrack.bind(this);
  }

  componentDidMount() {
    console.log("--- App.js mounted ---");
    Spotify.init();
  }

  search(term) {
    if (!term) return;

    console.log("-- App.js -- search");
    console.log("Searchterm: " + term);

    Spotify.searchByTerm(term).then(resultValue => {
      this.filterResultAndSetState(resultValue);
    });
  }

  filterResultItem(resultItem, playlistTrackIds) {
    return new PagingItem(this.filterResultValue(resultItem.items, playlistTrackIds),
      resultItem.previous,
      resultItem.next,
      resultItem.offset,
      resultItem.total,
      QUERYLIMIT
    );
  }

  filterResultValue(resultValue, playlistIds) {
    return resultValue.filter(resultItem => {
      return !playlistIds.some(playlistId => playlistId === resultItem.id);
    });
  }

  updatePlaylistName(name) {
    console.log("-- App.js -- updatePlaylistName");
    this.setState({playlistName: name});
  }

  addTrack(track) {
    console.log("-- App.js -- addTrack: " + track.id);
    track.alreadyInPlaylist = true;

    const playlistTracks = this.state.playlistTracks;
    playlistTracks.push(track);

    this.setState({playlistTracks: playlistTracks});
  }

  removeTrack(track) {
    console.log("-- App.js -- removeTrack: " + track.id);
    track.alreadyInPlaylist = false;

    const playlistTracks = this.removeFromList(track, this.state.playlistTracks);

    this.setState({playlistTracks: playlistTracks});
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

  loadPreviousPage(previousPageUri) {
    console.log("--- Previous page: " + previousPageUri);
    if (!previousPageUri) return;
    Spotify.searchByUri(previousPageUri).then(resultValue => {
        this.filterResultAndSetState(resultValue);
    });
  }

  loadNextPage(nextPageUri) {
    console.log("--- Next page: " + nextPageUri);
    if (!nextPageUri) return;
    Spotify.searchByUri(nextPageUri).then(resultValue => {
      this.filterResultAndSetState(resultValue);
    });
  }

  filterResultAndSetState(resultValue) {
    console.log("--- response before setState")
    console.log(resultValue);

    const playlistTrackIds = this.state.playlistTracks.length === 0
      ? []
      : this.state.playlistTracks.map(track => track.id);

    const filteredResultItem = this.filterResultItem(resultValue, playlistTrackIds);

    this.setState({
      searchResultItem: filteredResultItem
    });
  }

  playTrack(track) {

    const playerSource = ReactDOM.findDOMNode(this.refs.playerSource);
    const player = ReactDOM.findDOMNode(this.refs.player);

    // playerSource.src ="https://p.scdn.co/mp3-preview/993540fd7aa1a0a44bb0d1b2c82092578c831b07?cid=994101a1655f491d8e44b2368ec8cc91"; //track.preview_uri;
    playerSource.src = track.preview_uri;
    player.load();
    player.play();
  }

  stopTrack(track) {
    const player = ReactDOM.findDOMNode(this.refs.player);
    player.pause();
    player.currentTime = 0;
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <video ref="player">
          <source ref="playerSource" src="" type="audio/mpeg"/>
        </video>
        <div className="App">
          <SearchBar onSearch={this.search.bind(this)}/>
          <div className="App-playlist">
            <SearchResults searchResultItem={this.state.searchResultItem}
              onAdd={this.addTrack.bind(this)}
              onLoadPreviosPage={this.loadPreviousPage.bind(this)}
              onLoadNextPage={this.loadNextPage.bind(this)}
              onPlayTrack={this.playTrack.bind(this)}
              onStopTrack={this.stopTrack.bind(this)}
              />
            <Playlist playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack.bind(this)}
              onNameChange={this.updatePlaylistName.bind(this)}
              onSave={this.savePlaylist.bind(this)}
              onPlayTrack={this.playTrack.bind(this)}
              onStopTrack={this.stopTrack.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
