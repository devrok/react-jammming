import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./Track.css";
import TrackItem from "../helpers/TrackItem.js";

class Track extends Component{
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} + " | " + {this.props.track.album} </p>
        </div>
        <a className="Track-action">" + or - will go here"</a>
      </div>
    );
  }
}

Track.propTypes = {
  track: PropTypes.instanceOf(TrackItem)
}

export default Track;
// <div class="Track">
//   <div class="Track-information">
//     <h3><!-- track name will go here --></h3>
//     <p><!-- track artist will go here--> | <!-- track album will go here --></p>
//   </div>
//   <a class="Track-action"><!-- + or - will go here --></a>
// </div>
