'use strict';

// REKISTERÖITYMINEN

const lomake = document.querySelector('#lomake');
//const lista = document.querySelector('#result');
console.log(lomake);

const registerForm = (evt) => {
  evt.preventDefault();
  const fd = new FormData(lomake);
  const asetukset = {
    method: 'post',
    body: fd,
  };

  fetch('/register', asetukset).then((response) => {
    console.log( response);
    return response.json();
  })/*.then((json) => {
    const polku = 'files/';
    lista.innerHTML = '';
    json.forEach(item => {
      const li = document.createElement('li');
      if (item.mimetype.includes('image')) {
        const kuva = document.createElement('img');
        kuva.src = polku + item.file;
        li.appendChild(kuva);
      } else if (item.mimetype.includes('audio')) {
        const aud = document.createElement('audio');
        aud.setAttribute('controls', 'controls');
        aud.src = polku + item.file;
        li.appendChild(aud);
      } else {
        const vid = document.createElement('video');
        vid.src = polku + item.file;
        vid.setAttribute('controls', 'controls');
        li.appendChild(vid);
      }
      lista.appendChild(li);
    })*;

  })*/;
};

lomake.addEventListener('submit', alert('button'));
//lomake.addEventListener('submit', registerForm);