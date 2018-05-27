import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList.js";
import PagingItem from "../helpers/PagingItem.js";

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.loadPreviousPage = this.loadPreviousPage.bind(this);
    this.loadNextPage = this.loadNextPage.bind(this);
  }

  loadPreviousPage() {
    this.props.onLoadPreviosPage(this.props.searchResultItem.previous);
  }

  loadNextPage() {
    this.props.onLoadNextPage(this.props.searchResultItem.next);
  }

  render() {
    return (
      <div className="SearchResults">
        <div className="SearchResultsCaption">
          <h2>Results</h2>
          {
            this.props.searchResultItem && this.props.searchResultItem.total > 0
            ? <p>total: {this.props.searchResultItem.total}</p>
            : ""
          }
        </div>
        {
          this.props.searchResultItem && this.props.searchResultItem.total > 0
          ? <div className="SearchResultsPaging">
              <a className="SearchResultsPaging-Action"
                onClick={this.loadPreviousPage}>&lt;&lt;</a>
              <p>{this.props.searchResultItem.currentPage}/{this.props.searchResultItem.totalPages}</p>
              <a className="SearchResultsPaging-Action"
                onClick={this.loadNextPage}>&gt;&gt;</a>
            </div>
          : ""
        }
        <TrackList tracks={this.props.searchResultItem.items}
          onAdd={this.props.onAdd}
          isRemoval={false}
          onPlayTrack={this.props.onPlayTrack}
          onStopTrack={this.props.onStopTrack}
          />
      </div>
    );
  }
}

SearchResults.propTypes = {
  searchResultItem: PropTypes.instanceOf(PagingItem),
  onAdd: PropTypes.func,
  onLoadPreviosPage: PropTypes.func,
  onLoadNextPage: PropTypes.func,
  onPlayTrack: PropTypes.func,
  onStopTrack: PropTypes.func
}

export default SearchResults;
