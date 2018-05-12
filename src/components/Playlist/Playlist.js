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
    const newValue = event.target.value;
    this.props.onNameChange(newValue);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName}
          onChange={this.handleInputChange.bind(this)}/>
        <TrackList tracks={this.props.playlistTracks}
          onRemove={this.props.onRemove}
          isRemoval={true} />
        <a className="Playlist-save"
          onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

Playlist.propTypes = {
  playlistName: PropTypes.string,
  playlistTracks: PropTypes.arrayOf(PropTypes.instanceOf(TrackItem)),
  onRemove: PropTypes.func,
  onNameChange: PropTypes.func,
  onSave: PropTypes.func
};

export default Playlist;
