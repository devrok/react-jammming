import TrackItem from "../components/helpers/TrackItem.js";
import PagingItem from "../components/helpers/PagingItem.js";

const CLIENT_ID = "994101a1655f491d8e44b2368ec8cc91";
// public
//const REDIRECT_URI = "https://devrok.github.io/react-jammming/";
// dev
const REDIRECT_URI = "http://localhost:3000/";
// surge
//const REDIRECT_URI = "https://devrok_jammming.surge.ch/";

const BASE_URI = "https://api.spotify.com/v1/";
const QUERYLIMIT = 50;

let userAccessToken;
let expiresIn;

const Spotify = {
  // --
  init() {
    // this.getAccessToken();
  },

  // --
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    return this.internalInitAccessToken();
  },

  getAccessTokenWithSearchTerm(searchTerm) {
    if (userAccessToken) {
      return userAccessToken;
    }

    console.log("--- store value ---")
    sessionStorage.setItem('searchTerm', searchTerm);

    return this.internalInitAccessToken();
  },

  internalInitAccessToken() {
    const currentUri = window.location.href;
    userAccessToken = this.parseValue(currentUri, /access_token=([^&]*)/);
    expiresIn = this.parseValue(currentUri, /expires_in=([^&]*)/);

    if (userAccessToken && expiresIn) {
      console.log("authentication ok");
      window.setTimeout(() => {
        console.log("-- timeout expired --")
        userAccessToken = "";
      }, expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      console.log("redirect");
      const redirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}&state=redirected`;
      window.location.replace(redirect);
    }

    return userAccessToken;
  },

  // --
  parseValue(currentUri, pattern) {
    const parsedValues = currentUri.match(pattern);

    if (parsedValues && parsedValues.length === 2) return parsedValues[1];

    return undefined;
  },

  searchByTerm(term) {
    const searchUri = BASE_URI + `search?type=track&q=${term.replace(" ", "%20")}&limit=${QUERYLIMIT}`;
    let accessToken = this.getAccessTokenWithSearchTerm(term);

    return this.internalSearch(searchUri, accessToken)
  },

  searchByUri(searchUri) {
    let accessToken = this.getAccessToken();

    return this.internalSearch(searchUri, accessToken)
  },

  internalSearch(searchUri, accessToken) {
    return fetch(searchUri, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    }).then(response => {
      if (response.ok) {
        console.log("--- clear stored value ---");
        sessionStorage.removeItem('searchTerm')
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
            item.uri,
            item.preview_url)
        );

        return new PagingItem(resultArray, jsonResponse.tracks.previous,
          jsonResponse.tracks.next,
          jsonResponse.tracks.offset,
          jsonResponse.tracks.total,
          QUERYLIMIT
        );
      }
    });
  },

  // --
  savePlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris || trackUris.length === 0) return;

    let accessToken = this.getAccessToken();

    this.getUserId(accessToken).then(requestedUserId => {
      this.postPlaylist(requestedUserId, accessToken, playlistName).then(requestedPlaylistId => {
        console.log(requestedPlaylistId);
        this.addTracks(requestedUserId, requestedPlaylistId, accessToken, trackUris).then(response => {
          console.log(response);
          return response;
        })
      });
    });
  },

  // --
  getUserId(accessToken) {
    const requestUri = BASE_URI + "me";
    return fetch(requestUri,
      { headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
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

  // --
  postPlaylist(userId, accessToken, playlistName) {
    const postUri = BASE_URI + `users/${userId}/playlists`;

    return fetch(postUri, {
      method: "POST",
      headers: new Headers({
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        "name": playlistName,
        "public": false,
      })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return jsonResponse.id;
    });

  },

  // --
  addTracks(userId, playlistId, accessToken, trackUris) {
    const postUri = BASE_URI + `users/${userId}/playlists/${playlistId}/tracks`;

    return fetch(postUri, {
        method: "POST",
        headers: new Headers({
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        }),
        body: JSON.stringify({
          "uris": trackUris
        })
    }).then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      return jsonResponse;
    });
  }
}

export default Spotify;
export { QUERYLIMIT };
