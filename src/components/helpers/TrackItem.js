class TrackItem {
  constructor(id, name, artist, album) {
    this._id = id;
    this._name = name;
    this._artist = artist;
    this._album = album;
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
}

export default TrackItem;
