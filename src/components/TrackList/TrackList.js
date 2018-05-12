import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./TrackList.css";
import Track from "../Track/Track.js";
import TrackItem from "../helpers/TrackItem.js";

class TrackList extends Component {
  render() {

    return (
      <div className="TrackList">
        {
          // this.props.businesses.map(businessValue => {
          //   return <Track key={businessValue.id} business={businessValue}/>;
          // })
          this.props.tracks.map(item => {
            // console.log("Track " + item.id);
            // console.log(item);
            return (
              <Track key={item.id}
                track={item}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval} />
            );
          })
        }
      </div>
    );
  }
}

TrackList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.instanceOf(TrackItem)),
  isRemoval: PropTypes.bool,
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
}

export default TrackList;
