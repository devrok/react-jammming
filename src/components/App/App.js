import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import TrackItem from "../helpers/TrackItem.js";


class App extends Component {
  constructor(props) {
    super(props);

    let mySearchResults = [
      new TrackItem(1, "Song 1", "Artist 1", "Album 1"),
      new TrackItem(2, "Song 2", "Artist 2", "Album 2"),
    ];

    this.state = { searchResults: mySearchResults };

  }
  render() {
    let results = this.state.searchResults;
    console.log(results);

    // the component for playlist has to be remove actually
    // because if not correct initialized it leads to an error;
    // 1hour of my life! => AAAAAAH!
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />

          </div>
        </div>
      </div>
    );
  }
}

export default App;

// <div>
//   <h1>Ja<span className="highlight">mmm</span>ing</h1>
//   <div className="App">
//     <SearchBar />
//     <div className="App-playlist">
//       <SearchResults searchResults={this.state.searchResults} />
//       <Playlist />
//     </div>
//   </div>
// </div>


// <div>
//   <h1>Ja<span class="highlight">mmm</span>ing</h1>
//   <div class="App">
//     <!-- Add a SearchBar component -->
//     <div class="App-playlist">
//     <!-- Add a SearchResults component -->
//     <!-- Add a Playlist component -->
//     </div>
//   </div>
// </div>
