class PagingItem {
  constructor(tracks, previous, next, offset, total, limit) {
    this._items = tracks;
    this._previous = previous;
    this._next = next;
    this._offset = offset;
    this._total = total;
    this._limit = limit;
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

  get currentPage() {
    return this.offset > 0
      ? (this.offset / this._limit) + 1
      : 1;
  }

  get totalPages() {
    const pages = this.total / this._limit;
    return this.total % this._limit > 0
      ? Math.ceil(pages)
      : pages;
  }
}

export default PagingItem;
