export default class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._inputSelector = this._validationConfig.inputSelector;
    this._submitButtonSelector = this._validationConfig.submitButtonSelector;
    this._inactiveButtonClass = this._validationConfig.inactiveButtonClass;
    this._inputErrorClass = this._validationConfig.inputErrorClass;
    this._errorClass = this._validationConfig.errorClass;
    this._form = form;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
  }

  //показываем текст ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //скрываем текст ошибки
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  //проверяем валидность данных и вызываем hideError или showError
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //формируем список инпутов в форме и ставим на каждый слушатель
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(inputElement);
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
      this.disableButtonState();
    } else {
      this._enableButtonState();
    }
  }

  disableButtonState() {
    this._submitButton.disabled = true;
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _enableButtonState() {
    this._submitButton.disabled = false;
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement, this._inputErrorClass, this._errorClass);
    })
    this._toggleButtonState();
  }
}

