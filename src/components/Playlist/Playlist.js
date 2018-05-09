import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Playlist.css";
import TrackList from "../TrackList/TrackList.js";
import TrackItem from "../helpers/TrackItem.js";

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
        <TrackList tracks={this.props.playlistTracks}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlistName: PropTypes.string,
  playlistTracks: PropTypes.arrayOf(PropTypes.instanceOf(TrackItem))
};

export default Playlist;
// <div class="Playlist">
//   <input value="New Playlist"/>
//   <!-- Add a TrackList component -->
//   <a class="Playlist-save">SAVE TO SPOTIFY</a>
// </div>
