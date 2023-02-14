export default class Card {
  constructor({data, userId, handleCardClick, handleLikeClick, handleDeleteClick}, templateSelector) {
    this._data = data;
    this._userId = userId;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._templateSelector = templateSelector;
    this._newCard = this._getTemplate();
    this._cardTitle = this._newCard.querySelector(".element__text");
    this._buttonLike = this._newCard.querySelector(".element__like");
    this._buttonDelete = this._newCard.querySelector(".element__delete-icon");
    this._cardImage = this._newCard.querySelector(".element__photo");
    this._counterLikes = this._newCard.querySelector(".element__like-counter");
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document.querySelector(this._templateSelector).content.querySelector(".element").cloneNode(true);
  }

  isLiked() {
    return this._likes.some(item => item._id === this._userId);
  }

  toggleLikes(item) {
    this._likes = item;
    this._counterLikes.textContent = this._likes.length;
    if (this.isLiked()) {
      this._buttonLike.classList.add("element__like_active");
    } else {
      this._buttonLike.classList.remove("element__like_active");
    }
  }

  _fillData() {
    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (this._ownerId !== this._userId) {
      this._buttonDelete.remove();
    }
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  removeCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  getView() {
    this._fillData();
    this._setEventListeners();
    this.toggleLikes(this._likes);
    return this._newCard;
  }
}

