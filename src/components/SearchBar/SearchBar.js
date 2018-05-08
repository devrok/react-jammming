import React, { Component } from "react";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {

  }

  render() {
    return(
      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist"
          onChange={this.handleInputChange} />
        <a>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
// <div class="SearchBar">
//   <input placeholder="Enter A Song, Album, or Artist" />
//   <a>SEARCH</a>
// </div>
