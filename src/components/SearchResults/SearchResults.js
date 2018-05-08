import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList.js";
import TrackItem from "../helpers/TrackItem.js";

class SearchResults extends Component {
  render() {
    console.log(this.props.searchResults);
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults} />
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.instanceOf(TrackItem))
}

export default SearchResults;
// <div className="SearchResults">
//   <h2>Results</h2>
//   <!-- Add a TrackList component -->
// </div>
