const profileTitle = document.querySelector('.profile__name');
const profileSubtitle = document.querySelector('.profile__status');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_edit_profile');
const inputName = popupEditProfile.querySelector('.popup__input_text_name');
const inputStatus = popupEditProfile.querySelector('.popup__input_text_status');
const formEditProfile = popupEditProfile.querySelector('[name="profileForm"]');

const popupAddPlace = document.querySelector('.popup_edit_card');
const inputNamePlace = popupAddPlace.querySelector('.popup__input_text_place');
const inputUrlPlace = popupAddPlace.querySelector('.popup__input_text_src');
const formAddPlace = popupAddPlace.querySelector('[name="popupForm"]');

const popupViewImage = document.querySelector('.popup_edit_image');
const popupImg = popupViewImage.querySelector('.popup__image');
const popupTitleImg = popupViewImage.querySelector('.popup__image-text');

const popupList = Array.from(document.querySelectorAll('.popup'));

const elementTemplate = document.querySelector('#element').content;
const elementsContainer = document.querySelector('.elements');
const buttonElement = formAddPlace.querySelector(validationConfig.submitButtonSelector);
const inputList = Array.from(formAddPlace.querySelectorAll(validationConfig.inputSelector));

const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeEsc);
};

//key esc
const closeEsc = (event => {
  if (event.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
});

popupList.forEach(popup => {
  popup.addEventListener('click', event => {
    if (event.target.classList.contains('popup_opened') || event.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const saveFormPlace = function (event) {
  event.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputStatus.value;
  closePopup(popupEditProfile);
};

// ОБРАБОТЧИК ЛАЙКА
const handleLikeButtonClick = event => {
  const target = event.target;
  target.classList.toggle('element__like_active');
};

// ОБРАБОТЧИК УДАЛЕНИЯ
const handleDeleteButtonClick = event => {
  const target = event.target;
  const listItem = target.closest('.element');
  listItem.remove();
};

// ДОБАВЛЕНИЕ НОВЫХ КАРТОЧЕК И УВЕЛИЧЕНИЕ ФОТО
const createCard = card => {
  const placeElement = elementTemplate.querySelector('.element').cloneNode(true);
  const cardTitle = placeElement.querySelector('.element__title');
  const cardImage = placeElement.querySelector('.element__photo');
  const cardLike = placeElement.querySelector('.element__like');
  const cardDelete = placeElement.querySelector('.element__delete');

  cardTitle.textContent = card.name;
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', `${card.name} (фото)`);

  cardLike.addEventListener('click', handleLikeButtonClick);
  cardDelete.addEventListener('click', handleDeleteButtonClick);

  cardImage.addEventListener('click', () => {
    openPopup(popupViewImage);
    popupImg.setAttribute('src', card.link);
    popupImg.setAttribute('alt', card.name);
    popupTitleImg.textContent = card.name;
  });

  return placeElement;
};

defaultCards.forEach((card) => {
  elementsContainer.append(createCard(card));
});

const addCard = event => {
  event.preventDefault();
  const form = event.target;
  const card = {
    name: inputNamePlace.value,
    link: inputUrlPlace.value,
  };
  elementsContainer.prepend(createCard(card));
  closePopup(popupAddPlace);
  form.reset();
};

profileEditButton.addEventListener('click', () => {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputStatus.value = profileSubtitle.textContent;
});

profileAddButton.addEventListener('click', () => {
  inputNamePlace.value = '';
  inputUrlPlace.value = '';
  toggleButtonValidity(inputList, buttonElement, validationConfig.inactiveButtonClass);
  openPopup(popupAddPlace);
});

formEditProfile.addEventListener('submit', saveFormPlace);
formAddPlace.addEventListener('submit', addCard);