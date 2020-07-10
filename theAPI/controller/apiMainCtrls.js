
var User = require('../model/userSchema.js');
var Comment = require('../model/commentsSchema');
var paginate = require('mongoose-range-paginate');
var pugCompiler = require('../../shared/pugCompiler');
var nodemailer = require('nodemailer');
var passport = require('passport');
var mongoose    = require('mongoose');
var serverSideInputValidation = require('../../shared/serverSideInputValidation.js');

var sortKey = 'time'
var sort = '-' + sortKey
var sortDocsFrom = 0;

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.getIndexResponse = function(req, res) {
  sendJSONresponse(res, 200), { "message": "getIndexResponse Response!!!" };
};

module.exports.getUserHomeResponse = function(req, res) {
  console.log('####### > apiMainCtrls.js > getUserHomeResponse XXXXXXXXXXXXXXXXX')
  sendJSONresponse(res, 200), { "message": "getUserHomeResponse Response!!!" };
};

var buildGetCommentsResponse = function(req, res, results) {
  var responseBody = [];
  results.forEach(function(doc) {
    responseBody.push({
      id: doc._id,
      displayname: doc.displayname,
      commenterId: doc.commenterId,
      city: doc.city,
      state: doc.state,
      datecreated: doc.datecreated,
      candidate: doc.candidate,
      comment: doc.comment,
      recommended: doc.recommended,
      subComments: doc.subComments
    });
  });
  return responseBody;
};


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

function getQuery() {
  return Comment.find()
    .where({})
}

module.exports.getCommentsResponse = function(req, res) {
  paginate(getQuery(), { sort: sort, limit: 5 }).exec(function (err, results) {
    var responseBody;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      sortDocsFrom = 4;
      responseBody = buildGetCommentsResponse(req, res, results);
      sendJSONresponse(res, 200, responseBody);
    }
  })
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


module.exports.getUserProfileResponse = function(req, res) {
  if (req.params && req.params.userid) {
    User.findById(req.params.userid).exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, { "message": "userid not found" });
          return;
        } else if (err) {
          sendJSONresponse(res, 404, err);
          return;
        }
        sendJSONresponse(res, 200, user);
      });
  } else {
    sendJSONresponse(res, 404, { "message": "No userid in request" });
  }
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


var doAddComment = function(req, res, location, author) {
  if (!location) {
    sendJSONresponse(res, 404, "locationid not found");
  } else {
    location.reviews.push({
      author: author,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    });
    location.save(function(err, location) {
      var thisReview;
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        updateAverageRating(location._id);
        thisReview = location.reviews[location.reviews.length - 1];
        sendJSONresponse(res, 201, thisReview);
      }
    });
  }
};


module.exports.postMainCommentResponse = function(req, res) {
  Comment.create({
    displayname: req.body.displayname,
    commenterId: req.body.commenterId,
    city: req.body.city,
    state: req.body.state,
    candidate: req.body.candidate,
    comment: req.body.comment
  }, function(err, electioncomment) {
    if (err) {
      sendJSONresponse(res, 400, err);
    } else {
      sendJSONresponse(res, 201, electioncomment);
    }
  });
};


module.exports.postSubCommentResponse = function(req, res) {
  if (!req.params.subcommentid) {
    sendJSONresponse(res, 404, { 'message': "subcommentid not found" });
    return; 
  }
  Comment.findById(req.params.subcommentid).select('subComments').exec(function(err, comment) {
    if (err) {
      sendJSONresponse(res, 400, err);
    }else{
      comment.subComments.push({
        displayname: req.body.displayname,
        commenterId: req.body.commenterId,
        city: req.body.city,
        state: req.body.state,
        comment: req.body.comment
      });
      comment.save(function(err, comment) {
        var newComment;
        if (err) {
          sendJSONresponse(res, 400, err);
        } else {
          newComment = comment.subComments[comment.subComments.length - 1];
          sendJSONresponse(res, 201, newComment);
        }
      });
    }
  });
};

var getCommentUser = function(req, res, callback) {
  if (req.payload.email) {
    User.findOne({ email : req.payload.email }).exec(function(err, user) {
        if (!user) {
          sendJSONresponse(res, 404, { "message": "User not found" });
          return;
        } else if (err) {
          console.log(err);
          sendJSONresponse(res, 404, err);
          return;
        }
        console.log(user);
        callback(req, res, user.name);
      });
  } else {
    sendJSONresponse(res, 404, { "message": "User not found" });
    return;
  }
};


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */


module.exports.getOneCommentResponse = function(req, res) {
  if (req.params && req.params.commentid) {
    User.findById(req.params.commentid).exec(function(err, results) {
        if (!results) {
          sendJSONresponse(res, 404, {"message": "commentid not found"});
        } else if (err) {
          sendJSONresponse(res, 404, err);
        }
        sendJSONresponse(res, 200, results);
      });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No commentid in request"
    });
  }
};


module.exports.editOneComment = function(req, res) {
  //
};

module.exports.deleteOneComment = function(req, res) {
  var commentsid = req.params.commentsid;
  if (!commentsid) {
    sendJsonResponse(res, 404, {
    "message": "Not found, locationid and reviewid are both required"
  });
    return; 
  }
  
  if (commentsid) {
    User.findByIdAndRemove(commentsid).exec(function(err, comment) {
          if (err) {
            sendJSONresponse(res, 404, err);
          }
          sendJSONresponse(res, 204, null);
        }
    );
  } else {
    sendJSONresponse(res, 404, { "message": "No commentid in request" });
  }
};


/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */


module.exports.getResetPasswordResponse = function(req, res) {
  sendJSONresponse(res, 200), { "message": "getResetPasswordResponse Response!!!" };
};

module.exports.postValidateLogin = function(req, res, next) {
  console.log('#### postValidateLogin');

  if(!req.body.email || !req.body.password) {
    console.log('#### postValidateLogin > error 1');
    sendJSONresponse(res, 400, { 'message': 'All fields required' });

  }else{

    passport.authenticate('local', function(err, user, info){
      if (err) {
        console.log('#### postValidateLogin > error 2');
        sendJSONresponse(res, 404, err);
        return;
      }
      if (info) {
        console.log('#### postValidateLogin > error 3');
        sendJSONresponse(res, 401, info);
        return;
      }
      if(user){
        console.log('#### postValidateLogin > USER: ', user.id);
        req.logIn(user, function(err) {
          if (err) { 
            console.log('#### postValidateLogin > error 4');
            sendJSONresponse(res, 404, err);
            return;
          }
          User.findById(user.id).exec(function(err, user) {
            if (err) {
              console.log('#### postValidateLogin > error 5');
              sendJSONresponse(res, 404, err);
              return;
            }
            if(user){
              user.previouslogin = user.lastlogin;
              user.lastlogin = new Date();
              user.save(function(err, success) {
                if (err) {
                  console.log('#### postValidateLogin > error 6');
                  sendJSONresponse(res, 404, err);
                } else { 
                  var htitle = 'Election App 2016!';
                  var stitle = 'Log In or Sign Up to join the discussion';
                  var data = {
                    title: 'ThisGreatApp!',
                    pageHeader: {
                      title: htitle
                    },
                    subtitle: stitle,
                    prevLogin: req.user.previouslogin
                  };
                  sendJSONresponse(res, 201, { 'message': 'success' });
                  /*
                  var relativeTemplatePath = 'userHome';
                  pugCompiler.compile(relativeTemplatePath, data, function(err, html){
                    if(err){
                      console.log('####### > apiMainCtrls > postAuthenticateLogin > pugCompiler.compile > ERROR: ' + err);
                    }
                    console.log('####### > apiMainCtrls > postAuthenticateLogin > pugCompiler.compile > SUCCESS');
                    sendJSONresponse(res, 201, html);
                  });
                  */
                  /*
                  var relativeTemplatePath = 'userHome';
                  var absoluteTemplatePath = process.cwd() + '/theServer/views/' + relativeTemplatePath + '.pug';
                  pug.renderFile(absoluteTemplatePath, data, function(err, html){
                    if(err){
                      console.log('#### pug.renderFile111 > ERROR: ' + err);
                    }
                    sendJSONresponse(res, 200, html);
                  });
                  */
                }
              });
            }else{
              sendJSONresponse(res, 404, { 'message': 'userid not found' });
            }
          });
        });
      } else {
        sendJSONresponse(res, 401, { 'message': 'error' });
      }
    })(req, res, next);
  }
};

module.exports.postLoginResponse = function(req, res, next) {
  console.log('#### apiMainCtrls > postLoginResponse')
  console.log('#### apiMainCtrls > postLoginResponse > req.user: ', req.user);

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, { "message": "All fields required" });
  }else{

    passport.authenticate('local', function(err, user, info){
      if (err) {
        console.log('#### apiMainCtrls > postLoginResponse > error 2');
        sendJSONresponse(res, 404, err);
        return;
      }
      if (info) {
        console.log('#### apiMainCtrls > postLoginResponse > error 3');
        sendJSONresponse(res, 401, info);
        return;
      }

      if(user){
        console.log('#### apiMainCtrls > postLoginResponse > passport.authenticate > HERE 2222 !!!!!!!!! req.user: : ', req.user);

        req.logIn(user, function(err) {
          console.log('#### apiMainCtrlsX > postLoginResponse > req.logIn');
          if (err) { 
            console.log('#### apiMainCtrls > postLoginResponse > req.logIn > error 4');
            sendJSONresponse(res, 404, err);
            return;
          }
          console.log('#### apiMainCtrls > postLoginResponse > req.logIn > HERE 3333 !!!!!!!!! req.user: : ', req.user);
          user.previouslogin = user.lastlogin;
          user.lastlogin = new Date();
          user.save(function(err, success) {
            if (err) {
              console.log('#### apiMainCtrls > postLoginResponse > error 6');
              sendJSONresponse(res, 404, err);
            } else { 
              console.log('#### apiMainCtrls > postLoginResponse > req.logIn SUCCESSSSSSSSS');
              sendJSONresponse(res, 201, { 'message': 'success' });
            }
          });
        });
      }

    })(req, res, next);
  }
};


module.exports.postLoginResponseXXX = function(req, res) {
  console.log("####### > apiMainCtrls > postLoginResponse")
  if(!req.body.email) {
    sendJSONresponse(res, 400, { "message": "All fields required" });
  }else{
    User.findOne({ email: req.body.email }, function(err, user) {
      if (err) {
        sendJSONresponse(res, 400, err);
        return;
      } 
      if (!user || user === null) {
        sendJSONresponse(res, 404, user);
        return;
      }
      console.log("####### > apiMainCtrls > postLoginResponse > sendJSONresponse123")
      sendJSONresponse(res, 201, user);
    });
  }
};

/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

module.exports.updateUserResponse = function(req, res) {
  if (!req.params.userid) {
    sendJSONresponse(res, 404, { "message": "All fields required" });
    return;
  }
  User.findById(req.params.userid).exec(function(err, user) {
    if (err) {
      sendJSONresponse(res, 400, err);
      return;
    } 
    if (!user || user === null) {
      sendJSONresponse(res, 404, user);
      return;
    }
    user.previouslogin = user.lastlogin;
    user.lastlogin = new Date();
    user.save(function(err, success) {
      if (err) {
        sendJSONresponse(res, 404, err);
      } else {
        sendJSONresponse(res, 200, success);
      }
    });
  });
};

/* +++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++ */

var testValidatedUserInput = function (v) {
  for (var key in v){
    console.log('####### > testValidatedUserInput: ', key, ' : ', v[key]);
    if(v[key].hasOwnProperty('error')){
      console.log('####### > testValidatedUserInput > error: ', key, ' : ', v[key]);
      return true;
    }
  }
};

var evaluateUserEmail = function (req, res, callback) {
  console.log('#### apiMainCtrls > evaluateUserEmail +++')
  var resp;
  User.findOne( { email: req.body.email } ).exec(function(err, user) {
    if (err) {
      console.log('#### apiMainCtrls > evaluateUserEmail +++111')
      resp = {status: 404, message: 'error'};
      callback(req, res, resp);
    }else {
      if(req.body.expectedResponse === 'false'){
        if (user) {
          console.log('#### apiMainCtrls > evaluateUserEmail +++222')
          resp = {status: 201, message: 'error'};
          callback(req, res, resp);
        }else{
          console.log('#### apiMainCtrls > evaluateUserEmail +++333')
          resp = {status: 201, message: 'success'};
          callback(req, res, resp);
        }
      }else{
        if (!user) {
          console.log('#### apiMainCtrls > evaluateUserEmail +++444')
          resp = {status: 201, message: 'error'};
          callback(req, res, resp);
        }else{
          console.log('#### apiMainCtrls > evaluateUserEmail +++555')
          resp = {status: 201, message: 'success'};
          callback(req, res, resp);
        }
      }
    }
  });
};

module.exports.ajaxSignUpUser = function(req, res){
  console.log('####### > apiMainCtrls > ajaxSignUpUser');
  //var stateJsonObj = JSON.parse(req.body.state);
  //req.body.state = stateJsonObj;

var voo = { _csrf: req.body._csrf,
  displayname: 'Us ',
  email: '  aaa@aaaa.com',
  confirmEmail: 'aaa@aaaaX.com    ',
  password: 'qqqq',
  confirmPassword: 'qqqq ',
  firstname: '      CaaaaaaaaaaaaaaaaXXXXaaaAzzzzzzzzzzzzzdddddd       ',
  lastname: 'AaaaaaNbbbbbbbHhhhhXXXXhhhUuuuuuuuuuXxxxxxxxx     ',
  city: '',
  state: { initials: 'AK', full: '' },
  expectedResponse: 'false' }

 req.body = voo;

  console.log('####### > apiMainCtrls > ajaxSignUpUser > req.body!!!1:',req.body)
  /*
  console.log('####### > apiMainCtrls > ajaxSignUpUser > req.body2:',req.body)
  console.log('####### > apiMainCtrls > ajaxSignUpUser > req.body.firstname 1:',req.body.firstname)
  console.log('####### > apiMainCtrls > ajaxSignUpUser > req.body.lastname 1:',req.body.lastname)
  console.log('####### > apiMainCtrls > ajaxSignUpUser > req.body.city 1:',req.body.city)
  */
  /*
  req.body.displayname = 'Us ';
  req.body.email = '  aaa@aaaa.com';
  req.body.confirmEmail = 'aaaa';
  req.body.password = ' qq';
  req.body.confirmPassword = 'qqqq';
  req.body.firstname = '      CaaaaaaaaaaaaaaaaXXXXaaaAzzzzzzzzzzzzzdddddd       ';
  req.body.lastname = 'AaaaaaNbbbbbbbHhhhhXXXXhhhUuuuuuuuuuXxxxxxxxx     ';
  req.body.city = '';
  */

  serverSideInputValidation(req, res, function(req, res, validatedUserInput) {

    console.log('####### > apiMainCtrls > ajaxSignUpUser > req.body!!!2:',req.body)
    console.log('####### > serverMainCtrls.js > postSignup > serverSideInputValidation > validatedUserInput1: ', validatedUserInput);

    /*console.log('####### > serverMainCtrls.js > postSignup > req.body.firstname 2:',req.body.firstname)
    console.log('####### > serverMainCtrls.js > postSignup > req.body.lastname 2:',req.body.lastname)
    console.log('####### > serverMainCtrls.js > postSignup > req.body.city 2:',req.body.city)*/

    // Object.keys(validatedUserInput).length)
    // if(validatedUserInput.hasOwnProperty('error'))
    // jsonObj.hasOwnProperty('error')
    // if(Object.keys(validatedUserInput).length > 0)

    if(testValidatedUserInput(validatedUserInput)){
      console.log('####### > validatedUserInput / BAD DATA !!!: ', validatedUserInput);

      sendJSONresponse(res, 201, { 'message': 'error', 'invalidInputData': validatedUserInput });

    }else{
      console.log('####### > validatedUserInput / GOOD DATA !!!!!!!');

      evaluateUserEmail(req, res, function(req, res, responseData) {
        console.log('#### apiMainCtrls > ajaxEvaluateUserEmail > evaluateUserEmail: ', responseData.status, ' : ', responseData.message);
        //sendJSONresponse(res, responseData.status, { 'message': responseData.message });

      });
    }
  });
};




module.exports.ajaxSignUpUser2 = function(req, res) {
  console.log("####### > apiMainCtrls > ajaxSignUpUser > req.body.state: ", req.body.state)
  if (!req.body.displayname || !req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.city || !req.body.state) {
    console.log("####### > apiMainCtrls > ajaxSignUpUser > err 1")
    sendJSONresponse(res, 400, { message: "All fields required" });
    return; 
  }

  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      console.log("####### > apiMainCtrls > ajaxSignUpUser > err 2")
      sendJSONresponse(res, 400, err);
      return;
    }

    if (user) {
      console.log("####### > apiMainCtrls > ajaxSignUpUser > err 3")
      sendJSONresponse(res, 409, { "message": "Please use a different email address." });
      return;
    }
    if (!user) {
      console.log("####### > apiMainCtrls > ajaxSignUpUser > err 4")
      var newUser = new User();
      newUser.displayname = req.body.displayname;
      newUser.email = req.body.email;
      newUser.firstname = req.body.firstname;
      newUser.lastname = req.body.lastname;
      newUser.city = req.body.city;
      newUser.state = req.body.state;

      newUser.setPassword(req.body.password, function(err, result){
        if (err) {
          console.log("####### > apiMainCtrls > ajaxSignUpUser > newUser.setPassword 1")
          sendJSONresponse(res, 400, err);
        }
        newUser.save(function(err) {
          if (err) {
            console.log("####### > apiMainCtrls > ajaxSignUpUser > newUser.setPassword 2")
            sendJSONresponse(res, 400, err);
          } else {
            console.log("####### > apiMainCtrls > ajaxSignUpUser > newUser.setPassword 3 > result:", result)
            sendJSONresponse(res, 201, result);
          }
        });
      });
    }
  });
};

module.exports.postSignUpResponseXXX = function(req, res) {
  console.log("####### > apiMainCtrls > postSignUpResponse > req.body.state: ", req.body.state)
  if (!req.body.displayname || !req.body.email || !req.body.password || !req.body.firstname || !req.body.lastname || !req.body.city || !req.body.state) {
    console.log("####### > apiMainCtrls > postSignUpResponse > err 1")
    sendJSONresponse(res, 400, { message: "All fields required" });
    return; 
  }

  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      console.log("####### > apiMainCtrls > postSignUpResponse > err 2")
      sendJSONresponse(res, 400, err);
      return;
    }

    if (user) {
      console.log("####### > apiMainCtrls > postSignUpResponse > err 3")
      sendJSONresponse(res, 409, { "message": "Please use a different email address." });
      return;
    }
    if (!user) {
      console.log("####### > apiMainCtrls > postSignUpResponse > err 4")
      var newUser = new User();
      newUser.displayname = req.body.displayname;
      newUser.email = req.body.email;
      newUser.firstname = req.body.firstname;
      newUser.lastname = req.body.lastname;
      newUser.city = req.body.city;
      newUser.state = req.body.state;

      newUser.setPassword(req.body.password, function(err, result){
        if (err) {
          console.log("####### > apiMainCtrls > postSignUpResponse > newUser.setPassword 1")
          sendJSONresponse(res, 400, err);
        }
        newUser.save(function(err) {
          if (err) {
            console.log("####### > apiMainCtrls > postSignUpResponse > newUser.setPassword 2")
            sendJSONresponse(res, 400, err);
          } else {
            console.log("####### > apiMainCtrls > postSignUpResponse > newUser.setPassword 3 > result:", result)
            sendJSONresponse(res, 201, result);
          }
        });
      });
    }
  });
};

  // pathName: pathName,      (email, state, firstname, password)
  // pathNameData: userInput, (bbb@bbb.com, Alaska, Joe, 555nnn)
  // expectedResponse: false
module.exports.ajaxEvaluateUserProfile = function(req, res) {
  console.log('#### apiMainCtrls > ajaxEvaluateUserProfile +++')
  console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > req.body.pathName?: ', req.body.pathName)
  console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > req.body.pathNameData????: ', req.body.pathNameData)
  console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > req.body.expectedResponse: ', req.body.expectedResponse)

  var idDataValid = serverSideInputValidation(req.body.pathName, req.body.pathNameData);

  console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > serverSideInputValidation > idDataValid: ' , idDataValid)

  if(!idDataValid){
    console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > NOT VALID: ', idDataValid);
    sendJSONresponse(res, 400, { 'message': 'error' });

  }else{

    if(req.body.pathName === 'email'){
      console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > VALID > email: ', req.body.pathName);

      evaluateUserEmail(req, res, function(req, res, responseData) {
        console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > evaluateUserEmail 1: ', responseData.status);
        console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > evaluateUserEmail 2: ', responseData.message);

        User.findById(res.locals.currentUser.id).exec(function(err, user) {
          if (user){
            user.email = req.body.pathNameData;
            user.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, { 'message': 'error' });
              } else {
                sendJSONresponse(res, 200, { 'message': 'success' });
              }
            });
          }else{
            sendJSONresponse(res, 400, { 'message': 'error' });
          }
        });
      });

    }else if(req.body.pathName === 'password'){
      console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > VALID > password: ', req.body.pathName);

      /*
      User.findById(res.locals.currentUser.id).exec(function(err, user) {
        if (user){

          user.setPassword(req.body.pathNameData, function(err, result){
            if (err) {
              console.log("####### > apiMainCtrls > ajaxEvaluateUserProfile > setPassword 1")
              sendJSONresponse(res, 400, { 'message': 'error' });
            }
            user.save(function(err) {
              if (err) {
                console.log("####### > apiMainCtrls > ajaxEvaluateUserProfile > setPassword 2")
                sendJSONresponse(res, 400, { 'message': 'error' });
              } else {
                console.log("####### > apiMainCtrls > ajaxEvaluateUserProfile > setPassword 3 > result:", result)
                sendJSONresponse(res, 201, { 'message': 'success' });
              }
            });
          });

        }else{
          sendJSONresponse(res, 400, { 'message': 'error' });
        }
      });
      */

    }else{
      console.log('#### apiMainCtrls > ajaxEvaluateUserProfile > VALID > text/select: ', req.body.pathName);

    }
  }
};

// 'data' from client onClick:          {email: "aaa@aaa.com", expectedResponse: "true"}
// ajaxEvaluateUserEmail +++ res.body:  { email: 'aaa1@aaa.com', expectedResponse: 'true' }

module.exports.ajaxEvaluateUserEmail = function(req, res) {
  console.log('ajaxEvaluateUserEmail +++');
  console.log('ajaxEvaluateUserEmail +++ res.body: ', req.body);

  evaluateUserEmail(req, res, function(req, res, responseData) {
    console.log('#### apiMainCtrls > ajaxEvaluateUserEmail > evaluateUserEmail: ', responseData.status, ' : ', responseData.message);
    sendJSONresponse(res, responseData.status, { 'message': responseData.message });
  });
};

module.exports.ajaxEvaluateRegisteredUser = function(req, res, next) {
  console.log('ajaxEvaluateRegisteredUser +++');

  if(!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, { 'message': 'error' });
  }else{

    passport.authenticate('local', function(err, user, info){
      if (err) {
        sendJSONresponse(res, 404, { 'message': 'error' });
        return;
      }
      if (info) {
        // returns message either incorrect username or password
        sendJSONresponse(res, 401, { 'message': 'error' });
        return;
      }
      if(user){
        console.log('ajaxEvaluateRegisteredUser 201 success +++++++++')
        sendJSONresponse(res, 201, { 'message': 'success' });
      }
    })(req, res, next);
  }
};





