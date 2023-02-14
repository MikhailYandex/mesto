import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleDeleteCard();
    })
  }

  open(handleDeleteCard) {
    super.open()
    this._handleDeleteCard = handleDeleteCard;
  }
}
