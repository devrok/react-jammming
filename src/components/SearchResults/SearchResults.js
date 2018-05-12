import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList.js";
import TrackItem from "../helpers/TrackItem.js";

class SearchResults extends Component {
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.searchResults}
          onAdd={this.props.onAdd}
          isRemoval={false} />
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(PropTypes.instanceOf(TrackItem)),
  onAdd: PropTypes.func
}

export default SearchResults;
