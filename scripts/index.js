const editProfileButton = document.querySelector('.profile__edit-button');
const editPopup = document.querySelector('.popup');
const closePopupButton = document.querySelector('.popup__close');

let profileNameElement= document.querySelector('.profile__name');

let profileStatusElement = document.querySelector('.profile__status');

let profileNameInput = document.querySelector('.popup__input_text-name');

let profileStatusInput = document.querySelector('.popup__input_text-status');

let formElement = document.querySelector('.popup__form');

function popupOpen () {
  editPopup.classList.add('popup_opened');
  profileNameInput.value = profileNameElement.textContent
  profileStatusInput.value = profileStatusElement.textContent
}

editProfileButton.addEventListener('click', popupOpen);

function popupClose () {
  editPopup.classList.remove('popup_opened');
}

closePopupButton.addEventListener('click', popupClose)

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileNameElement.textContent = profileNameInput.value
  profileStatusElement.textContent = profileStatusInput.value
  editPopup.classList.remove('popup_opened');
}
formElement.addEventListener('submit', handleFormSubmit); 
