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

    // const currentUri = window.location.href;
    // const pattern = [
    //   "/access_token=([^&]*)/",
    //   "/expires_in=([^&]*)/"
    // ];
    //
    // const matches = currentUri.match(pattern);

    // if (matches && matches.length === 2) {
    //   userAccessToken = matches[0];
    //   expiresIn = matches[1];
    //
    //   window.setTimeout(() => userAccessToken = "", expiresIn * 1000);
    //   window.history.pushState("Access Token", null, "/");
    //
    // }
    if (this.parseTokenAndTime(window.location.href)) {
      window.setTimeout(() => userAccessToken = "", expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      let redirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;

      console.log(redirect);

      window.location.replace(redirect);
    }

    return userAccessToken;
  },

  parseTokenAndTime(currentUri)
  {
    const tokenMatch = currentUri.match(/access_token=([^&]*)/);
    const expiresMatch = currentUri.match(/expires_in=([^&]*)/);

    if (!tokenMatch || !expiresMatch) return false;

    if (tokenMatch.length === 2 && expiresMatch.length === 2) {
      userAccessToken = tokenMatch[1];
      expiresIn = expiresMatch[1];
      return true;
    }

    return false;
  },

  search(searchTerm) {
    userAccessToken = this.getAccessToken();

    const searchUri = `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`;

    return fetch(searchUri, {
      headers: {
        Authorization: `Bearer ${userAccessToken}`
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
  }
}

export default Spotify;
