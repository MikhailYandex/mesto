// Открытие и закрытие попапа
const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close');

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

// Замена текста на сайте через форму
const formElement = document.querySelector('.popup__form');

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector('.popup__input_first').value;
  let jobInput = document.querySelector('.popup__input_second').value;

  document.querySelector('.profile__name').textContent = nameInput;
  document.querySelector('.profile__text').textContent = jobInput;

  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
