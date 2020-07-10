
/* Chrome */
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
        // myString.trim();

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

        $('#displayname').on('input change', function() {
            var thisElement = $(this);
            var pattern = /^[A-Za-z0-9_]{4,21}$/;
            var thisElementValue = thisElement.val();

            var isThisElementValueValid = pattern.test(thisElementValue);
            var errorElement = $('#usernameError');
            var charCount = thisElementValue.length;
            var noSafariText;

            if(thisElementValue !== ''){
                if(charCount < 4) {
                    is_safari ? errorElement.text('Please enter at least 4 character(s). You entered '+charCount+'. Username must be 4-21 characters long. Letters, numbers, underscores only, no whitespace') : null;
                    is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                }else{
                    if(!isThisElementValueValid){
                        is_safari ? errorElement.text('Invalid input. Username must be 4-21 characters long. Letters, numbers, underscores only, no whitespace') : null;
                        is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                    }else{
                        is_safari ? errorElement.text('') : null;
                        is_safari ? errorElement.removeClass('show').addClass('hide') : null;
                        !is_safari ? thisElement.get(0).setCustomValidity('') : null;
                    }
                }
            }else{
                is_safari ? errorElement.text('Please fill out this field. Username must be 4-21 characters long. Letters, numbers, underscores only, no whitespace') : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null; 
            }
        });

        $('#email').on('change', function() {

        });

        $('#confirmEmail').on('change', function() {

        });

        $('#confirmPassword').on('change', function() {

        });

        $('#firstname').on('focusout', function() {
            helper.evaluateBasicTextSelectField('firstname');
        });

        $('#lastname').on('focusout', function() {
            helper.evaluateBasicTextSelectField('lastname');
        });

        $('#city').on('focusout', function() {
            helper.evaluateBasicTextSelectField('city');
        });

        $('#state').on('focusout', function() {
            var thisElement = $(this);
            var thisElementValue = thisElement.val();
            thisElementValue = thisElementValue;

            if(thisElementValue !== ''){
                is_safari ? $('#stateError').text('') : null;
                is_safari ? $('#stateError').removeClass('show').addClass('hide') : null;
                !is_safari ? thisElement.get(0).setCustomValidity('') : null;

            }else{
                is_safari ? $('#stateError').text('Please select an option. Please select a State') : null;
                is_safari ? $('#stateError').removeClass('hide').addClass('show') : null; 
            }
        });

/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
/* +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */

        $('#signUpForm').on('submit', function(e) {
            e.preventDefault();
            showLoading();
            $('.formerror').addClass('hide');
            //var data = $('#signUpForm').serializeArray();
            var data = helper.postData();
            var formValid = true;

            console.log('DATA1? +++: ', data);
            console.log('DATA2? +++: ', JSON.stringify(data));

            for (var constraintElement in data){
                var element = $('#'+constraintElement);
                var constraintSatisfied = element.get(0).checkValidity();
                console.log('constraintSatisfied? +++: ', element, ' : ', constraintSatisfied)
                if(constraintSatisfied === false){
                    formValid = false;
                    break;
                }
            }

            if (!formValid){
                console.log('+++++++++++ BAD FORM!')
                if(is_safari){
                    for (var elementValue in data){
                        var element = $('#'+data[elementValue]['name']);
                        $(element).trigger('change');
                    }
                }else{
                    $('<input type="submit">').hide().appendTo($('#signUpForm')).click().remove();
                }
                hideLoading();
                return false;
            }else{
                console.log('+++++++++++ GOOD FORM!');

                var pathName = 'expectedResponse';
                data[pathName] = 'false';

                var serviceUrl = $(this).attr('action');

                // contentType: the content type to be specified on the request
                // dataType:    identifies the type of data expected to be returned by the response
                // accepts:     the content type sent in the request header that tells the server what kind of response it will accept in return
                //              by default, its value depends on dataType

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
                            /*
                            $('#email').addClass('has-error');
                            $('#confirmEmail').addClass('has-error');
                            $('#emailError').text('Please enter a different Email Address')
                            $('#confirmEmailError').text('Please enter a different Email Address')
                            $('#emailError').removeClass('hide').addClass('show'); 
                            $('#confirmEmailError').removeClass('hide').addClass('show');
                            $('.formerror').text('Your email address is already in our system. Log in, or enter a new email address');
                            $('.formerror').removeClass('hide');
                            */
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
            } 
        });
        /*
        $('#signUpSubmitBtn').on('click', function(e) {
            e.preventDefault();
            showLoading();
            $('.formerror').addClass('hide');
            var formData = $('#signUpForm').serializeArray();
            var formValid = true;
            var email;

            for (var itemConstraint in formData){
                var element = $('#'+formData[itemConstraint]['name']);
                var constraintSatisfied = element.get(0).checkValidity();
                formData[itemConstraint].name === 'email' ? email = formData[itemConstraint].value.trim() : null;
                if(constraintSatisfied === false){
                    formValid = false;
                }
            }

            if (!formValid){
                console.log('+++++++++++ BAD FORM!')
                if(is_safari){
                    for (var elementValue in formData){
                        var element = $('#'+formData[elementValue]['name']);
                        $(element).trigger('change');
                    }
                }else{
                    $('<input type="submit">').hide().appendTo($('#signUpForm')).click().remove();
                }
                hideLoading();
                return false;
            }else{
                console.log('+++++++++++ GOOD FORM!')

                var serviceUrl = 'https://localhost:3000/api/evaluateuseremail';
                var data = {};

                var pathName = 'email';
                data[pathName] = email;
    
                pathName = 'expectedResponse';
                data[pathName] = 'false';

                $.ajax({
                    rejectUnauthorized: false,
                    url: serviceUrl,
                    type: 'POST',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                
                    success: function(data, status, xhr) {
                        if (data.message === 'success') {
                            console.log('signUpSubmitBtn > ajax > success > success')
                            $('#signUpForm').submit();
                        } else {
                            console.log('signUpSubmitBtn > ajax > success > error')
                            $('#email').addClass('has-error');
                            $('#confirmEmail').addClass('has-error');
                            $('#emailError').text('Please enter a different Email Address')
                            $('#confirmEmailError').text('Please enter a different Email Address')
                            $('#emailError').removeClass('hide').addClass('show'); 
                            $('#confirmEmailError').removeClass('hide').addClass('show');
                            $('.formerror').text('Your email address is already in our system. Log in, or enter a new email address');
                            $('.formerror').removeClass('hide');
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
            } 
        });
        */
        /*
        $('#password').on('focusin', function() {
            //helper.focusinX();
        });
        $('#password').on('input', function(){
            helper.inputX();
        });
        $('#password').on('change', function() {
            helper.changeX();
            helper.testPasswordInput('password');
            $(this).on('input', function(){
                helper.inputX();
                helper.testPasswordInput('password');
            });
        });
        */
        $('#password').on('focusout', function() {
            helper.testPasswordInput('password');
            $(this).on('input', function(){
                helper.inputX();
                helper.testPasswordInput('password');
            });
        });
        $('#confirmPassword').on('focusout', function() {
            helper.testPasswordInput('confirmPassword');
            $(this).on('input', function(){
                helper.inputX();
                helper.testPasswordInput('confirmPassword');
            });
        });
    },

    testPasswordInput: function(elemID) {
        var thisElementID = $('#'+elemID).attr('id');
        var thisElementValue = $('#'+elemID).val();
        var pattern = /^\S{4,}$/;
        var isThisElementValueValid = pattern.test(thisElementValue);
        var charCount = thisElementValue.length;
        var errorElement = $('#'+thisElementID+'Error');

        if(thisElementValue === ''){
            is_safari ? errorElement.text('Please fill out this field. Password must be at least 4 characters long. No whitespace allowed') : null;
            is_safari ? errorElement.removeClass('hide').addClass('show') : null; 
        }else if(charCount > 0 && charCount < 4){
            if(elemID === 'password'){
                is_safari ? errorElement.text('Please enter at least 4 character(s). You entered '+charCount+'. Password must be at least 4 characters  long. No whitespace allowed') : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
            }else{
                is_safari ? errorElement.text('Invalid input. Password must be at least 4 characters long. No whitespace allowed') : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. Password must be at least 4 characters long. No whitespace allowed') : null;
            }
        }else if(charCount >= 4){
            if(!isThisElementValueValid){
                is_safari ? errorElement.text('Invalid input. Password must be at least 4 characters long. No whitespace allowed') : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. Password must be at least 4 characters long. No whitespace allowed') : null;
            }else{
                is_safari ? errorElement.text('') : null;
                is_safari ? errorElement.removeClass('show').addClass('hide') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
                $('#'+elemID).off('input');
            }
        }
    },

    changeX: function() {
        console.log('changeX +++');
    },
    inputX: function() {
        console.log('inputX +++');
    },
    focusoutX: function() {
        console.log('focusoutX +++');
    },
    focusinX: function() {
        console.log('focusinX +++');
    },


    triggerFocusoutAllElements: function(currentValue, comparedValue) {
        console.log('triggerFocusoutAllElements +++');
        var formData = $('#signUpForm').serializeArray();
        if(is_safari){
            for (var elementValue in formData){
                var element = $('#'+formData[elementValue]['name']);
                $(element).trigger('focusout');
            }
        }
    },

    evaluateBasicTextSelectField: function(thisField) {
        console.log('evaluateBasicTextSelectField +++');
        var thisElementValue = $('#'+thisField).val();
        thisElementValue = thisElementValue.trim();

        var property1 = document.getElementsByName(thisField)[0];

        if(thisElementValue){
            console.log('evaluateBasicTextSelectField > VALID??? 1');
            is_safari ? $('#'+thisField+'Error').text('') : null;
            is_safari ? $('#'+thisField+'Error').removeClass('show').addClass('hide') : null;
            !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;

        }else{
            console.log('evaluateBasicTextSelectField > VALID??? 2');
            if (is_safari) {
                $('#'+thisField+'Error').text('Please fill out this field. ' + property1.title);
                $('#'+thisField+'Error').removeClass('hide').addClass('show'); 
            }
        }
    },

    validateEmailValue: function(email) {
        var emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    },

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    // BUG/ERROR is here. 
    // in above comparison:
    //  if (validValueName.value !== comparedValueName.value) {
    // this line is problem:
    //  $('#'+ comparedValue).get(0).setCustomValidity(helper.toTitleCase(inputType) + 's don\'t match');
    // GOOD: $('#' + comparedValue).get(0).setCustomValidity('');
    // BAD: $('#' + validValue).get(0).setCustomValidity('');

    //   validValue      comparedValue
    //   ----------      -------------
    //     email          confirmEmail      (email)
    //  confirmEmail         email          (confirmEmail)
    //    password       confirmPassword

    evaluateValidInputValues: function(validValue, comparedValue) {
        var validValueName = document.getElementsByName(validValue)[0];
        var comparedValueName = document.getElementsByName(comparedValue)[0];

        if ($('#' + comparedValue).val()) {
            var inputType = validValueName.type;
            
            if (validValueName.value !== comparedValueName.value) {
                if (is_safari) {
                    if (comparedValue === 'email') {
                        $('#' + validValue + 'Match').removeClass('hide').addClass('show');
                    } else {
                        $('#' + comparedValue + 'Match').removeClass('hide').addClass('show');
                    }
                } else {
                    $('#'+ comparedValue).get(0).setCustomValidity(helper.toTitleCase(inputType) + 's don\'t match');
                }
                return false;
            } 
          
            if (validValueName.value === comparedValueName.value) {
                if (is_safari) {
                    if (comparedValue === 'email') {
                        $('#' + validValue + 'Match').removeClass('show').addClass('hide');
                    } else {
                        $('#' + comparedValue + 'Match').removeClass('show').addClass('hide');
                    }
                } else {
                    if (comparedValue === 'email') {
                        $('#' + comparedValue).get(0).setCustomValidity('');
                    } else {
                        $('#'+ comparedValue).get(0).setCustomValidity('');
                    }
                }
                return true;
            }
        }        
        if (is_safari) {
            if($('#' + validValue).val() === ''){
                $('#'+validValue+'Error').text('Please fill out this field. ' + validValueName.title);
                $('#'+validValue+'Error').removeClass('hide').addClass('show');
            }
            if($('#' + comparedValue).val() === ''){
                $('#'+comparedValue+'Error').text('Please fill out this field. ' + comparedValueName.title);
                $('#'+comparedValue+'Error').removeClass('hide').addClass('show'); 
            }
        }
    },
    
    validateEmailField: function(thisFieldInput, thisField, comparedField) {
        //thisFieldInput = thisFieldInput.trim();
        //var thisElementValue = $('#'+thisField).val();
        var comparedElementValue = $('#'+comparedField).val();
        //comparedElementValue = comparedElementValue.trim();
        var property1 = document.getElementsByName(thisField)[0];
        var inputPlaceholder = property1.placeholder;

        if(helper.validateEmailValue(thisFieldInput)){
        
            if (is_safari) {
                $('#'+thisField+'Improper').removeClass('show').addClass('hide')
            } else {
                $('#'+thisField).get(0).setCustomValidity('');
            }

            if(helper.evaluateValidInputValues(thisField, comparedField)){
                return true;
            } else{
                return false;
            }

        }else{
            //if (thisElementValue && is_safari) {
            if (thisFieldInput && is_safari) {
                $('#'+thisField+'Error').text('Please fill out this field. Please type a valid Email Address');
                $('#'+thisField+'Error').removeClass('hide').addClass('show'); 
            }else{
                is_safari ? $('#'+thisField+'Improper').removeClass('hide').addClass('show') : null; 
                !is_safari ? $('#'+thisField).get(0).setCustomValidity(inputPlaceholder+' is in improper format') : null;
            }
            return false;
        }
    },

    evaluatePasswordField: function(thisField) {
        var thisElementValue = $('#'+thisField).val();
        var passwordPattern = /^\S{4,}$/;
        var isThisElementValueValid = passwordPattern.test(thisElementValue);
        var charCount = thisElementValue.length;
        var errorElement = $('#'+thisField+'Error');

        if(thisElementValue){
            if(charCount < 4 && thisField === 'password') {
                is_safari ? errorElement.text('Please enter at least 4 character(s). You entered '+charCount+'. Password must be at least 4 characters long. No whitespace allowed') : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
            }else{
                if(isThisElementValueValid){
                    is_safari ? errorElement.text('') : null;
                    is_safari ? errorElement.removeClass('show').addClass('hide') : null;
                    !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
                }else{
                    is_safari ? errorElement.text('Invalid input. Password must be at least 4 characters long. No whitespace allowed') : null;
                    is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                    !is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. Password must be at least 4 characters long. No whitespace allowed') : null;
                }
            }
        }else{
            is_safari ? errorElement.text('Please fill out this field. Password must be at least 4 characters long. No whitespace allowed') : null;
            is_safari ? errorElement.removeClass('hide').addClass('show') : null; 
        }
    },

    evaluateEmailField: function(thisField, comparedField) {
        var thisElementValue = $('#'+thisField).val();
        //thisElementValue = thisElementValue.trim();
        var thisErrorElement = $('#'+thisField+'Error');

        if(thisElementValue){
          
            if($('#'+thisField).hasClass('has-error')){
                $('#'+thisField).removeClass('has-error');
                thisErrorElement.removeClass('show').addClass('hide');
                thisErrorElement.text('Please fill out this field.');

                if(!$('#'+comparedField).hasClass('has-error')){
                    $('.formerror').text('');
                    $('.formerror').removeClass('show');
                }

            }
         
            if (helper.validateEmailValue(thisElementValue)) {
                is_safari ? thisErrorElement.text('') : null;
                is_safari ? thisErrorElement.removeClass('show').addClass('hide') : null;
            }else{
                is_safari ? thisErrorElement.text('Please enter an email address. Please type a valid Email Address') : null;
                is_safari ? thisErrorElement.removeClass('hide').addClass('show') : null;
            }

        }else{
            is_safari ? thisErrorElement.text('Please fill out this field. Please type a valid Email Address') : null;
            is_safari ? thisErrorElement.removeClass('hide').addClass('show') : null; 
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
}

$(function () {
    helper.init();
});
