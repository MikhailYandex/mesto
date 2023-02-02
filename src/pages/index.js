import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, validationConfig, buttonOpenEditProfileForm, buttonOpenAddCardForm,
  formEditProfile, nameEditInput, textInput, formAddCard, cardContainer, cardTemplateSelector }
  from "../utils/constants.js";

const formProfileValidator = new FormValidator(validationConfig, formEditProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formAddCard);
formCardValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');

// вставляем карточку на страницу
function createCard(data) {
  const card = new Card (data, cardTemplateSelector, () => {
    popupWithImage.open(data);
  });
  return card.getView();
}

const cardsSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    cardsSection.addItem(card);
  },
}, cardContainer);

cardsSection.renderItems();

const userInfo = new UserInfo({nameSelector:'.profile__name', infoSelector:'.profile__text'});

const popupEdit = new PopupWithForm('.popup_type_edit', () => {
  userInfo.setUserInfo({name: nameEditInput.value, info: textInput.value});
  popupEdit.close();
});

const popupAdd = new PopupWithForm('.popup_type_add', (data) => {
  const newCard = createCard({ name: data["place"], link: data["link"] });
  cardsSection.addItem(newCard);
  popupAdd.close();
})

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

buttonOpenEditProfileForm.addEventListener('click', () => {
  popupEdit.open();
  const userData = userInfo.getUserInfo();
  nameEditInput.value = userData.name;
  textInput.value = userData.info;
  formProfileValidator.resetValidation();
});

const openAddCardForm = () => {
  popupAdd.open();
  formCardValidator.resetValidation();
}

buttonOpenAddCardForm.addEventListener('click', openAddCardForm)
