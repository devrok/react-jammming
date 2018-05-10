import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ""};

    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleInputChange(event) {
    const newSearchTerm = event.target.value;

    console.log(newSearchTerm);

    this.setState({term: newSearchTerm});
  }

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleInputChange} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func
};

export default SearchBar;
// <div class="SearchBar">
//   <input placeholder="Enter A Song, Album, or Artist" />
//   <a>SEARCH</a>
// </div>
