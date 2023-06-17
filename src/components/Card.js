export default class Card {
  constructor(data, userId, teamplateSelector, handleCardClick, handleDeleteButtonClick, handleLikeButtonClick) {
    this._titleImg = data.name;
    this._urlImg = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._teamplateSelector = teamplateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._teamplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _existUserCard() {
    return this._ownerId === this._userId;
  }

  _existUserLike() {
    return this._likes.some(item => item._id === this._userId);
  }

  _toggleLike() {
    if (this._existUserLike()) {
      this._likeButton.classList.add('element__like-btn_active');
    } else {
      this._likeButton.classList.remove('element__like-btn_active');
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._cardLikes.textContent = likes.length;
    this._toggleLike();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButtonClick(this, this._cardId, this._existUserLike());
    });

    if (this._existUserCard()) {
      this._deleteButton.addEventListener('click', () => {
        this._handleDeleteButtonClick(this._cardId, this._element);
      });
    }

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._titleImg, this._urlImg);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__img');
    this._likeButton = this._element.querySelector('.element__like-btn');
    this._deleteButton = this._element.querySelector('.element__delete-btn');
    this._cardLikes = this._element.querySelector('.element__likes-counter');
    this._setEventListeners();

    this._cardTitle.textContent = this._titleImg;
    this._cardImage.src = this._urlImg;
    this._cardImage.alt = `${this._titleImg} (фото)`;
    this._cardLikes.textContent = this._likes.length;

    if (!this._existUserCard()) {
      this._deleteButton.classList.add('element__delete-btn_disabled');
    }

    if (this._existUserLike()) {
      this._likeButton.classList.add('element__like-btn_active');
    }

    return this._element;
  }
}
