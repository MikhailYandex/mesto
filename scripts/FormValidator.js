export class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._formSelector = this._selectors.formSelector;
    this._inputSelector = this._selectors.inputSelector;
    this._submitButtonSelector = this._selectors.submitButtonSelector;
    this._inactiveButtonClass = this._selectors.inactiveButtonClass;
    this._inputErrorClass = this._selectors.inputErrorClass;
    this._errorClass = this._selectors.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  //показываем текст ошибки
  _showInputError(form, inputElement, errorMessage) {
    const errorElement = form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //скрываем текст ошибки
  _hideInputError(form, inputElement) {
    const errorElement = form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  //проверяем валидность данных и вызываем hideError или showError
  _isValid(form, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(form, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(form, inputElement);
    }
  }

  //формируем список инпутов в форме и ставим на каждый слушатель
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._form, inputElement);
        this._toggleButtonState();
      });
    });
  }

  //проверяем все ли поля импутов в текущей форме валидны
  _isFormInvalid() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  //состояние кнопки, которое нужно менять: активна или неактивна
  _toggleButtonState() {
    if (this._isFormInvalid()) {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.removeAttribute('disabled');
      this._submitButton.classList.remove(this._inactiveButtonClass);
    }
  }

  _disabledButtonState() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }
}

