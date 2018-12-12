'use strict';
require('dotenv').config();
const express = require('express');
const app = express();

const multer  = require('multer');
const upload = multer({ dest: 'public/uploads' });

const database = require('./modules/database');
const resize = require('./modules/resize');


const fs         = require('fs');
const https      = require('https');
const http       = require('http');
const bodyParser = require('body-parser');
const passport   = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
//----------------------------------------------------

//serving static files: html pages etc
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const connection = database.connect();

/*
//test connection
database.select(connection, (results) => {
  console.log(results);
});
*/

const registerUser = (data, res, next) => {
  database.register(data, connection, () => {
    next();
  });
};

const select = (req, next) => {
  database.select(connection, (results) => {
    req.custom = results;
    next();
  });
};

const find = (data, res, next) => {
  //console.log('find: '+data);
  database.findUser(data, connection, (results) => {
    //req.custom = results;
    //console.log(results[0].Fname);
    next();
  });
};

const findImg = (data, res, next) => {
  console.log('app.js findimg'+data);
  database.findImages(data, connection, (results) => {
    //console.log('findImg app.js tulokset: '+results);
    imgToObj(results);
    next();
  });
};




const uploadImg = (data, res, next) => {
  database.uploadimg(data, connection, (res) => {
    next();
  });
};
/*
database.select(connection, (results) => {
  console.log(results);
});*/

/*//basic request&response
app.get('/', (req, res) => {
  res.send('hey' + res);
  //console.log(res);
});*/


//error handler, NOT SURE IF WORKING
app.use((err, req, res, next) => {
  console.log(`Error happened: ${err}`);
});

//go to page
app.get('/rekisteroidy', (req, res) => {
  res.sendFile(__dirname + '/public/rekist.html');//sends html page to display
  //console.log(res);
});

app.get('/kirjaudu', (req, res) => {
  res.sendFile(__dirname + '/public/kirjaudu.html');//sends html page to display
  //console.log(res);
});

app.get('/julkaise', (req, res) => {
  res.sendFile(__dirname + '/public/tester.html');//sends html page to display
  //console.log(res);
});

app.get('/haku', (req, res) => {
  res.sendFile(__dirname + '/public/search.html')
});
/*
app.post('/upload', upload.single('file-to-upload'), (req, res) => {
  res.redirect('/upload');
});
*/

//tallenna kuva
app.use('/upload', upload.single('file-to-upload'), (req, res, next) => {
  console.log('APP.POST UPLOAD');
  console.log(req.file.originalname);
  var extension = resize.extension(req.file.originalname);
  if ((extension != 'jpg')&&(extension != 'jpeg')&&(extension != 'png')) {
    alert('Ole hyvä ja anna kuva .jpg- tai .png-muodossa!');
    //poistetaan upload.singlessä ladattu kuva
  } else {
    resize.resizeimg(req.file.path, 150, 'uploads/thumbs/' +
        req.file.filename + '_thumb' );
    }
  //console.log(req.file);
  //console.log(req.body);
  //tallennetaan saman tien tietokantaan
  const data = [
    'uploads/' + req.file.filename ,
    'uploads/thumbs/' + req.file.filename ,
    //req.body.location,
    //req.body.alt,
    //req.body.metadata, //tähän tulee koko exif-data -json jos saadaan se irti
    req.body.caption,
    //req.body.user,
    req.body.challenge,
  ];
  //console.log(data);
  uploadImg(data, res, next);
  next();
});



// lähetä tiedot selaimeen
app.use('/upload', (req, res) => {
  res.send(req.custom);
  res.redirect('/julkaise');
});

// tallenna käyttäjä tietokantaan
app.use('/register', upload.none(), (req, res, next) => {
  console.log('app use register KÄYTÖSSÄ');
  const data = [
    req.body.etunimi,
    req.body.sukunimi,
    req.body.email,
    req.body.bday,
    req.body.nickname,
    req.body.salasana
  ];
  registerUser(data, res, next);
  next();
});

// hae päivitetyt tiedot tietokannasta
app.use('/register', (req, res, next) => {
  select(req, next);
  res.redirect('/rekist.html');
});

// lähetä tiedot selaimeen
app.use('/register', (req, res) => {
  res.send(req.custom);
  res.redirect('/rekist.html');
});


//hae kuvia

// hae tiedot tietokannasta
app.use('/search', upload.none(), (req, res) => {
  console.log('app.js search triggered');
  //console.log(req.body);
  const data = [
    req.body.search,
  ];
  database.findImagesData(data, connection, cb, res);
  //findImg(data, res, next);
  //database.findUserID(res.body.userID)

});


// lähetä tiedot selaimeen
app.use('/search', (req, res) => {
  //res.send(req.custom);
  res.redirect('/haku');

});

// get all images EI KÄYTÖSSÄ
app.get('/images', (req, res) => {
  database.findAllImagesTime(connection, cb, res);
});

app.get('/joulu', (req, res) => {
  database.findImagesData('Taidejoulukalenteri 2018' ,connection, cb, res);
});

app.get('/vege', (req, res) => {
  database.findImagesData('Vegaanihaaste' ,connection, cb, res);
});

// database select calback
const cb = (result, res) => {
  console.log('database callback');
  console.log(result);
  res.send(result);
};

app.listen(3000);