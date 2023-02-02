import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { initialCards, selectors, buttonOpenEditProfileForm, buttonOpenAddCardForm,
  formEditProfile, nameEditInput, textInput, formAddCard, cardContainer, templateSelector }
  from "../utils/constants.js";

const formProfileValidator = new FormValidator(selectors, formEditProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(selectors, formAddCard);
formCardValidator.enableValidation();

const popupWithImage = new PopupWithImage('.popup_type_image');

// вставляем карточку на страницу
function createCard(data) {
  const card = new Card (data, templateSelector, () => {
    popupWithImage.open(data);
  });
  return card.getView();
}

const section = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = createCard(item);
    section.addItem(card);
  },
}, cardContainer);

section.renderItems();

const userInfo = new UserInfo({nameSelector:'.profile__name', infoSelector:'.profile__text'});

const popupEdit = new PopupWithForm('.popup_type_edit', () => {
  userInfo.setUserInfo({name: nameEditInput.value, info: textInput.value});
});

const popupAdd = new PopupWithForm('.popup_type_add', (data) => {
  const newCard = createCard({ name: data["place"], link: data["link"] });
  section.addItem(newCard);
})

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();

buttonOpenEditProfileForm.addEventListener('click', () => {
  popupEdit.open();
  nameEditInput.value = userInfo.getUserInfo().name;
  textInput.value = userInfo.getUserInfo().info;
  formProfileValidator.resetValidation();
});

buttonOpenAddCardForm.addEventListener('click', () => {
  popupAdd.open();
  formCardValidator.disabledButtonState();
  formCardValidator.resetValidation();
});
