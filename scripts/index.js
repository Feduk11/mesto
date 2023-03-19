const openPopupProfile = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__status');
const formElement = document.querySelector('.popup__form');
const openPopupAddCard = document.querySelector('.profile__add-button')

const popupAddCard = document.querySelector('.popup_add-card');
const closePopupButtonAddCard = popupAddCard.querySelector('.popup__close');
const namePlaceInput = popupAddCard.querySelector('.popup__input_text_place');
const srcImageInput = popupAddCard.querySelector('.popup__input_text_src');
const formElementCard = popupAddCard.querySelector('.popup__form');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const closePopupButtonProfile = popupEditProfile.querySelector('.popup__close');
const formElementProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_text_name');
const statusInput = popupEditProfile.querySelector('.popup__input_text_status');

const popupViewPhoto = document.querySelector('.popup_open-image');
const popupImageText = popupViewPhoto.querySelector('.popup__image-text');
const popupImage = popupViewPhoto.querySelector('.popup__image');
const closePopupButtonViewPhoto = popupViewPhoto.querySelector('.popup__close');

// TEMPLATE ID И ОБЪЯВЛЕНИЕ КОНТЕЙНЕРА-СПИСКА
const cardList = document.querySelector('.elementscard');
const cardTemplate = document.querySelector('#element').content;
const cardLike = document.querySelectorAll('.element__like');

//МАССИВ ИСХОДНЫХ КАРТОЧЕК
const defaultCardElement = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  }
];

// ОБРАБОТКА КЛИКА
function openPopupEvent(currentButton, currentClick) {
  currentButton.addEventListener('click', currentClick);
};

// ОТКРЫТЬ ПОПАП
function openPopup(currentPopup) {
  currentPopup.classList.add('popup_opened');
};

// ЗАКРЫТЬ ПОПАП
function closePopup(closePopupButton) {
  closePopupButton.addEventListener('click', clickPopupClose);
};

function clickPopupClose(evt) {
  evt.target.closest('.popup').classList.remove('popup_opened');
};

// ЛАЙКНУТЬ КАРТОЧКУ
function likeButton(currentElement) {
  const cardLike = currentElement.querySelector('.element__like');
  cardLike.addEventListener('click', clickLikeButton);
};

function clickLikeButton(evt) {
  evt.target.classList.toggle('element__like_active');
};

// УДАЛИТЬ КАРТОЧКУ
const clickDeleteButton = (evt) => {
  evt.target.closest('.element').remove();
};

function deleteButton(currentElement) {
  const deleteButton = currentElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', clickDeleteButton);
};

// ПОПАП УВЕЛИЧЕНИЕ ФОТО
const clickPopupPhoto = (evt) => {
  openPopup(popupViewPhoto);
  popupImage.src = evt.target.src;
  popupImageText.textContent = evt.target.closest('.element').textContent;
};

function openPopupViewPhoto(currentElement) {
  const cardImage = currentElement.querySelector('.element__photo');
  openPopupEvent(cardImage, clickPopupPhoto);
};

closePopup(closePopupButtonViewPhoto);

// ОБРАБОТКА КНОПОК И КЛОНИРОВАНИЕ МАССИВА НА СТРАНИЦУ
const generateElement = (element) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  likeButton(cardElement);
  deleteButton(cardElement);
  openPopupViewPhoto(cardElement);
  // ПОЛУЧЕНИЕ КАРТИНКИ И ТЕКСТА ИЗ МАССИВА
  cardElement.querySelector('.element__photo').src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;
  // ДОБАВЛЕНИЕ КАРТОЧКИ В КОНЕЦ КОНТЕЙНЕРА
  cardList.append(cardElement);
};
// ВЫЗОВ МАССИВА КАРТОЧЕК ДЕФОЛТ
defaultCardElement.forEach(generateElement);

// ПОПАП ИЗМЕНЕНИЯ ПРОФИЛЯ
const clickPopupProfile = () => {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  statusInput.value = profileSubtitle.textContent;
};

openPopupEvent(openPopupProfile, clickPopupProfile);

const submitFormProfile = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = statusInput.value;
  popupEditProfile.classList.remove('popup_opened');
};

formElementProfile.addEventListener('submit', submitFormProfile);

closePopup(closePopupButtonProfile);

// ПОПАП ДОБАВЛЕНИЯ КАРТОЧКИ
const clickPopupAddCard = () => {
  openPopup(popupAddCard);
};

openPopupEvent(openPopupAddCard, clickPopupAddCard);

formElementCard.addEventListener('submit', submitFormAddCard);

function submitFormAddCard(evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  likeButton(cardElement);
  deleteButton(cardElement);
  openPopupViewPhoto(cardElement);
  cardElement.querySelector('.element__title').textContent = namePlaceInput.value;
  cardElement.querySelector('.element__photo').src = srcImageInput.value;
  cardList.prepend(cardElement);
  popupAddCard.classList.remove('popup_opened');
  namePlaceInput.value = '';
  srcImageInput.value = '';
};

closePopup(closePopupButtonAddCard);