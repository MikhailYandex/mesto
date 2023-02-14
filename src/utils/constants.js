// параметры валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');

const profileAvatarButton = document.querySelector('.profile__avatar-container');
const confirmForm = document.querySelector('.popup__form_avatar');

const formEditProfile = document.querySelector('.popup__form_edit');
const nameEditInput = formEditProfile.querySelector('.popup__input_name');
const textInput = formEditProfile.querySelector('.popup__input_text');

const formAddCard = document.querySelector('.popup__form_add');

const cardContainer = document.querySelector(".elements");
const cardTemplateSelector = "#element-template";

export { validationConfig, buttonOpenEditProfileForm, buttonOpenAddCardForm,
  formEditProfile, nameEditInput, textInput, formAddCard, cardContainer, profileAvatarButton,
  confirmForm, cardTemplateSelector};

