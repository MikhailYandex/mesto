export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector(".element__text");
    this._likeButton = this._newCard.querySelector(".element__like");
    this._deleteButton = this._newCard.querySelector(".element__delete-icon");
    this._cardImage = this._newCard.querySelector(".element__photo");
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
  }

  _handleLike() {
    this._likeButton.classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });

    this._cardImage.addEventListener("click", () => {
      image.src = this._link;
      imageName.textContent = this._name;
      image.alt = this._name;
      openPopup(popupImage);
    });
  }

  getView() {
    this._setData();
    this._setEventListeners();
    return this._newCard;
  }
}

