const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

let profileNameElement= document.querySelector('.profile__name');

let profileStatusElement = document.querySelector('.profile__status');

let profileNameInput = document.querySelector('.popup__input_text_name');

let profileStatusInput = document.querySelector('.popup__input_text_status');

let formElement = document.querySelector('.popup__form');

// TEMPLATE ID И ОБЪЯВЛЕНИЕ КОНТЕЙНЕРА-СПИСКА-------------------------------
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

function openPopup () {
  editPopup.classList.add('popup_opened');
  profileNameInput.value = profileNameElement.textContent;
  profileStatusInput.value = profileStatusElement.textContent;
}

editProfileButton.addEventListener('click', openPopup);

function popupClose () {
  editPopup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', popupClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value;
  profileStatusElement.textContent = profileStatusInput.value;
  popupClose ();
}
formElement.addEventListener('submit', handleFormSubmit); 

// ЛАЙКНУТЬ КАРТОЧКУ----------------------------------
function likeButton(currentElement) {
  const cardLike = currentElement.querySelector('.element__like');
  cardLike.addEventListener('click', clickLikeButton);
};

function clickLikeButton(evt) {
  evt.target.classList.toggle('element__like_active');
};

// УДАЛИТЬ КАРТОЧКУ-----------------------------------
const clickDeleteButton = (evt) => {
  evt.target.closest('.element').remove();
};

function deleteButton(currentElement) {
  const deleteButton = currentElement.querySelector('.element__delete');
  deleteButton.addEventListener('click', clickDeleteButton);
};

// ОБРАБОТКА КНОПОК И КЛОНИРОВАНИЕ МАССИВА НА СТРАНИЦУ------------
const generateElement = (element) => {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  likeButton(cardElement);
  deleteButton(cardElement);
// ПОЛУЧЕНИЕ КАРТИНКИ И ТЕКСТА ИЗ МАССИВА
  cardElement.querySelector('.element__photo').src = element.link;
  cardElement.querySelector('.element__title').textContent = element.name;
// ДОБАВЛЕНИЕ КАРТОЧКИ В КОНЕЦ КОНТЕЙНЕРА
  cardList.append(cardElement);
};
// ВЫЗОВ МАССИВА КАРТОЧЕК ДЕФОЛТ
defaultCardElement.forEach(generateElement);
