'use strict';
// get the client
const mysql = require('mysql2');

const connect = () => {

// create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
  });
  return connection;
};

const select = (connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM users;',
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const findUser = (data, connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM users WHERE Fname = ?;',
      data,
      (err, results, fields) => {
        console.log('query näyttää tältä: '+(connection.query).sql);
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const findUserInfo = (data, connection, callback) => {
  // simple query
  connection.query(
      'SELECT userID FROM users WHERE nickname = ?;',
      data,
      (err, results, fields) => {
        console.log('query näyttää tältä: '+(connection.query).sql);
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const findUserID = (data, connection, callback) => {
  // simple query
  connection.query(
      'SELECT * FROM users WHERE userID = ?;',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const findUserName = (data, connection, callback) => {
  // simple query
  connection.query(
      'SELECT nickname FROM users WHERE userID = ?;',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const findChallenge = (data, connection, callback) => {
  // simple query
  connection.query(
      'SELECT challengeID FROM challenge WHERE name = ?;',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results);
      },
  );
};

const findImages = (data, connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT * FROM images WHERE challengeID = (SELECT challengeID FROM challenge WHERE name = ? ) ORDER BY timestamp',
      data,
      (err, results, fields) => {
        if (err) throw err;
        console.log('query näyttää tältä: '+(connection.query).sql);
        console.log('findImg tulokset: '+results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results, res);
      },
  );
};

const findAllImagesTime = ( connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT images.file, images.alt, images.thumb, images.timestamp, images.location, images.caption, images.likes, users.nickname ' +
      'FROM images, users ' +
      'GROUP BY images.imageID ' +
      'ORDER BY timestamp',
      (err, results, fields) => {
        if (err) throw err;
        console.log('query näyttää tältä: '+(connection.query).sql);
        console.log('findImg tulokset: '+results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results, res);
      },
  );
};

const findImagesData = (data, connection, callback, res) => {
  // simple query
  connection.query(
      'SELECT images.file, images.alt, images.thumb, images.timestamp, images.location, images.caption, images.likes, users.nickname \n' +
      'FROM images, users ' +
      'WHERE challengeID = (SELECT challengeID FROM challenge WHERE challenge.name = ? ) '+
      'GROUP BY images.imageID',
      data,
      (err, results, fields) => {
        if (err) throw err;
        console.log('query näyttää tältä: '+(connection.query).sql);
        console.log('findImg tulokset: '+results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback(results, res);
      },
  );
};


const insertAchi = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO achievements (userID, medalID)' +
      'VALUES (?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertAdmin = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO admins (title, challengeID, userID)' +
      'VALUES (?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertChall = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO achievements (challengeID, name, banner, description, creation_time, st, et, userID)' +
      'VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertComm = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO comments (commentID, timestamp, likes, imageID, userID, text)'+
      'VALUES (NULL, CURRENT_TIMESTAMP, DEFAULT, ?, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertImg = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO images (imageID, file, thumb, timestamp, location, alt, metadata, caption, likes, userID, challengeID)'+
      ' VALUES (NULL, ?, ?, CURRENT_TIMESTAMP, ?, ?, ?, ?, DEFAULT, ?, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const insertNewMedal = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO medals (medalID, name, description, icon)'+
      ' VALUES (NULL, ?, ?, ?),',
  data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
);
};

const joinChallenge = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO members (stat, userID, challengeID)'+
      ' VALUES (?, ?, ?),',
  data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
);
};


const grantMedal = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO achievements (userID, medalID)'+
      ' VALUES (?, ?)',
  data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
);
};

const assignAdmin = (data, connection, callback) => {
  // simple query
  connection.execute(
      'INSERT INTO admins (title, challengeID, userID)'+
      ' VALUES (?, ?, ?),',
  data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
);
};

const likeComment = (data, connection) => {
  // simple query
  connection.execute( //tää käyttöön tykkäyksien laskemiseen?
      'UPDATE comments SET likes = likes + 1 WHERE commentID = ?;',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
      },
  );
};

const likeImg = (data, connection) => {
  // simple query
  connection.execute( //tää käyttöön tykkäyksien laskemiseen?
      'UPDATE images SET likes = likes + 1 WHERE imageID = ?;',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
      },
  );
};

const update = (data, connection) => {
  // simple query
  connection.execute( //tää käyttöön tykkäyksien laskemiseen?
      'UPDATE bc_media SET category = ?, title = ?, details = ? WHERE mID = ? AND userID = ?;',
      data,
      (err, results, fields) => {
        // console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
      },
  );
};

const del = (data, connection) => {
  // simple query
  connection.execute(
      'DELETE FROM bc_media WHERE mID = ? AND userID = ?;', // can delete only current user's images
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
      },
  );
};

const login = (data, connection, callback) => {
  // simple query
  connection.execute(
      'SELECT * FROM users WHERE nickname = ? AND password = ?;',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const register = (data, connection, callback) => {
  // simple query
  console.log('Rekisteröinti käynnissä');
  connection.execute(
      'INSERT INTO users (Fname, Lname, email, bday, nickname, password, profilepic, profilethumb, st, et) '+
      'VALUES (?, ?, ?, ?, ?, ?, NULL, NULL, CURRENT_TIMESTAMP, NULL);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

const uploadimg = (data, connection, callback) => {
  // simple query
  console.log(data);
  console.log('Kuvan tietoja ladataan');
  connection.execute(
      'INSERT INTO images (file, thumb, timestamp, location, alt, metadata, caption, likes, userID, challengeID)' +
      ' VALUES (?, ?, CURRENT_TIMESTAMP, NULL, NULL, DEFAULT, ?, DEFAULT, 22, ?);',
      data,
      (err, results, fields) => {
        console.log(results); // results contains rows returned by server
        // console.log(fields); // fields contains extra meta data about results, if available
        console.log(err);
        callback();
      },
  );
};

module.exports = {
  connect: connect,
  select: select,
  findUser: findUser,
  findUserInfo: findUserInfo,
  findChallenge: findChallenge,
  findUserID: findUserID,
  findUserName: findUserName,
  findImages: findImages,
  findImagesData: findImagesData,
  findAllImagesTime: findAllImagesTime,
  //selectAll: selectAll,
  insertAchi: insertAchi,
  insertAdmin: insertAdmin,
  insertChall: insertChall,
  insertComm: insertComm,
  insertImg: insertImg,
  insertNewMedal: insertNewMedal,
  grantMedal: grantMedal,
  joinChallenge: joinChallenge,
  assignAdmin: assignAdmin,
  update: update,
  del: del,
  login: login,
  register: register,
  uploadimg : uploadimg,
};