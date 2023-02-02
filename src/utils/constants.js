const airplane = new URL('../images/elements/airplane.jpg', import.meta.url);
const church = new URL('../images/elements/church.jpg', import.meta.url);
const bird = new URL('../images/elements/bird.jpg', import.meta.url);
const waterfall = new URL('../images/elements/waterfall.jpg', import.meta.url);
const motorbike = new URL('../images/elements/motorbike.jpg', import.meta.url);
const lighthouse = new URL('../images/elements/lighthouse.jpg', import.meta.url)

const initialCards = [
  {name: 'Самолёт', link: airplane},
  {name: 'Церковь', link: church},
  {name: 'Птица', link: bird},
  {name: 'Водопад', link: waterfall},
  {name: 'Езда на мотоцикле', link: motorbike},
  {name: 'Маяк на причале', link: lighthouse}
];

// параметры валидации
const selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const buttonOpenEditProfileForm = document.querySelector('.profile__edit-button');
const buttonOpenAddCardForm = document.querySelector('.profile__add-button');

const formEditProfile = document.querySelector('.popup__form_edit');
const nameEditInput = formEditProfile.querySelector('.popup__input_name');
const textInput = formEditProfile.querySelector('.popup__input_text');

const formAddCard = document.querySelector('.popup__form_add');

const cardContainer = document.querySelector(".elements");
const templateSelector = "#element-template";

export { initialCards, selectors, buttonOpenEditProfileForm, buttonOpenAddCardForm,
  formEditProfile, nameEditInput, textInput, formAddCard, cardContainer, templateSelector };
