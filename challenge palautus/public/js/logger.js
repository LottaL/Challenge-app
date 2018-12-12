'use strict';

const login = document.querySelector('#login');
//const lista = document.querySelector('#result');

const loginUser = (evt) => {
  evt.preventDefault();
  const fd = new FormData(lomake);
  const asetukset = {
    method: 'post',
    body: fd,
  };

  fetch('/login', asetukset).then((response) => {
    return response.json();
  })
};

login.addEventListener('submit', loginUser);