
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


        $('#signUpForm').on('submit', function(e) {
            console.log('signUpForm > SUBMIT +++++');
            e.preventDefault();
        });

        $('#signUpFormXXX').on('submit', function(e) {
            console.log('signUpForm > SUBMIT');
            e.preventDefault();
            showLoading();
            $('.formerror').addClass('hide');
            //var formData = $('#signUpForm').serializeArray();
            var data = helper.postData();
            var formValid = true;

            console.log('DATA1? +++: ', data);
            console.log('DATA2? +++: ', JSON.stringify(data));

            for (var constraintElement in data){
                var element = $('#'+constraintElement);
                var constraintSatisfied = element.get(0).checkValidity();
                console.log('signUpForm > SUBMIT > constraintSatisfied +++: ', element, ' : ', constraintSatisfied);
                if(constraintSatisfied === false){
                    formValid = false;
                    //break;
                }
            }

            if (!formValid){
                console.log('+++++++++++ BAD FORM!')
                if(is_safari){
               
                    for (var elementValue in data){
                        var element = $('#'+elementValue);
                        $(element).prop('nodeName') === 'SELECT' ? $(element).trigger('change') : $(element).trigger('focusout');
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

        $('div').each(function(){
            //console.log('div > each > function +++')
        });

        $('body').on('focus', '.wrapper', function(e) {
           console.log('body > FOCUS > wrapper: ', $(document.activeElement))
        });

        /*
        $('#signUpForm').on('input', '.form-control', function(e) {
            //e.preventDefault();
            //$('#displayname').removeClass('focus');
            //$('#displayname').off('focusout');
            console.log('signUpForm > BUBBLE1 > input: ', $(document.activeElement))
        });
        $('#signUpForm').on('focusout', '.form-control', function(e) {
            //e.preventDefault();
            //$('#displayname').removeClass('focus');
            //$('#displayname').off('focusout');
            console.log('signUpForm > BUBBLE2 > focusoutYY: ', $(this));
        });
        $('#signUpForm').on('focusout', '#displayname', function(e) {
            //e.preventDefault();
            //$('#displayname').removeClass('focus');
            //$('#displayname').off('focusout');
            console.log('signUpForm > BUBBLE3 > displayname: ', $(this));
            if($(this).attr('id') === 'displayname'){
                var pattern = /^[A-Za-z0-9_]{4,21}$/;
                $(this).on('input', function(){
                    helper.testUserInput('displayname',pattern);
                });
                helper.testUserInput('displayname',pattern);
            }
            var pattern = /^[A-Za-z0-9_]{4,21}$/;
            helper.testUserInput('displayname',pattern);
        });
        $('#signUpForm').on('focus', '#signUpSubmitBtn', function(e) {
            //e.preventDefault();
            //$('#displayname').removeClass('focus');
            //$('#displayname').off('focusout');
            console.log('signUpForm > BUBBLE4 > focusAA: ', $(this));
        });
        $('#signUpForm').on('focus', '#password', function(e) {
            //e.preventDefault();
            //$('#displayname').removeClass('focus');
            //$('#displayname').off('focusout');
            console.log('signUpForm > BUBBLE5 > focusPP: ', $(this));
        });
        $('#signUpForm').on('blur', '#displayname', function(e) {
            //e.preventDefault();
            //$('#displayname').removeClass('focus');
            //$('#displayname').off('focusout');
            console.log('signUpForm > BUBBLE6 > displayname: ', $(this));
        });
        $('#displayname').on('focusout', function(e) {
            console.log('displayname > focusout +++');
            e.preventDefault();
            var pattern = /^[A-Za-z0-9_]{4,21}$/;
            $(this).on('input', function(){
                helper.testUserInput('displayname',pattern);
            });
            helper.testUserInput('displayname',pattern);
        });
        */




        $('#password').on('focusout', function(e) {
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('password',pattern);
            });
            helper.testUserInput('password',pattern);
        });

        $('#password').on('change', function(e) {
            if(helper.evaluateValidInputValues('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPassword').on('focusout', function(e) {
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('confirmPassword',pattern);
            });
            helper.testUserInput('confirmPassword',pattern);
        });

        $('#confirmPassword').on('change', function(e) {
            if(helper.evaluateValidInputValues('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });







        $('#email').on('focusout', function(e) {
            $(this).on('input', function(){
                helper.testUserInputEmail('email');
            });
            helper.testUserInputEmail('email');
        });

        $('#email').on('change', function(e) {
            helper.validateEmailField($(this).val(), 'email', 'confirmEmail');
        });

        $('#confirmEmail').on('focusout', function(e) {
            $(this).on('input', function(){
                helper.testUserInputEmail('confirmEmail');
            });
            helper.testUserInputEmail('confirmEmail');
        });

        $('#confirmEmail').on('change', function(e) {
            helper.validateEmailField($(this).val(), 'confirmEmail', 'email');
        });

        $('#firstname').on('focusout', function(e) {
            helper.evaluateBasicTextSelectField('firstname');
        });

        $('#lastname').on('focusout', function(e) {
            helper.evaluateBasicTextSelectField('lastname');
        });

        $('#city').on('focusout', function(e) {
            helper.evaluateBasicTextSelectField('city');
        });

        $('#state').on('change', function(e) {
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
    },

    validateEmailValue: function(email) {
        var emailPattern = /\S+@\S+\.\S+/;
        console.log('validateEmailValue: ', emailPattern.test(email));
        return emailPattern.test(email);
    },

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    evaluateValidInputValues: function(validValue, comparedValue) {

        if ($('#' + comparedValue).val() !== '') {
    
            var validValueName = document.getElementsByName(validValue)[0];
            var comparedValueName = document.getElementsByName(comparedValue)[0];
            var inputType = validValueName.type;
            
            if (validValueName.value !== comparedValueName.value) {
                if (is_safari) {
                    if (comparedValue === 'email') {
                        $('#' + validValue + 'Match').removeClass('hide').addClass('show');
                        return false;
                    } else {
                        $('#' + comparedValue + 'Match').removeClass('hide').addClass('show');
                        return false;
                    }
                } else {
                    $('#'+ comparedValue).get(0).setCustomValidity(helper.toTitleCase(inputType) + 's don\'t match');
                    return false;
                }
    
            }else{
                if (is_safari) {
                    if (comparedValue === 'email') {
                        $('#' + validValue + 'Match').removeClass('show').addClass('hide');
                        return true;
                    } else {
                        $('#' + comparedValue + 'Match').removeClass('show').addClass('hide');
                        return true;
                    }
                } else {
                    if (comparedValue === 'email') {
                        $('#' + comparedValue).get(0).setCustomValidity('');
                        return true;
                    } 
                }
            }
        } 
    },

    testUserInput: function(elemName,pattern) {
        var thisElementID = $('#'+elemName).attr('id');
        var thisElementValue = $('#'+elemName).val();
        var patternTestValue = pattern.test(thisElementValue);
        var charCount = thisElementValue.length;
        var errorElement = $('#'+thisElementID+'Error');
        var title = $('#'+elemName).attr('title');

        if(thisElementValue === ''){
            is_safari ? errorElement.text('Please fill out this field. '+ title) : null;
            is_safari ? errorElement.removeClass('hide').addClass('show') : null;

        }else if(charCount > 0 && charCount < 4){

            if(elemName.indexOf('confirm') != -1) {
                is_safari ? errorElement.text('Invalid input. '+ title) : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. '+ title) : null;

            }else{
                is_safari ? errorElement.text('Please enter at least 4 character(s). You entered '+charCount+'. '+ title) : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;

            }

        }else if(charCount >= 4){

            if(!patternTestValue){
                is_safari ? errorElement.text('Invalid input. '+$('#'+elemName).attr('title')) : null;
                is_safari ? errorElement.removeClass('hide').addClass('show') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('Invalid input. '+ title) : null;

            }else{
                is_safari ? errorElement.text('') : null;
                is_safari ? errorElement.removeClass('show').addClass('hide') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
                $('#'+elemName).off('input');

            }
        }
        console.log('testUserInput > !!!!!!!')
    },

    testUserInputEmail: function(elemName) {
        var thisElementValue = $('#'+elemName).val();
        var thisErrorElement = $('#'+elemName+'Error');
        var title = $('#'+elemName).attr('title');

        if (helper.validateEmailValue(thisElementValue)) {
            is_safari ? thisErrorElement.text('') : null;
            is_safari ? thisErrorElement.removeClass('show').addClass('hide') : null;
            $('#'+elemName).off('input');

        }else if(thisElementValue === ''){
            is_safari ? thisErrorElement.text('Please fill out this field. ' + title) : null;
            is_safari ? thisErrorElement.removeClass('hide').addClass('show') : null;

        }else{
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
        data[pathName] = 'false';

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
                    //result = false;
                    result = true;
                } else {
                    console.log('validateEmailService > ERROR')
                    //result = true;
                    result = false;
                }
            }
        });
        return result;
    },

    validateEmailField: function(thisFieldInput, thisField, comparedField) {
        if (helper.validateEmailValue(thisFieldInput)) {

            is_safari ? $('#'+thisField+'Improper').removeClass('show').addClass('hide') : null; 
            !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
            $('#'+thisField).off('input');

            if(helper.validateEmailService(thisFieldInput)){

                is_safari ? $('#emailRegistered').removeClass('show').addClass('hide') : null; 

                if(helper.evaluateValidInputValues(thisField, comparedField)){
                    return true;

                } else{
                    return false;
                }
                //console.log('validateEmailField > validateEmailService > EMAIL-ALREADY-IN-SYSTEM');
                /*
                is_safari ? $('#emailRegistered').removeClass('hide').addClass('show') : null; 
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('It seems your email address is already in our system. Sign in, or enter a new email address') : null;
                return false;
                */

            } else {

                is_safari ? $('#emailRegistered').removeClass('hide').addClass('show') : null; 
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('This email address is already in our system. Sign in, or enter a new email address') : null;
                return false;
                //console.log('validateEmailField > validateEmailService > EMAIL-NOT-IN-SYSTEM');
                /*
                is_safari ? $('#emailRegistered').removeClass('show').addClass('hide') : null; 

                if(helper.evaluateValidInputValues(thisField, comparedField)){
                    return true;

                } else{
                    return false;
                }
                */
            }
        } else{

            is_safari ? $('#'+thisField+'Improper').removeClass('hide').addClass('show') : null; 
            !is_safari ? $('#'+thisField).get(0).setCustomValidity(inputPlaceholder+' is in improper format') : null;
            return false;
        }
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
