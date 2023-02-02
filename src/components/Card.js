export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector(".element__text");
    this._buttonLike = this._newCard.querySelector(".element__like");
    this._deleteButton = this._newCard.querySelector(".element__delete-icon");
    this._cardImage = this._newCard.querySelector(".element__photo");
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
  }

  _fillData() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _handleDelete() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLike() {
    this._buttonLike.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._buttonLike.addEventListener("click", () => {
      this._handleLike();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  getView() {
    this._fillData();
    this._setEventListeners();
    return this._newCard;
  }
}

