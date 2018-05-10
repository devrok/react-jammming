const CLIENT_ID = "994101a1655f491d8e44b2368ec8cc91";
const REDIRECT_URI = "http://localhost:3000/";

let userAccessToken;
let expiresIn;

const Spotify = {

  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }

    const currentUri = window.location.href;
    const pattern = [
      "/access_token=([^&]*)/",
      "/expires_in=([^&]*)/"
    ];

    const matches = currentUri.match(pattern);

    if (matches && matches.length === 2) {
      userAccessToken = matches[0];
      expiresIn = matches[1];

      window.setTimeout(() => userAccessToken = "", expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");

    } else {
      let redirect = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;

      console.log(redirect);

      window.location.replace(redirect);
    }

    return userAccessToken;
  },

  parseTokeAndTime()
 {
   const currentUri = "m91oICGbDwSPoNshAwKCzfbBw59R2Fz9ir8ry1h_2oiaFx72n1oooKm446AjhGmTMRzaMeNh1gx32HxmCjJ3mmC1NAJVmBgZDM8BH_JmIaQJCuxj4yF_cEinYnhD6PrrN2TSx9qUhgeznJ";
   const pattern = [
     "/access_token=([^&]*)/",
     "/expires_in=([^&]*)/"
   ];

   const matches = currentUri.match(pattern);

   console.log(matches);

   if (matches && matches.length === 2) {
     userAccessToken = matches[0];
     expiresIn = matches[1];
   }

 },

  search(searchTerm) {
    this.parseTokeAndTime();
    return;

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
      console.log(jsonResponse);

      //new TrackItem(1, "Song 1", "Artist 1", "Album 1", "uri")

      return jsonResponse;
    });
  }
}

export default Spotify;
