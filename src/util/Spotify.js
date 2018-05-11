import TrackItem from "../components/helpers/TrackItem.js";

const CLIENT_ID = "994101a1655f491d8e44b2368ec8cc91";
// public
//const REDIRECT_URI = "https://devrok.github.io/react-jammming/";
// dev
const REDIRECT_URI = "http://localhost:3000/";

let userAccessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    const currentUri = window.location.href;
    userAccessToken = this.parseValue(currentUri, /access_token=([^&]*)/);
    expiresIn = this.parseValue(currentUri, /expires_in=([^&]*)/);

    if (userAccessToken && expiresIn) {
      window.setTimeout(() => userAccessToken = "", expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      let redirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
      window.location.replace(redirect);
    }

    return userAccessToken;
  },

  parseValue(currentUri, pattern) {
    const parsedValues = currentUri.match(pattern);

    if (parsedValues && parsedValues.length === 2) return parsedValues[1];

    throw new Error("Value could not be parsed!");
  },

  search(searchTerm) {
    let accessToken = this.getAccessToken();
    const searchUri = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;

    return fetch(searchUri, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {

      if (jsonResponse.tracks) {
        let resultArray = jsonResponse.tracks.items.map(item =>
          new TrackItem(item.id,
            item.name,
            item.artists[0].name,
            item.album.name,
            item.uri)
        );

        return resultArray;
      }
    });
  },

  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris) return;

    let accessToken = this.getAccessToken();
    let header = { headers: {Authorization: `Bearer ${accessToken}`} };
    let userId = this.getUserId(header);


  },

  getUserId(header) {
    const requestUri = "https://api.spotify.com/v1/me";
    return fetch(requestUri,
      header
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return jsonResponse.id;
    });
  },

  postPlaylist(userId, header) {
    // https://beta.developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
  }

}

export default Spotify;
