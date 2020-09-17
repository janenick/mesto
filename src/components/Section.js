export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this.renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();
    this.renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }

  // данная функция используется в handleFormSubmit попапа добавления карточки
  renderItem(item) {
    this._renderer(item);
  }
}