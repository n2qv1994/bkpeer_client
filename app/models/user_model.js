var request    = require('request');
var https      = require('https');
var moment     = require('moment');
var config     = require('../../config/config');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

exports.login = function(req, res, next) {
  var username = req.body.username || '';
  var password = req.body.password || '';
  if(username === '') {
    username = "anonymous";
    password = "1";
  }

  var options = {
    url: config.authenticate,
    headers: {
      'Content-Type': 'application/json'
    },
    form: {
      username: username,
      password: password
    }
  };
  request.post(options, function(err, response, body) {
    if(!err && response.statusCode == 200) {
      req.session.user = JSON.parse(body).success;
      req.session.user.room_name = req.body.room_name;
      req.session.user.room_link = req.body.room_link;
      res.redirect('/room');
    }
    else {
      console.log(err);
      res.render('login', { data: {
                              title: "BK Media",
                              message: "Invalid credentials!",
                              host: config.HOST,
                              user: {
                                username: req.body.username,
                                password: req.body.password
                              }
                            }
                          });
    }
  });
};

exports.register = function(req, res, next) {
  var username = req.body.username || '';
  var password = req.body.password || '';

  var options = {
    url: config.register,
    headers: {
      'Content-Type': 'application/json'
    },
    form: {
      username: username,
      password: password
    },
  };
  request.post(options, function(err, response, body) {
    if(!err && response.statusCode == 200) {
      res.redirect('/');
    }
    else {
      res.render('register', { data: {
                              title: "BK Media",
                              message: "Invalid credentials!",
                              host: config.HOST,
                            }
                          });
    }
  });
};
