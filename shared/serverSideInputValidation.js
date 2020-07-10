
module.exports = function (req, res, callback) {
  
  var reqBody = req.body;
  var emailPattern = /\S+@\S+\.\S+/;
  var passwordPattern = /^\S{4,}$/;
  var userNamePattern = /^[A-Za-z0-9_]{4,21}$/;
  var validatedUserInput = {};
  var elementObject = {};
  var errorType;
  var valuesMatch;
  var isDataValid;
  var pathName;
  var whitespace;

  var validateMaxLengthUserInput = function (val,maxlen) {
    var newVal = (val.length) - maxlen;
    newVal = (val.length) - newVal;
    newVal = val.slice(0,newVal);
    return newVal;
  };

  for (var key in reqBody){
    if (typeof reqBody[key] !== 'function' && key !== '_csrf') {

      if(key === 'displayname'){
        //reqBody[key] = reqBody[key].trim();
        isDataValid = userNamePattern.test(reqBody[key]);
        if(!isDataValid){
          console.log('#### serverSideInputValidation > displayname > reqBody[key].length: ', reqBody[key].length);

          pathName = key;
          elementObject = {};

          reqBody[key].length === 0 ? errorType = 'empty' : errorType = 'invalid';
          elementObject['error'] = errorType;

          //whitespace = reqBody[key].indexOf(' ') >= 0;
          if(reqBody[key].length > 0 && reqBody[key].length < 4){
            elementObject['stringValLength'] = reqBody[key].length;
          } 
          validatedUserInput[pathName] = elementObject;
        }

      }else if(key === 'email'){
        reqBody[key] = reqBody[key].trim();
        isDataValid = emailPattern.test(reqBody[key]);
        elementObject = {};
        pathName = key;
        if(!isDataValid){
          reqBody[key] === '' ? errorType = 'empty' : errorType = 'invalid';
          elementObject['error'] = errorType;
        }else{
          reqBody[key] === reqBody.confirmEmail.trim() ? valuesMatch = true : valuesMatch = false;
          elementObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = elementObject;


      }else if(key === 'confirmEmail'){
        reqBody[key] = reqBody[key].trim();
        isDataValid = emailPattern.test(reqBody[key]);
        elementObject = {};
        pathName = key;
        if(!isDataValid){
          reqBody[key] === '' ? errorType = 'empty' : errorType = 'invalid';
          elementObject['error'] = errorType;
        }else{
          reqBody[key] === reqBody.email.trim() ? valuesMatch = true : valuesMatch = false;
          elementObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = elementObject;


      }else if(key === 'password'){
        //reqBody[key] = reqBody[key].trim();
        isDataValid = passwordPattern.test(reqBody[key]);
        elementObject = {};
        pathName = key;
        if(!isDataValid){
          console.log('#### serverSideInputValidation > password > reqBody[key].length: ', reqBody[key].length);

          reqBody[key].length === 0 ? errorType = 'empty' : errorType = 'invalid';
          elementObject['error'] = errorType;

          //whitespace = reqBody[key].indexOf(' ') >= 0;
          if(reqBody[key].length > 0 && reqBody[key].length < 4){
            elementObject['stringValLength'] = reqBody[key].length;
          } 
        }else{
          reqBody[key] === reqBody.confirmPassword ? valuesMatch = true : valuesMatch = false;
          elementObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = elementObject;


      }else if(key === 'confirmPassword'){
        //reqBody[key] = reqBody[key].trim();
        isDataValid = passwordPattern.test(reqBody[key]);
        elementObject = {};
        pathName = key;

        if(!isDataValid){
          reqBody[key].length === 0 ? errorType = 'empty' : errorType = 'invalid';
          elementObject['error'] = errorType;
        }else{
          reqBody[key] === reqBody.password ? valuesMatch = true : valuesMatch = false;
          elementObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = elementObject;


      }else if(key === 'firstname'){
        reqBody[key] = reqBody[key].trim();
        if(reqBody[key] === ''){
          pathName = key;
          elementObject = {};
          elementObject['error'] = 'empty';
          validatedUserInput[pathName] = elementObject;
        }else{
          if(reqBody[key].length > 21){
            reqBody[key] = validateMaxLengthUserInput(reqBody[key],21);
          }
        }


      }else if(key === 'lastname'){
        reqBody[key] = reqBody[key].trim();
        if(reqBody[key] === ''){
          pathName = key;
          elementObject = {};
          elementObject['error'] = 'empty';
          validatedUserInput[pathName] = elementObject;
        }else{
          if(reqBody[key].length > 31){
            reqBody[key] = validateMaxLengthUserInput(reqBody[key],31);
          }
        }


      }else if(key === 'city'){
        reqBody[key] = reqBody[key].trim();
        if(reqBody[key] === ''){
          pathName = key;
          elementObject = {};
          elementObject['error'] = 'empty';
          validatedUserInput[pathName] = elementObject;
        }else{
          if(reqBody[key].length > 31){
            reqBody[key] = validateMaxLengthUserInput(reqBody[key],31);
          }
        }


      }else if(key === 'state'){
        // { initials: 'MT', full: 'Montana' }
        if(reqBody[key].full === ''){
          pathName = key;
          elementObject = {};
          elementObject['error'] = 'empty';
          validatedUserInput[pathName] = elementObject;
        }
      }



      /*
      if(key === 'email'){
        reqBody[key] = reqBody[key].trim();
      	isDataValid = emailPattern.test(reqBody[key]);
        var emailObject = {};
        pathName = key;
      	if(!isDataValid){
          reqBody[key] === '' ? errorType = 'empty' : errorType = 'invalid';
          emailObject['error'] = errorType;
      	}else{
          reqBody[key] === reqBody.confirmEmail ? valuesMatch = true : valuesMatch = false;
          emailObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = emailObject;


      }else if(key === 'confirmEmail'){
        reqBody[key] = reqBody[key].trim();
        isDataValid = emailPattern.test(reqBody[key]);
        var confirmEmailObject = {};
        pathName = key;
        if(!isDataValid){
          reqBody[key] === '' ? errorType = 'empty' : errorType = 'invalid';
          confirmEmailObject['error'] = errorType;
        }else{
          reqBody[key] === reqBody.email ? valuesMatch = true : valuesMatch = false;
          confirmEmailObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = confirmEmailObject;


      }else if(key === 'password'){
        reqBody[key] = reqBody[key].trim();
        isDataValid = passwordPattern.test(reqBody[key]);
        var passwordObject = {};
        pathName = key;
        if(!isDataValid){
          console.log('#### serverSideInputValidation > password > reqBody.confirmPassword: ', reqBody.confirmPassword);

          reqBody[key].length === 0 ? errorType = 'empty' : errorType = 'invalid';
          passwordObject['error'] = errorType;

          whitespace = reqBody[key].indexOf(' ') >= 0;
          if(reqBody[key].length > 0 && reqBody[key].length < 4 && !whitespace){
            passwordObject['stringValLength'] = reqBody[key].length;
          } 
        }else{
          reqBody[key] === reqBody.confirmPassword ? valuesMatch = true : valuesMatch = false;
          passwordObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = passwordObject;


      }else if(key === 'confirmPassword'){
        console.log('#### serverSideInputValidation > confirmPassword > reqBody.password: ', reqBody.password);
        reqBody[key] = reqBody[key].trim();
        isDataValid = passwordPattern.test(reqBody[key]);
        var confirmPasswordObject = {};
        pathName = key;

        if(!isDataValid){

          reqBody[key].length === 0 ? errorType = 'empty' : errorType = 'invalid';
          confirmPasswordObject['error'] = errorType;

        }else{
          reqBody[key] === reqBody.password ? valuesMatch = true : valuesMatch = false;
          confirmPasswordObject['match'] = valuesMatch;
        }
        validatedUserInput[pathName] = confirmPasswordObject;


      }else if(key === 'displayname'){
        reqBody[key] = reqBody[key].trim();
      	isDataValid = userNamePattern.test(reqBody[key]);
      	if(!isDataValid){
          console.log('#### serverSideInputValidation > displayname > reqBody[key].length: ', reqBody[key].length);

          pathName = key;
          var displaynameObject = {};

          reqBody[key].length === 0 ? errorType = 'empty' : errorType = 'invalid';
          displaynameObject['error'] = errorType;

          whitespace = reqBody[key].indexOf(' ') >= 0;
          if(reqBody[key].length > 0 && reqBody[key].length < 4 && !whitespace){
            displaynameObject['stringValLength'] = reqBody[key].length;
          } 
          validatedUserInput[pathName] = displaynameObject;
      	}

      }else if(key === 'state'){
      	// { initials: 'MT', full: 'Montana' }
      	if(reqBody[key].full === ''){
          pathName = key;
          var stateObject = {};
          stateObject['error'] = 'empty';
          validatedUserInput[pathName] = stateObject;
      	}

      }else if(key === 'city'){
        reqBody[key] = reqBody[key].trim();
        if(reqBody[key] === ''){
          pathName = key;
          var cityObject = {};
          cityObject['error'] = 'empty';
          validatedUserInput[pathName] = cityObject;
        }else{
          if(reqBody[key].length > 31){
            reqBody[key] = validateMaxLengthUserInput(reqBody[key],31);
          }
        }

      }else if(key === 'firstname'){
        reqBody[key] = reqBody[key].trim();
        if(reqBody[key] === ''){
          pathName = key;
          var firstnameObject = {};
          firstnameObject['error'] = 'empty';
          validatedUserInput[pathName] = firstnameObject;
        }else{
          if(reqBody[key].length > 21){
            reqBody[key] = validateMaxLengthUserInput(reqBody[key],21);
          }
        }

      }else if(key === 'lastname'){
        reqBody[key] = reqBody[key].trim();
        if(reqBody[key] === ''){
          pathName = key;
          var lastnameObject = {};
          lastnameObject['error'] = 'empty';
          validatedUserInput[pathName] = lastnameObject;
        }else{
          if(reqBody[key].length > 31){
            reqBody[key] = validateMaxLengthUserInput(reqBody[key],31);
          }
        }
      }
      */
    }
  }
  console.log('#### serverSideInputValidation > serverSideInputValidation > END!!: ', validatedUserInput);
  callback(req, res, validatedUserInput);
};



