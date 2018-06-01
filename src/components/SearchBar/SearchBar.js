import React, { Component } from "react";
import PropTypes from 'prop-types';
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {term: "", value: ""};

    this.search = this.search.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyPress = this.handleInputKeyPress.bind(this);
  }

  componentWillMount() {
    console.log("--- SearchBar.js componentWillMount ---")
    const searchTerm = sessionStorage.getItem('searchTerm');
    if (searchTerm) {
      console.log("storage value: " + searchTerm);
      this.setState({term: searchTerm, value: searchTerm });
    }
  }

  search() {
    this.props.onSearch(this.state.term);
  }

  handleInputChange(event) {
    const newSearchTerm = event.target.value;
    this.setState({term: newSearchTerm, value: newSearchTerm});
  }

  handleInputKeyPress(event) {
    if (event.key !== "Enter") return;
    console.log("--- SearchBar.js: trigger search by enter")
    this.search();
  }

  render() {
    return(
      <div className="SearchBar">
        <input autoFocus
          placeholder="Enter A Song, Album, or Artist"
          value={this.state.value}
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
