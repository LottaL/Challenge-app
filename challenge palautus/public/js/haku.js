'use strict';

//HAKU
//const hakuform = document.querySelector('#searchbar');
//const uusimmat = document.getElementById('uusimmat');
//console.log(uusimmat);


window.onload = function images() {

  const trig = document.getElementById("sivu").innerHTML;

    fetch('/'+trig).then(response => {
      console.log('haku.js fetch');
      console.log(response);
      return response.json();
    }).then((items) => {
      console.log('fetch then');
      makeImgList(imgToObj(items));
    }).catch(function(err) {
      console.log('fetch catch');
      //findresults(response);
      console.log(err);
    });

      function findresults(results) {
        console.log(results);
        let newresults = [];
        for (let i = 0; i < results.length; i++) {
          let result = results[i];
          //push result-object into new array
          newresults.push(result);
        }
        console.log('findresults in haku.js' + newresults);// DEBUG
        return newresults;
        /*document.querySelector('img').src = osoite;
        document.querySelector('img').alt = nimi;
        document.querySelector('figcaption').innerText = kuvaus;*/
      }

      const imgToObj = (results) => {
        console.log('imgToObj lähtö: ' + results);
        let imagelist = [];
        for (let i = 0; i < results.length; i++) {
          let result = results[i];

          let file = result.file;
          let alt = result.alt;
          let thumb = result.thumb;
          let time = result.timestamp;
          let loc = result.location;
          let caption = result.caption;
          let likes = result.likes;
          let user = result.nickname;

          //Create object for the img
          let newImg = {
            file: file,
            thumb: thumb,
            time: time,
            loc: loc,
            alt: alt,
            caption: caption,
            likes: likes,
            user: user,
          };
          //var newImgJSON = JSON.stringify(newImg);
          //push show-object into new array
          imagelist.push(newImg);
        }
        console.log(imagelist);
        return imagelist;
      };

      const makeImgList = (array) => {
        const biglist = document.getElementsByClassName('card-group')[0];
        //console.log("biglist"); DEBUG

        for (var i = 0; i < array.length; i++) {
          let list = array[i];
          var card = document.createElement("div");
          card.setAttribute("class", "card");
          let image = list.file;
          console.log(image);

          if (list.thumb == null) {
            var thumb = null;
          } else {
            var thumb = '<li><img src="' + list.thumb + '"></li>';
          }

          let timest = list.time.split('T');
          let date = timest[0];
          let timet = timest[1];
          let clock = timet.split('.');
          var time = 'Posted ' + date + ' at ' + clock[0];

          if (list.loc == null) {
            var locc = 'Unknown';
          } else {
            var locc = list.loc;
          }
          var loc = '<li><p>Location: ' + locc + '</p></li>';

          if (list.caption == null) {
            var caption = '...';
          } else {
            var caption = list.caption;
          }

          let inner = '<img class="card-img-top" src="' + image +
              '" alt="' + list.alt + '" width="400"> ' +
              '<div class="card-body"> ' +
              '<h5 class="card-title"><a href="#">#haaste</a></h5> ' +
              '<p class="card-text">' + list.user + ' ' + time + '<br>Likes: ' +
              list.likes + '<br> ' + caption + ' </p>' +
              '<a href="#" class="button" data-toggle="modal" data-target="#Modal2">Katso julkaisu</a>' +
              '</div></div>';

          card.innerHTML = inner;
          biglist.appendChild(card);
        }
      };
    };
/*
const search = (evt) => {
  console.log('haku.js');
  evt.preventDefault();
  const fd = new FormData(hakuform);
  const asetukset = {
    method: 'post',
    body: fd,
  };

  fetch('/search', asetukset).then((response) => {
    console.log('haku.js fetch');
    return response.json();
    console.log(response.json());
  }).then((items) => {
    console.log('fetch then');
    makeImgList(imgToObj(items), 'results');
  }).catch(function(err) {
    console.log('fetch catch');
    //findresults(response);
    console.log(err);
  });

  function findresults(results) {
    console.log(results);
    let newresults = [];
    for (let i = 0; i < results.length; i++) {
      let result = results[i];
      //push result-object into new array
      newresults.push(result);
    }
    console.log('findresults in haku.js'+newresults);// DEBUG
    return newresults;
  }
};

const imgToObj = (results) => {
  console.log('imgToObj lähtö: '+ results);
  let imagelist = [];
  for (let i = 0; i < results.length; i++) {
    let result = results[i];

    let file = result.file;
    let alt = result.alt;
    let thumb = result.thumb;
    let time = result.timestamp;
    let loc = result.location;
    let caption = result.caption;
    let likes = result.likes;
    let user = result.nickname;

    //Create object for the img
    let newImg = {
      file: file,
      thumb: thumb,
      time: time,
      loc: loc,
      alt: alt,
      caption: caption,
      likes: likes,
      user: user,
    };
    //var newImgJSON = JSON.stringify(newImg);
    //push show-object into new array
    imagelist.push(newImg);
  }
  console.log(imagelist);
  return imagelist;
};

const makeImgList = (array, id) => {
  const biglist = document.getElementById(id);
  //console.log("biglist"); DEBUG

  for (var i = 0; i < array.length; i++) {
    let list = array[i];
    var card = document.createElement("div");
    card.setAttribute("class", "card");

    if (list.thumb == null) {
      var thumb = null;
    } else {
      var thumb = '<li><img src="' + list.thumb + '"></li>';
    }

    let timest = list.time.split('T');
    let date = timest[0];
    let timet = timest[1];
    let clock = timet.split('.');
    var time = 'Posted ' + date + ' at ' + clock[0];

    if (list.loc == null) {
      var locc = 'Unknown';
    } else {
      var locc = list.loc;
    }
    var loc = '<li><p>Location: ' + locc + '</p></li>';

    if (list.caption == null) {
      var caption = '...';
    } else {
      var caption = list.caption;
    }

    let inner = '<img class="card-img-top" src="' + list.file + '" alt="'+list.alt+'"> ' +
        '<div class="card-body"> ' +
        '<h5 class="card-title"><a href="#">#haaste</a></h5> ' +
        '<p class="card-text">' + list.user + ' ' + time + '<br>Likes: ' + list.likes + '<br> ' + caption + ' </p>'+
        '<a href="#" class="button" data-toggle="modal" data-target="#Modal2">Katso julkaisu</a>' +
    '</div></div>';


    card.innerHTML = inner;
    biglist.appendChild(card);
  }
};
*/

const debug = (evt) => {
  alert('debug');
  console.log();
};

//hakuform.addEventListener('submit', search);
//uusimmat.addEventListener('click', images);