class TrackItem {
  constructor(id, name, artist, album, uri) {
    this._id = id;
    this._name = name;
    this._artist = artist;
    this._album = album;
    this._uri = uri;
    this._alreadyInPlaylist = false;
  }

  get id(){
    return this._id;
  }

  get name() {
    return this._name;
  }

  get artist() {
    return this._artist;
  }

  get album() {
    return this._album;
  }

  get uri() {
    return this._uri;
  }

  get alreadyInPlaylist() {
    return this._alreadyInPlaylist;
  }

  set alreadyInPlaylist(value) {
    this._alreadyInPlaylist = value;
  }
}

export default TrackItem;
