class TrackItem {
  constructor(id, name, artist, album, uri) {
    this._id = id;
    this._name = name;
    this._artist = artist;
    this._album = album;
    this._uri = uri;
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
}

export default TrackItem;
