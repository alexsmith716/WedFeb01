
/* Safari */
var helper = {

    init: function() {

        document.getElementById('state').setAttribute('tabindex', '9');

        window.showLoading = function() {
            $('.modal-backdrop').show();
        };
        window.hideLoading = function() {
            $('.modal-backdrop').hide();
        };

        //var code = helper.getCookies('id'); 

        $('[name="displayname"]').prop('required', true);
        $('[name="email"]').prop('required', true);
        $('[name="confirmEmail"]').prop('required', true);
        $('[name="password"]').prop('required', true);
        $('[name="confirmPassword"]').prop('required', true);
        $('[name="firstname"]').prop('required', true);
        $('[name="lastname"]').prop('required', true);
        $('[name="city"]').prop('required', true);
        $('[name="state"]').prop('required', true);

        helper.initializeJqueryEvents();
    },

    initializeJqueryEvents:  function(){

        //var emailPattern = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        //var emailPattern = /\S+@\S+\.\S+/;
        //var passwordPattern = /^\S{4,}$/;
        //var passwordPattern = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        // /^[^ ][\w\W ]*[^ ]/
        // [^ ][A-Za-z0-9_][^ ]{4,21}$

        $('#signUpForm').on('submit', function(e) {
            console.log('#signUpForm > SUBMIT ++');
            e.preventDefault();
            //showLoading();
            $('.formerror').addClass('hide');
            var data = helper.postData();
            var formValid = true;

            for (var constraintElement in data){
                var element = $('#'+constraintElement);
                var constraintSatisfied = element.get(0).checkValidity();
                var invalidElement = element.data('invalid');
                //if(constraintSatisfied === false || invalidElement === 'true'){

                console.log('XXXXXX element: ', element);
                console.log('YYYYYY constraintSatisfied?: ', constraintSatisfied);
                console.log('+++++++++++++++++++++++++++++++++++');

                if(constraintSatisfied === false){
                    formValid = false;
                    var boundEventTypes = $._data( element[0], 'events' );

                    for (var eType in boundEventTypes){
                      console.log('DDDDD > boundEventTypes > eType: ', element, ' : ', eType);
                      //helper.handleFormEvents(constraintElement, eType);
                      //helper.handleFormEvents(constraintElement, 'focusout');
                    }
                }
            }
    
            if (!formValid){
                console.log('+++++++++++ BAD FORM!!!!!!!!')

                hideLoading();
                return false;
            }else{
                console.log('+++++++++++ GOOD FORM!');

                var pathName = 'expectedResponse';
                data[pathName] = 'false';

                var serviceUrl = $(this).attr('action');
                return false;
                // contentType: the content type to be specified on the request
                // dataType:    identifies the type of data expected to be returned by the response
                // accepts:     the content type sent in the request header that tells the server what kind of response it will accept in return
                //              by default, its value depends on dataType
           
                /*
                $.ajax({
                    rejectUnauthorized: false,
                    url: serviceUrl,
                    type: 'POST',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    accepts: 'application/json',
                
                    success: function(data, status, xhr) {
                        // success: 
                        //      1) email check was good
                        //      2) 'User' created was good
                        //      3) do redirect: res.redirect('/userhome');
                        if (data.message === 'success') {
                            console.log('signUpSubmitBtn > ajax > success > success');
                            window.location.href= data.redirect;
                            //$('#signUpForm').submit();
                        } else {
                            console.log('signUpSubmitBtn > ajax > success > error')
                            console.log('signUpSubmitBtn > ajax > success > error > data: ', data)
                            console.log('signUpSubmitBtn > ajax > success > error > data.message: ', data.message)
                            console.log('signUpSubmitBtn > ajax > success > error > data.invalidInputData: ', data.invalidInputData)

                            helper.handleErrorResponse(data.invalidInputData);
                            hideLoading();
                            return false;
                        }
                    },
                    error: function(xhr, status, error) {
                        console.log('signUpSubmitBtn > ajax > error')
                        $('#signUpForm .form-control').addClass('has-error');
                        $('.formerror').text('Could not register your information, try again or contact customer service.');
                        $('.formerror').removeClass('hide');
                        hideLoading();
                        return false;
                    }
                });
                */
            } 
        });

        /*
        $.when('focusout').done(function() {
          console.log('event done +++');
        });
        */

        $('#displayname').on('focusout', function(e) {
            helper.handleFormEvents('displayname');
        });

        $('#email').on('change focusout', function(e) {
            //console.log('#email > focusout change ++');
            helper.handleFormEvents('email', e.type);
        });

        $('#confirmEmail').on('change focusout', function(e) {
            //console.log('#confirmEmail > focusout change ++');
            helper.handleFormEvents('confirmEmail', e.type);
        });

        $('#password').on('change focusout', function(e) {
            console.log('#password > focusout change > e.type ++', e.type);
            helper.handleFormEvents('password', e.type);
        });

        $('#confirmPassword').on('change focusout', function(e) {
            console.log('#confirmPassword > focusout change > e.type ++', e.type);
            helper.handleFormEvents('confirmPassword', e.type);
        });

        $('#firstname').on('focusout', function(e) {
            helper.handleFormEvents('firstname');
        });

        $('#lastname').on('focusout', function(e) {
            helper.handleFormEvents('lastname');
        });

        $('#city').on('focusout', function(e) {
            helper.handleFormEvents('city');
        });

        $('#state').on('change focusout', function(e) {
            helper.handleFormEvents('state');
        });

    },

    handleFormEvents: function(elementID, eType) {
        //console.log('handleFormEvents +++: ', elementID, ' : ', eType);

        elementID === 'displayname' ? helper.displaynameOnFocusout(elementID) : null;

        elementID === 'email' ? helper.emailOnChangeFocusout(elementID, 'confirmEmail', eType) : null;
        elementID === 'confirmEmail' ? helper.emailOnChangeFocusout(elementID, 'email', eType) : null;

        elementID === 'password' ? helper.passwordOnChangeFocusout(elementID, 'confirmPassword', eType) : null;
        elementID === 'confirmPassword' ? helper.passwordOnChangeFocusout(elementID, 'password', eType) : null;

        elementID === 'firstname' ? helper.evaluateBasicTextField(elementID) : null;
        elementID === 'lastname' ? helper.evaluateBasicTextField(elementID) : null;
        elementID === 'city' ? helper.evaluateBasicTextField(elementID) : null;
        elementID === 'state' ? helper.selectElementOnChangeFocusout(elementID) : null;
    },

    displaynameOnFocusout: function(elementID) {
        console.log('displaynameOnFocusout ++');
        var thisElement = $('#'+elementID);
        var pattern = /^[A-Za-z0-9_]{4,21}$/;
        thisElement.on('input', function(){
            helper.testUserInput(elementID,pattern);
        });
        helper.testUserInput(elementID,pattern);
    },

    emailOnChangeFocusout: function(elementID, confirmElementID, eType) {
        console.log('emailOnChangeFocusout > eType ++', eType)
        var thisElement = $('#'+elementID);

        if (eType === 'change') {
            helper.validateEmailField(elementID, confirmElementID);

        }else if (eType === 'focusout') {
            thisElement.on('input', function(){
                helper.testUserInputEmail(elementID);
            });
            helper.testUserInputEmail(elementID);

        }
    },

    //elementID === 'password' ? helper.passwordOnChangeFocusout(elementID, 'confirmPassword', eType) : null;
    //elementID === 'confirmPassword' ? helper.passwordOnChangeFocusout(elementID, 'password', eType) : null;
    passwordOnChangeFocusout: function(elementID,confirmElementID,eType) {
        console.log('passwordOnChangeFocusout ++',  eType);
        var thisElement = $('#'+elementID);
        var pattern = /\S{4,}$/;
        //var pattern = /^\S{4,}$/;

        if (eType === 'change') {
            if(helper.validateParams('password', 'confirmPassword')){
                $('#'+confirmElementID).off('input');
            }
        }else if (eType === 'focusout') {
            thisElement.on('input', function(){
                helper.testUserInput(elementID,pattern);
            });
            helper.testUserInput(elementID,pattern);
        }
  
        /*
        if(helper.validateParams('password', 'confirmPassword')){
            $('#'+confirmElementID).off('input');
        }
        thisElement.on('input', function(){
            helper.testUserInput(elementID,pattern);
        });
        helper.testUserInput(elementID,pattern);
        */
    },

    selectElementOnChangeFocusout: function(elementID) {
        console.log('selectElementOnChangeFocusout ++');
        var thisElement = $('#'+elementID);
        var thisElementValue = thisElement.val();

        if(thisElementValue !== ''){
            if(is_safari){
                $('#'+elementID+'Error').text('');
                $('#'+elementID+'Error').removeClass('show').addClass('hide');
            }
            !is_safari ? thisElement.get(0).setCustomValidity('') : null;

        }else{
            if(is_safari){
                $('#'+elementID+'Error').text('Please select an option. '+$('#'+elementID).attr('title'));
                $('#'+elementID+'Error').removeClass('hide').addClass('show');
            }
            !is_safari ? thisElement.get(0).setCustomValidity('Please select an item in the list.') : null;
        }
    },

    elementIDtoTitleCase: function(whichID) {
        whichID = whichID.replace(/([A-Z])/g, ' $1');
        labelText = whichID.replace(/^./, function(str){ return str.toUpperCase(); })
        return labelText;
    },

    validateEmailValue: function(email) {
        var emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    },


    // http://www.telerik.com/blogs/four-options-for-mobile-form-validation
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // all the browser RegEx pattern constraint does is ensure a valid email 
    // below is just informing the user about the RegEx constraint
    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    testUserInput: function(elementID,pattern) {
        console.log('testUserInput ++');
        var thisElementID = $('#'+elementID).attr('id');
        var thisElementValue = $('#'+elementID).val();
        var patternTestValue = pattern.test(thisElementValue);
        var charCount = thisElementValue.length;
        var errorElement = $('#'+thisElementID+'Error');
        var title = $('#'+elementID).attr('title');

        if(thisElementValue === ''){

            is_safari ? errorElement.text('Please fill out this field. '+ title) : null;
            is_safari ? errorElement.removeClass('hide').addClass('show') : null;

        }else if(charCount > 0 && charCount < 4){

            if(elementID.indexOf('confirm') != -1) {
                is_safari ? errorElement.text('Invalid input. '+ title) : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                //!is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. '+ title) : null;

            }else{
                is_safari ? errorElement.text('Please enter at least 4 character(s). You entered '+charCount+'. '+ title) : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
            }

        }else if(charCount >= 4){

            if(!patternTestValue){
                is_safari ? errorElement.text('Invalid input. '+$('#'+elementID).attr('title')) : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                //!is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. '+ title) : null;

            }else{
                is_safari ? errorElement.text('') : null;
                is_safari ? errorElement.removeClass('show').addClass('hide') : null;
                //!is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
                $('#'+elementID).off('input');
            }
        }
    },

    testUserInputEmail: function(elementID) {
        console.log('testUserInputEmail > ++0', elementID);
        var thisElementValue = $('#'+elementID).val();
        var thisErrorElement = $('#'+elementID+'Error');
        var title = $('#'+elementID).attr('title');

        if (helper.validateEmailValue(thisElementValue)) {
            console.log('testUserInputEmail > ++1', elementID);
            is_safari ? thisErrorElement.text('') : null;
            is_safari ? thisErrorElement.removeClass('show').addClass('hide') : null;
            $('#'+elementID).off('input');

        }else if(thisElementValue === ''){
            console.log('testUserInputEmail > ++2', elementID);
            is_safari ? thisErrorElement.text('Please fill out this field. ' + title) : null;
            is_safari ? thisErrorElement.removeClass('hide').addClass('show') : null;

        }else{
            console.log('testUserInputEmail > ++3');
            is_safari ? thisErrorElement.text('Please enter an email address. ' + title) : null;
            is_safari ? thisErrorElement.removeClass('hide').addClass('show') : null;
        }
    },

    validateEmailService: function(email) {
        var result;
        var data = {};
        var pathName = 'email';
        data[pathName] = email;
        pathName = 'expectedResponse';
        data[pathName] = 'true';

        $.ajax({
            rejectUnauthorized: false,
            url: 'https://localhost:3000/api/evaluateuseremail',
            type: 'POST',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            async: false,

            success: function(data, status, xhr) {
                if (data.message === 'success') {
                    console.log('validateEmailService > SUCCESS')
                    result = true;
                } else {
                    console.log('validateEmailService > ERROR')
                    result = false;
                }
            }
        });
        return result;
    },

    validateParamsXXX: function(str1, str2) {
        console.log('validateParams ++');

        if ($('#' + str2).val() !== '') {

            var property1 = document.getElementsByName(str1)[0];
            var property2 = document.getElementsByName(str2)[0];

            if (property1.value !== property2.value) {

                if (is_safari) {

                    if (str2 === 'email') {
                        $('#' + str1 + 'Match').removeClass('hide').addClass('show');
                    } else {
                        $('#' + str2 + 'Match').removeClass('hide').addClass('show');
                    }
                    $('#'+str1).get(0).setCustomValidity('false');
                    $('#'+str2).get(0).setCustomValidity('false');

                } else {

                    $('#'+ str1).get(0).setCustomValidity(helper.elementIDtoTitleCase(str1) + 's don\'t match');
                    $('#'+ str2).get(0).setCustomValidity(helper.elementIDtoTitleCase(str1) + 's don\'t match');

                }
                return false;

            } else {

                if (is_safari) {

                    if (str2 === 'email') {
                        $('#' + str1 + 'Match').removeClass('show').addClass('hide');
                    } else {
                        $('#' + str2 + 'Match').removeClass('show').addClass('hide');
                    }
                    //$('#'+str1).get(0).setCustomValidity('');
                    //$('#'+str2).get(0).setCustomValidity('');

                } else {
                    /*
                    if (str2 === 'email') {
                        $('#' + str1).get(0).setCustomValidity('');
                    } else {
                        $('#'+ str2).get(0).setCustomValidity('');
                    }
                    */
                }
                $('#'+str1).get(0).setCustomValidity('');
                $('#'+str2).get(0).setCustomValidity('');
                return true;
            }
        }
    },

    // onchange="helper.validateParams('password', 'confirmPassword')"
    // onchange="helper.validateParams('password', 'confirmPassword')"
    // onchange="helper.validateEmailField(this.value, 'email', 'confirmEmail');"
    // onchange="helper.validateEmailField(this.value, 'confirmEmail', 'email');"
validateParams: function(str1, str2) {
    if ($('#' + str2).val() != '') {
        var property1 = document.getElementsByName(str1)[0];
        var property2 = document.getElementsByName(str2)[0];

        if (property1.value != property2.value) {
            if (is_safari) {
                if (str2 == 'email') {
                    $('#' + str1 + 'Match').removeClass('hide').addClass('show');
                } else {
                    $('#' + str2 + 'Match').removeClass('hide').addClass('show');
                }
            } else {
                $('#'+ str2).get(0).setCustomValidity(helper.elementIDtoTitleCase(str1) + 's don\'t match');
            }
            //return false;

        } else {
            if (is_safari) {
                if (str2 == 'email') {
                    $('#' + str1 + 'Match').removeClass('show').addClass('hide');
                } else {
                    $('#' + str2 + 'Match').removeClass('show').addClass('hide');
                }
            } else {
                if (str2 == 'email') {
                    $('#' + str1).get(0).setCustomValidity('');
                } else {
                    $('#'+ str2).get(0).setCustomValidity('');
                }
            }
            //return true;
        }
    }
},
    validateParamsXXX: function(str1, str2) {
        console.log('validateParams ++');

        if ($('#' + str2).val() !== '') {

            var property1 = document.getElementsByName(str1)[0];
            var property2 = document.getElementsByName(str2)[0];

            if (property1.value !== property2.value) {

                if (is_safari) {
                    if (str2 === 'email') {
                        $('#' + str1 + 'Match').removeClass('hide').addClass('show');
                    } else {
                        $('#' + str2 + 'Match').removeClass('hide').addClass('show');
                    }
                } 

                //$('#'+ str1).get(0).setCustomValidity(helper.elementIDtoTitleCase(str1) + 's don\'t match');
                $('#'+ str2).get(0).setCustomValidity(helper.elementIDtoTitleCase(str1) + 's don\'t match');

            } else {

                if (is_safari) {

                    if (str2 === 'email') {
                        $('#' + str1 + 'Match').removeClass('show').addClass('hide');
                    } else {
                        $('#' + str2 + 'Match').removeClass('show').addClass('hide');
                    }
                }

                //$('#'+str1).get(0).setCustomValidity('');
                $('#'+str2).get(0).setCustomValidity('');

            }
        }
    },

    validateEmailField: function(thisField, comparedField) {
        console.log('validateEmailField ++');
        if (helper.validateEmailValue($('#'+thisField).val())) {

            is_safari ? $('#'+thisField+'Improper').removeClass('show').addClass('hide') : null;
            $('#'+thisField).get(0).setCustomValidity(''); 
            $('#'+thisField).off('input');

            if(helper.validateEmailService($('#'+thisField).val())){
                
                //is_safari ? $('#'+thisField).get(0).setCustomValidity('false') : null;
                is_safari ? $('#emailRegistered').removeClass('hide').addClass('show') : null;
                $('#'+thisField).get(0).setCustomValidity('This email address is already in our system. Sign in, or enter a new email address');
                // return false;

            } else {

                is_safari ? $('#emailRegistered').removeClass('show').addClass('hide') : null;
                helper.validateParams(thisField, comparedField);

            }
        } else{

            //is_safari ? $('#'+thisField).get(0).setCustomValidity('false') : null;
            is_safari ? $('#'+thisField+'Improper').removeClass('hide').addClass('show') : null; 
            $('#'+thisField).get(0).setCustomValidity(helper.elementIDtoTitleCase(thisField) + ' is in improper format'); 
            // return false;
        }
    },

    //$('#'+thisField).data('invalid', 'true');
    validateEmailFieldXXXX: function(thisField, comparedField) {

        var property1 = document.getElementsByName(thisField)[0];

        if (helper.validateEmailValue($('#'+thisField).val())) {

            is_safari ? $('#'+thisField+'Improper').removeClass('show').addClass('hide') : null;
            $('#'+thisField).get(0).setCustomValidity(''); 
            $('#'+thisField).off('input');

            if(helper.validateEmailService($('#'+thisField).val())){
                
                //is_safari ? $('#'+thisField).get(0).setCustomValidity('false') : null;
                is_safari ? $('#emailRegistered').removeClass('hide').addClass('show') : null;
                $('#'+thisField).get(0).setCustomValidity('This email address is already in our system. Sign in, or enter a new email address');
                // return false;

            } else {

                is_safari ? $('#emailRegistered').removeClass('show').addClass('hide') : null;

                if(helper.validateParams(thisField, comparedField)){
                    is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
                    // return true;
                } else{
                    is_safari ? $('#'+thisField).get(0).setCustomValidity('false') : null;
                    // return false;
                }
            }
        } else{

            //is_safari ? $('#'+thisField).get(0).setCustomValidity('false') : null;
            is_safari ? $('#'+thisField+'Improper').removeClass('hide').addClass('show') : null; 
            $('#'+thisField).get(0).setCustomValidity(helper.elementIDtoTitleCase(thisField) + ' is in improper format'); 
            // return false;
        }
    },

    evaluateBasicTextField: function(thisField) {
        console.log('evaluateBasicTextField +++');
        var thisElementValue = $('#'+thisField).val();
        thisElementValue = thisElementValue.trim();

        var property1 = document.getElementsByName(thisField)[0];

        if(thisElementValue){

            is_safari ? $('#'+thisField+'Error').text('') : null;
            is_safari ? $('#'+thisField+'Error').removeClass('show').addClass('hide') : null;
            $('#'+thisField).get(0).setCustomValidity('')

        }else{

            is_safari ? $('#'+thisField+'Error').text('Please fill out this field. ' + property1.title) : null;
            is_safari ? $('#'+thisField+'Error').removeClass('hide').addClass('show') : null;

        }
    },

    handleErrorResponse: function(data) {
        console.log('signUpSubmitBtn > handleErrorResponse +++');
        /*
        req.body.displayname = 'Us ';
        req.body.email = 'aaa@aaaa.com';
        req.body.confirmEmail = 'aaaa';
        req.body.password = ' qq';
        req.body.confirmPassword = 'qq';
        req.body.firstname = 'CaaaaaaaaaaaaaaaaXXXXaaaAzzzzzzzzzzzzzdddddd';
        req.body.lastname = 'AaaaaaNbbbbbbbHhhhhXXXXhhhUuuuuuuuuuXxxxxxxxx';
        +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    
        displayname:        { error: 'invalid' }{ error: 'empty' }{ stringValLength: 3 }
        email:              { error: 'invalid' }{ error: 'empty' }{ match: true }{ match: false }
        confirmEmail:       { error: 'invalid' }{ error: 'empty' }{ match: true }{ match: false }
        password:           { error: 'invalid' }{ error: 'empty' }{ match: true }{ match: false }{ stringValLength: 3 }
        confirmPassword:    { error: 'invalid' }{ error: 'empty' }{ match: true }{ match: false }
        firstname:          { error: 'empty' }
        lastname:           { error: 'empty' }
        city:               { error: 'empty' }
        state:              { error: 'empty' }
        */

        for (var errorObject in data){
            var element = $('#'+errorObject);
            // errorObject >>> displayname
            // element           >>>  [input#displayname.form-control.input-md]
            // data[errorObject] >>>  {error: "empty"}
            console.log('handleErrorResponse 0+++: ', errorObject);
            //console.log('handleErrorResponse 1+++: ', element.prop('nodeName'));
            //console.log('handleErrorResponse 2+++: ', data[errorObject]['error']);

            if(element.prop('nodeName') === 'SELECT'){
                console.log('handleErrorResponse errorObject: ', errorObject);// state
                console.log('handleErrorResponse element ', element);// [select#state.form-control.form-element]
                console.log('handleErrorResponse HAS error?: ', data[errorObject].hasOwnProperty('error'));// true
                console.log('handleErrorResponse IS empty?: ', data[errorObject]['error']);// empty
                if(data[errorObject].hasOwnProperty('error') && data[errorObject]['error'] === 'empty'){
                    is_safari ? $('#'+errorObject+'Error').text('Please select an option. Please select a '+errorObject.toUpperCase()) : null;
                    is_safari ? $('#'+errorObject+'Error').removeClass('hide').addClass('show') : null; 
                }
            }
            if(element.prop('nodeName') === 'INPUT'){
                //console.log('handleErrorResponse element.hasOwnProperty: ', element.hasOwnProperty('empty'));
            }
        }
    },

    postData: function() {
        var data = {
            _csrf: $('#_csrf').val(),
            displayname: $('#displayname').val(),
            email: $('#email').val(),
            confirmEmail: $('#confirmEmail').val(),
            password: $('#password').val(),
            confirmPassword: $('#confirmPassword').val(),
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            city: $('#city').val(),
            state: $('#state').val()
        };
        return data;
    },

    unBindField: function(id) {
        $('#'+id).off('change');
        $('#'+id).unbind('change');
        $('#'+id).get(0).setCustomValidity('');
    },

    unBindFields: function() {
        $('#displayname').get(0).setCustomValidity('');
        $('#displayname').prop('required', false);
        $('#displayname').off('focusout');
        $('#displayname').unbind('focusout');

        $('#email').get(0).setCustomValidity('');
        $('#email').prop('required', false);
        $('#email').off('change');
        $('#email').unbind('change');
        $('#email').off('focusout');
        $('#email').unbind('focusout');

        $('#confirmEmail').get(0).setCustomValidity('');
        $('#confirmEmail').prop('required', false);
        $('#confirmEmail').off('change');
        $('#confirmEmail').unbind('change');
        $('#confirmEmail').off('focusout');
        $('#confirmEmail').unbind('focusout');

        $('#password').get(0).setCustomValidity('');
        $('#password').prop('required', false);
        $('#password').off('change');
        $('#password').unbind('change');
        $('#password').off('focusout');
        $('#password').unbind('focusout');

        $('#confirmPassword').get(0).setCustomValidity('');
        $('#confirmPassword').prop('required', false);
        $('#confirmPassword').off('change');
        $('#confirmPassword').unbind('change');
        $('#confirmPassword').off('focusout');
        $('#confirmPassword').unbind('focusout');
    },

    bindUserData: function(data) {
        $('#displayname').val(data.displayname);
        $('#email').val(data.email).addClass('hide').prop('required', false);
        $('#confirmEmail').val(data.email).addClass('hide').prop('required', false);
        $('#password').val(data.password).addClass('hide').prop('required', false);
        $('#confirmPassword').val(data.confirmPassword).addClass('hide').prop('required', false);
        $('#firstName').val(data.firstName);
        $('#lastName').val(data.lastName);
        $('#city').val(data.city);
        $('#state').val(data.state);
    },

    formatDate: function(date) {
       return (date.getHours() < 10 ? '0' : '') + date.getHours() +
               ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() +
               ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() +
               '.' + (date.getMilliseconds() < 10 ? '00' : (date.getMilliseconds() < 100 ? '0' : '')) +
               date.getMilliseconds();
    }
}

$(function () {
    helper.init();
});
