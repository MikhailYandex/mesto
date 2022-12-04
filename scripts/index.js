const initialCards = [
  {name: 'Самолёт', link: './images/elements/airplane.jpg'},
  {name: 'Церковь', link: './images/elements/church.jpg'},
  {name: 'Птица', link: './images/elements/bird.jpg'},
  {name: 'Водопад', link: './images/elements/waterfall.jpg'},
  {name: 'Езда на мотоцикле', link: './images/elements/motorbike.jpg'},
  {name: 'Маяк на причале', link: './images/elements/lighthouse.jpg'}
];

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupPhoto = document.querySelector('.popup_type_image');

const image = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__caption');

const closeButtons = document.querySelectorAll('.popup__close');

const editForm = document.querySelector('.popup__form_edit');
const nameEditInput = editForm.querySelector('.popup__input_name');
const textInput = editForm.querySelector('.popup__input_text');

const addForm = document.querySelector('.popup__form_add');
const nameAddInput = addForm.querySelector('.popup__input_name');
const linkInput = addForm.querySelector('.popup__input_link');

const profileName = document.querySelector('.profile__name');
const profileText = document.querySelector('.profile__text');

const cardContainer = document.querySelector(".elements");
const cardTemplate = document.querySelector("#element-template").content;

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
  closePopup(popupEdit);
}

function addFormSubmitHandler(e) {
  e.preventDefault();
  renderCard({ name: nameAddInput.value, link: linkInput.value })
  e.target.reset()
  closePopup(popupAdd)
}

// открытие/закрытие окон
function openPopup(popup) {
  nameEditInput.value = profileName.textContent;
  textInput.value = profileText.textContent;
  nameAddInput.value = '';
  linkInput.value = '';
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Закрытие попапов через все кнопки closeButtons
if (closeButtons.length > 0) {
  for (let i = 0; i < closeButtons.length; i++) {
    const closeButton = closeButtons[i];
    closeButton.addEventListener('click', () => closePopup(closeButton.closest('.popup')));
  }
};

editButton.addEventListener('click', () => openPopup(popupEdit));
addButton.addEventListener('click', () => openPopup(popupAdd));

editForm.addEventListener('submit', editFormSubmitHandler);
addForm.addEventListener('submit', addFormSubmitHandler);
