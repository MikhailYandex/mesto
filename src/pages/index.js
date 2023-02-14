import './index.css';
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupConfirmation from '../components/PopupConfirmation';
import { validationConfig, buttonOpenEditProfileForm, buttonOpenAddCardForm,
  formEditProfile, nameEditInput, textInput, formAddCard, cardContainer, profileAvatarButton,
  confirmForm, cardTemplateSelector}
  from "../utils/constants.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "9c533fd0-d94f-4f7c-9870-53ced17f9818",
    "Content-Type": "application/json",
  },
});

//отрисовка данных карточек и описания профиля с сервера
let userId;
Promise.all([api.getUserInfo(), api.getCards()]).then(
  ([userData, cardsData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    cardsSection.renderItems(cardsData);
  }
);

const formProfileValidator = new FormValidator(validationConfig, formEditProfile);
formProfileValidator.enableValidation();

const formCardValidator = new FormValidator(validationConfig, formAddCard);
formCardValidator.enableValidation();

const formAvatarValidator = new FormValidator(validationConfig, confirmForm);
formAvatarValidator.enableValidation();

const userInfo = new UserInfo({
  nameSelector:'.profile__name',
  infoSelector:'.profile__text',
  avatarSelector: ".profile__avatar",
});

const popupWithImage = new PopupWithImage('.popup_type_image');
const popupConfirmation = new PopupConfirmation(".popup_type_confirm");

// вставляем карточку на страницу
function createCards(data) {
  const card = new Card ({
    data: data,
    userId: userId,
    handleCardClick: () => { popupWithImage.open(data) },
    handleLikeClick: () => {
      if (card.isLiked()) {
        api.removeLike(data._id).then((data) => {
          card.toggleLikes(data.likes);
        })
      } else {
        api.addLike(data._id).then((data) => {
          card.toggleLikes(data.likes);
        })
      }
    },
    handleDeleteClick: () => {
      popupConfirmation.open(() => {
        api.removeCard(data._id).then(() => {
          card.removeCard();
          popupConfirmation.close();
        })
      })
    }
  }, cardTemplateSelector
  );
  return card.getView()
}

const cardsSection = new Section({
  renderer: (item) => {
    cardsSection.addItem(createCards(item))
  },
}, cardContainer);

const popupEdit = new PopupWithForm(".popup_type_edit", (data) => {
  popupEdit.renderLoading(true);
  api.editUserInfo(data["name"], data["text"]).then((data) => {
    userInfo.setUserInfo(data);
    popupEdit.close();
  })
  .finally(() => {
    popupEdit.renderLoading(false);
  });
});

const popupAdd = new PopupWithForm ('.popup_type_add', (data) => {
  popupAdd.renderLoading(true);
  api.addCard({ name: data["place"], link: data["link"] }).then((data) => {
    cardsSection.addItem(createCards(data));
    popupAdd.close();
  })
  .finally(() => {
    popupAdd.renderLoading(false);
  });
});

const popupAvatarEdit = new PopupWithForm (".popup_type_avatar", ({avatar}) => {
  popupAvatarEdit.renderLoading(true);
  api.editUserAvatar({avatar: avatar}).then((data) => {
    userInfo.setUserInfo(data);
    popupAvatarEdit.close();
  })
  .finally(() => {
    popupAvatarEdit.renderLoading(false);
  })
})

popupWithImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupConfirmation.setEventListeners();
popupAvatarEdit.setEventListeners();

buttonOpenEditProfileForm.addEventListener('click', () => {
  popupEdit.open();
  const userData = userInfo.getUserInfo();
  nameEditInput.value = userData.name;
  textInput.value = userData.about;
  formProfileValidator.resetValidation();
});

profileAvatarButton.addEventListener("click", () => {
  popupAvatarEdit.open();
  formAvatarValidator.resetValidation();
})

const openAddCardForm = () => {
  popupAdd.open();
  formCardValidator.resetValidation();
}
buttonOpenAddCardForm.addEventListener('click', openAddCardForm)
