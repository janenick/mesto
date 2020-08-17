import { errorSuffix } from './constants.js';

export class FormValidator {
  constructor(formElement, { ...validParams }) {
    this._formElement = formElement;
    this._validParams = validParams;
  }

  // Функция принимает массив полей
  _hasInvalidInput() {
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true

      return !inputElement.validity.valid;
    })
  }

  _showInputError(inputElement, errorMessage) {

    const errorElement = this._formElement.querySelector(`#${inputElement.id}${errorSuffix}`);
    inputElement.classList.add(this._validParams.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validParams.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}${errorSuffix}`);
    inputElement.classList.remove(this._validParams.inputErrorClass);
    errorElement.classList.remove(this._validParams.errorClass);
    errorElement.textContent = '';
  }

  _toggleButtonState() {

    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // кнопка стала неактивной
      this._buttonElement.classList.add(this._validParams.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    }
    else {
      this._buttonElement.classList.remove(this._validParams.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  toggleButtonStateOnForm = () => {
    this._toggleButtonState();
  }

  _checkInputValidity(inputElement) {

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {

    this._inputList = Array.from(this._formElement.querySelectorAll(this._validParams.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._validParams.submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {

      inputElement.addEventListener('input', () => {

        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  resetValidationErrors() {
    
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState();
    });
  }

  enableValidation() {

    this._formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    this._setEventListeners();
  }
}
