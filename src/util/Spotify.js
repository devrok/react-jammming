import TrackItem from "../components/helpers/TrackItem.js";

const CLIENT_ID = "994101a1655f491d8e44b2368ec8cc91";
// public
//const REDIRECT_URI = "https://devrok.github.io/react-jammming/";
// dev
const REDIRECT_URI = "http://localhost:3000/";

const BASE_URI = "https://api.spotify.com/v1/";

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

    return undefined;
  },



  search(searchTerm) {
    let accessToken = this.getAccessToken();

    if (!searchTerm) return [];

    const searchUri = BASE_URI + `search?type=track&q=${searchTerm}`;

    return fetch(searchUri, {
      headers: { "Authorization": `Bearer ${accessToken}` }
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
    let authorizationHeader = {"Authorization": `Bearer ${accessToken}`};
    // let userId = this.getUserId(authorizationHeader);


    this.getUserId(authorizationHeader).then(requestedUserId => {

      console.log("TEST");
      console.log(requestedUserId);

      let playlistId = this.postPlaylist(requestedUserId, authorizationHeader, playlistName);
    });





    // let playlistId = this.postPlaylist(userId, authorizationHeader, playlistName);
  },



  getUserId(authorizationHeader) {
    const requestUri = BASE_URI + "me";
    return fetch(requestUri,
      { headers: authorizationHeader}
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {

      // let id = jsonResponse.id;
      return jsonResponse.id;
    });
  },

  // "Access-Control-Allow-Origin":  "http://localhost:3000/",
  // "Access-Control-Allow-Methods": "POST",
  // "Access-Control-Allow-Headers": "Content-Type, Authorization",

  postPlaylist(userId, authorizationHeader, playlistName) {
    const postUri = BASE_URI + `users/${userId}/playlists`;

    // const postUri = BASE_URI + `users/dk2hqfgbcybxppqeggc4glqqz/playlists`;

    console.log("-- post playlist");
    console.log(postUri);
    console.log(userId);
    // console.log(authorizationHeader);

    return fetch(postUri, {
      "method": "POST",
      "headers": {
        authorizationHeader,
        "Content-type": "application/json",
      },
      "body": {
        "name": playlistName
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      console.log(response);

      throw new Error("Request failed!");
    }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      console.log(jsonResponse);
      return jsonResponse;
    });

  }

}

export default Spotify;
