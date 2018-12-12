'use strict';

// KUVAN LATAAMINEN

const addImage = document.querySelector('#uploadimg');

const uploadimg = (evt) => {
  evt.preventDefault();
  const fd = new FormData(addImage);
  const asetukset = {
    method: 'post',
    body: fd,
  };

  fetch('/upload', asetukset).then((response) => {
    console.log(response.text());//TÄÄ PALAUTTAA MYSTISYYKSIÄ mut noh, toimii well enough
    return response.json();
  }).then((json) => {
    const polku = 'uploads/';
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
    });
  });
};

addImage.addEventListener('submit', uploadimg);