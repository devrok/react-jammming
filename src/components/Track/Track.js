import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Track.css";
import TrackItem from "../helpers/TrackItem.js";

class Track extends Component{
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.playTrack = this.playTrack.bind(this);
    this.stopTrack = this.stopTrack.bind(this);
  }

  addTrack() {
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  playTrack() {
    this.props.onPlayTrack(this.props.track);
  }

  stopTrack() {
    this.props.onStopTrack();
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
          <div className="Track-information-overlay">
            <a onClick={this.playTrack}><i className="fa fa-play-circle-o fa-lg"></i></a>
            <a onClick={this.stopTrack}><i className="fa fa-stop-circle-o fa-lg"></i></a>
          </div>
        </div>
        {
          this.props.isRemoval
          ? <a className="Track-action" onClick={this.removeTrack}>-</a>
          : this.props.track.alreadyInPlaylist
            ? <p>!!Added!!</p>
            : <a className="Track-action" onClick={this.addTrack}>+</a>
        }
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.instanceOf(TrackItem),
  isRemoval: PropTypes.bool,
  onPlayTrack: PropTypes.func,
  onStopTrack: PropTypes.func
}

export default Track;
