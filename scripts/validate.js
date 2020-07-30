const validationParams = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const errorSuffix = "-error";

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}${errorSuffix}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}${errorSuffix}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // кнопка стала неактивной
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

const toggleButtonStateOnForm = (formElement, buttonElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  toggleButtonState(inputList, buttonElement, validationParams.inactiveButtonClass);
};

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
};


// Функция принимает массив полей
const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся фунцкция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  })
};

const resetPopupForm = (currentPopup) => {
  const popupForm = currentPopup.querySelector(validationParams.formSelector);
  if (popupForm != null) {
    popupForm.reset();
    resetValidationErrors(popupForm);

  }
}

const resetValidationErrors = (formElement) => {

  const inputList = Array.from(formElement.querySelectorAll(validationParams.inputSelector));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationParams.inputErrorClass, validationParams.errorClass)
  });
};

const setEventListeners = (formElement, validParams) => {
  const inputList = Array.from(formElement.querySelectorAll(validParams.inputSelector));
  const buttonElement = formElement.querySelector(validParams.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validParams.inactiveButtonClass);

  inputList.forEach((imputElement) => {
    imputElement.addEventListener('input', function () {
      checkInputValidity(formElement, imputElement, validParams.inputErrorClass, validParams.errorClass);
      toggleButtonState(inputList, buttonElement, validParams.inactiveButtonClass);
    });
  });
};

const enableValidation = (validParams) => {
  const formList = Array.from(document.querySelectorAll(validParams.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validParams);

  });
};

enableValidation(validationParams);
