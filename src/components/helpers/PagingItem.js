class PagingItem {
  constructor(tracks, previous, next, offset, total) {
    this._items = tracks;
    this._previous = previous;
    this._next = next;
    this._offset = offset;
    this._total = total;
  }

  get items() {
    return this._items;
  }

  get previous() {
    return this._previous;
  }

  get next() {
    return this._next;
  }

  get offset() {
    return this._offset;
  }

  get total() {
    return this._total;
  }
}

export default PagingItem;
