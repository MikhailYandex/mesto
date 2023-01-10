import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./constants.js";
import { popupImage, popupPhoto, image, imageName, openPopup, closePopup, closePopupByEsc } from "./utils.js";

const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');

const closeButtons = document.querySelectorAll('.popup__close');

const formEditProfile = document.querySelector('.popup__form_edit');
const nameEditInput = formEditProfile.querySelector('.popup__input_name');
const textInput = formEditProfile.querySelector('.popup__input_text');

const formAddCard = document.querySelector('.popup__form_add');
const nameAddInput = formAddCard.querySelector('.popup__input_name');
const linkInput = formAddCard.querySelector('.popup__input_link');

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

const cardContainer = document.querySelector(".elements");
const templateSelector = "#element-template";

// параметры валидации
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const formProfileValidator = new FormValidator(selectors, formEditProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(selectors, formAddCard);
formCardValidator.enableValidation();

// вставляем карточку на страницу
function addCard(data, templateSelector) {
  const card = new Card(data, templateSelector);
  cardContainer.prepend(card.getView());
}

// для всех данных из массива
initialCards.forEach((data) => {
  addCard(data, templateSelector);
});

function editFormSubmitHandler(e) {
  e.preventDefault();
  profileName.textContent = nameEditInput.value;
  profileText.textContent = textInput.value;
  e.target.reset();
  closePopup(popupEdit);
}

function addFormSubmitHandler(e) {
  e.preventDefault();
  const cardAddPopup = ({ name: nameAddInput.value, link: linkInput.value });
  addCard(cardAddPopup, templateSelector);
  e.target.reset();
  closePopup(popupAdd);
}

// Закрытие попапов через все кнопки closeButtons и по оверлэю
closeButtons.forEach((closeButton) =>{
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('mousedown', outClosePopup);
});

// Закрытие попапа по всей области страницы
function outClosePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

buttonOpenEditProfileForm.addEventListener('click', function () {
  nameEditInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
  openPopup(popupEdit);
  formProfileValidator.resetValidation();
});

buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupAdd);
  formCardValidator._disabledButtonState();
  nameAddInput.value = '';
  linkInput.value = '';
  formCardValidator.resetValidation();
});

formEditProfile.addEventListener('submit', editFormSubmitHandler);
formAddCard.addEventListener('submit', addFormSubmitHandler);
