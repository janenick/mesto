export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();
    this.renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  renderItem(item) {
    this._renderer(item);
  }

}

/*export default class Section {
  constructor(containerSelector) {
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

}*/