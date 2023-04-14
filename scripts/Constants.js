const popupList = Array.from(document.querySelectorAll('.popup'));

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.forms.profileEdit;
const inputName = formEditProfile.querySelector('.popup__input_el_name');
const inputAbout = formEditProfile.querySelector('.popup__input_el_about');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const formAddPlace = document.forms.addPlace;
const inputNamePlace = formAddPlace.querySelector('.popup__input_el_name-place');
const inputUrlPlace = formAddPlace.querySelector('.popup__input_el_url-place');

const placesContainer = document.querySelector('.elements__list');
const popupViewImage = document.querySelector('.popup_type_view-image');
const popupImg = popupViewImage.querySelector('.popup__img');
const popupTitleImg = popupViewImage.querySelector('.popup__title-img');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active',
}

export {
  popupList,
  profileTitle,
  profileSubtitle,
  profileEditButton,
  profileAddButton,
  popupEditProfile,
  formEditProfile,
  inputName,
  inputAbout,
  popupAddPlace,
  formAddPlace,
  inputNamePlace,
  inputUrlPlace,
  placesContainer,
  popupViewImage,
  popupImg,
  popupTitleImg,
  validationConfig,
};
