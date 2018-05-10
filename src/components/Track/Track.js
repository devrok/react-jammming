import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Track.css";
import TrackItem from "../helpers/TrackItem.js";

class Track extends Component{
  constructor(props) {
    super(props);

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    console.log("-- Track.js -- Click addTrack");
    this.props.onAdd(this.props.track);
  }

  removeTrack() {
    console.log("-- Track.js -- Click removeTrack");
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        { this.props.isRemoval
          ? <a className="Track-action" onClick={this.removeTrack}>-</a>
          : <a className="Track-action" onClick={this.addTrack}>+</a>
        }
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.instanceOf(TrackItem),
  isRemoval: PropTypes.bool
}

export default Track;
// <div class="Track">
//   <div class="Track-information">
//     <h3><!-- track name will go here --></h3>
//     <p><!-- track artist will go here--> | <!-- track album will go here --></p>
//   </div>
//   <a class="Track-action"><!-- + or - will go here --></a>
// </div>
