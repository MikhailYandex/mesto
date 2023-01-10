export const popupImage = document.querySelector('.popup_type_image');
export const popupPhoto = document.querySelector('.popup_type_image');
export const image = popupPhoto.querySelector('.popup__image');
export const imageName = popupPhoto.querySelector('.popup__caption');

// открытие/закрытие окон
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
}

// Закрытие попапа через кнопку Escape
export function closePopupByEsc (e) {
  if (e.key === "Escape") {
      closePopup(document.querySelector(".popup_opened"))
  }
}
