// параметры валидации
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

//показываем текст ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(selectors.errorClass);
}

//скрываем текст ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(selectors.errorClass);
}

//проверяем валидность данных и вызываем hideError или showError
const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement)
  }
}

//формируем список инпутов в форме и ставим на каждый слушатель
const setInputEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);
  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
}

//проверяем все ли поля импутов в текущей форме валидны
function isFormInvalid(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

//формируем список форм в документе и для каждой применяем список инпутов
const setFormEventListeners = () => {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    setInputEventListeners(formElement);
  })
};
setFormEventListeners();

//состояние кнопки, которое нужно менять: активна или неактивна
function toggleButtonState(inputList, submitButton) {
  if (isFormInvalid(inputList)) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(selectors.inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(selectors.inactiveButtonClass);
  }
}

//неактивная для сброса ошибок при открытии окна
function disabledButtonState(formElement) {
  const submitButton = formElement.querySelector(selectors.submitButtonSelector);
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add(selectors.inactiveButtonClass);
}
