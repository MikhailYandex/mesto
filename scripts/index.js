import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { initialCards } from "./constants.js";

const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPhoto = document.querySelector('.popup_type_image');

const image = popupPhoto.querySelector('.popup__image');
const imageName = popupPhoto.querySelector('.popup__caption');

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
const cardTemplate = document.querySelector("#element-template").content;

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

// создаем карточку и вносим в нее данные из массива
const createCard = (card) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardText = newCard.querySelector('.element__text');
  cardText.textContent = card.name;

  const cardLink = newCard.querySelector('.element__photo');
  cardLink.src = card.link;
  cardLink.alt = card.name;

  const deleteButton = newCard.querySelector('.element__delete-icon');
  deleteButton.addEventListener('click', (e) => {
    e.target.closest('.element').remove();
  });

  const likeButton = newCard.querySelector('.element__like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('element__like_active');
  });

  cardLink.addEventListener('click', () => {
    image.src = card.link
    image.alt = card.name
    imageName.textContent = card.name
    openPopup(popupPhoto)
  })

  return newCard;
}

// вставляем карточку на страницу
const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
}

// для всех данных из массива
initialCards.forEach((Card) => {
  renderCard(Card);
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
  renderCard({ name: nameAddInput.value, link: linkInput.value });
  e.target.reset();
  closePopup(popupAdd);
}

// открытие/закрытие окон
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
}

// Закрытие попапов через все кнопки closeButtons и по оверлэю
closeButtons.forEach((closeButton) =>{
  const popup = closeButton.closest('.popup');
  closeButton.addEventListener('click', () => closePopup(popup));
  popup.addEventListener('click', outClosePopup);
});

// Закрытие попапа по всей области страницы
function outClosePopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

// Закрытие попапа через кнопку Escape
function closePopupByEsc (e) {
  if (e.key === "Escape") {
      closePopup(document.querySelector(".popup_opened"))
  }
}

buttonOpenEditProfileForm.addEventListener('click', function () {
  nameEditInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
  openPopup(popupEdit)
});

buttonOpenAddCardForm.addEventListener('click', function () {
  openPopup(popupAdd)
  disabledButtonState(popupAdd)
  nameAddInput.value = '';
  linkInput.value = '';
});

formEditProfile.addEventListener('submit', editFormSubmitHandler);
formAddCard.addEventListener('submit', addFormSubmitHandler);
