import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: ""};

    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleInputChange(event) {
    const newSearchTerm = event.target.value;
    this.setState({term: newSearchTerm});
  }

  handleInputKeyPress(event) {
    if (event.key !== "Enter") return;
    console.log("--- SearchBar.js: trigger search by enter")
    this.search();
  }

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleInputChange}
          onKeyPress={this.handleInputKeyPress} />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func
};

export default SearchBar;
