const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input_first');
const textInput = formElement.querySelector('.popup__input_second');
const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

function openPopup() {
  nameInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileText.textContent = textInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
