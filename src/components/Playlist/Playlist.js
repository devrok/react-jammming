import React, { Component } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList.js";

class Playlist extends Component {
  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist"/>
        <TrackList />
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
// <div class="Playlist">
//   <input value="New Playlist"/>
//   <!-- Add a TrackList component -->
//   <a class="Playlist-save">SAVE TO SPOTIFY</a>
// </div>
