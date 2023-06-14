export default class Card {
  constructor(data, teamplateSelector, handleCardClick) {
    this._titleImg = data.name;
    this._urlImg = data.link;
    this._teamplateSelector = teamplateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._teamplateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeButtonClick(event) {
    event.target.classList.toggle('element__like_active');
  };

  _handleDeleteButtonClick(event) {
    event.target.closest('.element').remove();
  };

  _setEventListeners() {
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete-place');

    this._likeButton.addEventListener('click', (event) => {
      this._handleLikeButtonClick(event);
    });

    this._deleteButton.addEventListener('click', (event) => {
      this._handleDeleteButtonClick(event);
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._titleImg, this._urlImg);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardTitle = this._element.querySelector('.element__title');
    this._cardImage = this._element.querySelector('.element__img');
    this._setEventListeners();

    this._cardTitle.textContent = this._titleImg;
    this._cardImage.src = this._urlImg;
    this._cardImage.alt = `${this._titleImg} (фото)`;

    return this._element;
  }
}
