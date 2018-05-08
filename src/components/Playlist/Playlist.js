import React, { Component } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList.js";

class Playlist extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {

  }

  render() {
    return (
      <div className="Playlist">
        <input value="New Playlist"
          onChange={this.handleInputChange}/>
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
