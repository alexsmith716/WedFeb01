
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

        $('#signUpForm').data('signUpFormActiveElement');
        helper.initializeJqueryEvents();
    },

    initializeJqueryEvents:  function(){

        //var emailPattern = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+\/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
        //var emailPattern = /\S+@\S+\.\S+/;
        //var passwordPattern = /^\S{4,}$/;
        //var passwordPattern = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        // /^[^ ][\w\W ]*[^ ]/
        // [^ ][A-Za-z0-9_][^ ]{4,21}$

        $('#signUpFormXX').on('submit', function(e) {
            console.log('#signUpForm > SUBMIT +++');
            e.preventDefault();
        });

        $('#signUpForm').on('submit', function(e) {
            console.log('#signUpForm > SUBMIT +++');
            e.preventDefault();
            showLoading();
            $('.formerror').addClass('hide');
            //var formData = $(this).serializeArray();
            var data = helper.postData();
            var formValid = true;

            //console.log('DATA1? +++: ', data);
            //console.log('DATA2? +++: ', JSON.stringify(data));
            //console.log('FORM? +++: ', $(this));

            for (var constraintElement in data){
                var element = $('#'+constraintElement);
                var constraintSatisfied = element.get(0).checkValidity();


                var invalidElement = element.data('invalid');

                //console.log('signUpForm > SUBMIT > constraintSatisfied > element: ', element);
                //console.log('signUpForm > SUBMIT > constraintSatisfied > constraintSatisfied: ', constraintSatisfied);
                //console.log('signUpForm > SUBMIT > constraintSatisfied > invalidElement: ', invalidElement);
                //console.log('+++++++++++++++++++++++++++++++');
                if(constraintSatisfied === false || invalidElement === 'true'){
                    formValid = false;
                    //break;
                }
            }

            if (!formValid){
                console.log('+++++++++++ BAD FORM!')
                if(is_safari){

                    for (var elementValue in data){
                        var element = $('#'+elementValue);
                        helper.handleActiveElementEvent(elementValue, false);
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
        $('body').on('click', function(e) {
            var ae = $('#signUpForm').data('signUpFormActiveElement');
            var target = $(e.target);

            if(target.is('form[name="signUpForm"]')) {
               console.log('body > CLICK > TARGET > form > #signUpForm ++');

            }else if(target.is('#signUpSubmitBtn')) {
               console.log('body > CLICK > TARGET > #signUpSubmitBtn ++');

            }else{
                console.log('body > CLICK > TARGET: ', target);

            }

            if('submit' === e.target.type){
                //console.log('#signUpSubmitBtn > CLICK +++')
                //$('#signUpSubmitBtn').trigger('submit');
            }
        });
        */

        $('#signUpSubmitBtn').on('click', function(e) {
            console.log('#signUpSubmitBtn > CLICK +++')
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).trigger('submit');
        });

        /*
        $('body').on('click', function(e) {
            e.preventDefault();
            var ae = $('#signUpForm').data('signUpFormActiveElement');
            console.log('body > CLICK > ae: ', ae);
            helper.handleActiveElementEvent(ae, true);
        });

        $('#signUpForm').on('focusin', function(e) {
            console.log('#signUpForm > FOCUSIN +++')
            e.preventDefault();
            e.stopImmediatePropagation();
            var ae = $('#signUpForm').data('signUpFormActiveElement');

            helper.handleActiveElementEvent(ae, true, e.type);
        });
        */

        $('#signUpForm').on('focusin', function(e) {
            $('#signUpForm').data('signUpFormActiveElement', $(document.activeElement).attr('id'))
            console.log('#signUpForm > FOCUSIN +++');
            //e.stopImmediatePropagation();
            //var ae = $('#signUpForm').data('signUpFormActiveElement');
            //helper.handleActiveElementEvent(ae, true, e.type);
        });
        $('#signUpForm').on('focusout', function(e) {
            var ae = $('#signUpForm').data('signUpFormActiveElement');
            console.log('#signUpForm > FOCUSOUT > ae: ', ae);
            //e.stopImmediatePropagation();
            //var ae = $('#signUpForm').data('signUpFormActiveElement');
            //helper.handleActiveElementEvent(ae, true, e.type);
        });
 
        /*
        $('#password').on('change', function(e) {
            console.log('#password > CHANGE +++')
            if(helper.validateParams('password', 'confirmPassword')){
                $(this).data('invalid', 'false');
                $('#confirmPassword').data('invalid', 'false');
                $('#confirmPassword').off('input');
            }else{
                $(this).data('invalid', 'true');
                $('#confirmPassword').data('invalid', 'true');
            }
        });

        $('#confirmPassword').on('change', function(e) {
            console.log('#confirmPassword > CHANGE +++')
            if(helper.validateParams('password', 'confirmPassword')){
                $(this).data('invalid', 'false');
                $('#password').data('invalid', 'false');
                $('#password').off('input');
            }else{
                $(this).data('invalid', 'true');
                $('#password').data('invalid', 'true');
            }
        });

        $('#email').on('change', function(e) {
            console.log('#email > CHANGE +++')
            if(helper.validateEmailField($(this).val(), 'email', 'confirmEmail')){
                $(this).data('invalid', 'false');
                $('#confirmEmail').data('invalid', 'false');
            }else{
                $(this).data('invalid', 'true');
                $('#confirmEmail').data('invalid', 'true');
            }
        });

        $('#confirmEmail').on('change', function(e) {
            console.log('#confirmEmail > CHANGE +++')
            if(helper.validateEmailField($(this).val(), 'confirmEmail', 'email')){
                $(this).data('invalid', 'false');
                $('#email').data('invalid', 'false');
            }else{
                $(this).data('invalid', 'true');
                $('#email').data('invalid', 'true');
            }
        });
        */
    },

    handleActiveElementEvent: function(ae, doActiveElement, eventType) {
        var ae;
        doActiveElement ? ae = $('#signUpForm').data('signUpFormActiveElement') : null;
        console.log('handleActiveElementEvent > ae: ', ae, ' :: ', $(document.activeElement).attr('id'))

        if(ae !== undefined && ae !== $(document.activeElement).attr('id')){
            if($('#'+ae).prop('nodeName') === 'SELECT'){
                helper.selectElementOnChange(ae);

            }else{
                console.log('handleActiveElementEvent ++2');
                ae === 'displayname' ? helper.displaynameOnFocusout(ae) : null;
                ae === 'email' ? helper.emailOnFocusout(ae) : null;
                ae === 'confirmEmail' ? helper.emailOnFocusout(ae) : null;
                ae === 'password' ? helper.passwordOnFocusout(ae) : null;
                ae === 'confirmPassword' ? helper.passwordOnFocusout(ae) : null;
                ae === 'firstname' ? helper.evaluateBasicTextSelectField(ae) : null;
                ae === 'lastname' ? helper.evaluateBasicTextSelectField(ae) : null;
                ae === 'city' ? helper.evaluateBasicTextSelectField(ae) : null;
            } 
        }
        eventType === 'focusin' ? $('#signUpForm').data('signUpFormActiveElement', $(document.activeElement).attr('id')) : null;
    },

    displaynameOnFocusout: function(element) {
        console.log('displaynameOnFocusout ++');
        var thisElement = $('#'+element);
        var pattern = /^[A-Za-z0-9_]{4,21}$/;
        thisElement.on('input', function(){
            helper.testUserInput(element,pattern);
        });
        helper.testUserInput(element,pattern);
    },

    passwordOnFocusout: function(element) {
        console.log('passwordOnFocusout ++');
        var thisElement = $('#'+element);
        var pattern = /^\S{4,}$/;
        thisElement.on('input', function(){
            helper.testUserInput(element,pattern);
        });
        helper.testUserInput(element,pattern);
    },

    emailOnFocusout: function(element) {
        console.log('emailOnFocusout ++')
        var thisElement = $('#'+element);
        thisElement.on('input', function(){
            helper.testUserInputEmail(element);
        });
        helper.testUserInputEmail(element);
    },

    selectElementOnChange: function(element) {
        console.log('selectElementOnChange ++');
        var thisElement = $('#'+element);
        var thisElementValue = thisElement.val();

        if(thisElementValue !== ''){
            is_safari ? $('#'+element+'Error').text('') : null;
            is_safari ? $('#'+element+'Error').removeClass('show').addClass('hide') : null;
            !is_safari ? thisElement.get(0).setCustomValidity('') : null;

        }else{
            is_safari ? $('#'+element+'Error').text('Please select an option. '+$('#'+element).attr('title')) : null;
            is_safari ? $('#'+element+'Error').removeClass('hide').addClass('show') : null; 
        }
    },

    toTitleCase: function(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    testUserInput: function(elemName,pattern) {
        console.log('testUserInput ++');
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

    // $('#'+thisField).data('invalid', 'true');
    validateParams: function(str1, str2) {

        console.log('validateParams ++1')
        if ($('#' + str2).val() !== '') {

            console.log('validateParams ++2')
            var property1 = document.getElementsByName(str1)[0];
            var property2 = document.getElementsByName(str2)[0];

            if (property1.value !== property2.value) {
                console.log('validateParams ++3')
                if (is_safari) {
                    if (str2 === 'email') {
                        $('#' + str1 + 'Match').removeClass('hide').addClass('show');
                    } else {
                        $('#' + str2 + 'Match').removeClass('hide').addClass('show');
                    }
                } else {
                    $('#'+ str2).get(0).setCustomValidity(helper.toTitleCase(str1) + 's don\'t match');
                }
                return false;

            } else {

                console.log('validateParams ++4')
                if (is_safari) {
                    if (str2 === 'email') {
                        $('#' + str1 + 'Match').removeClass('show').addClass('hide');
                    } else {
                        $('#' + str2 + 'Match').removeClass('show').addClass('hide');
                    }

                } else {
                    if (str2 === 'email') {
                        $('#' + str1).get(0).setCustomValidity('');
                    } else {
                        $('#'+ str2).get(0).setCustomValidity('');
                    }
                }
                return true;
            }
        }
    },

    validateEmailValue: function(email) {
        var emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    },

    validateEmailField: function(thisFieldInput, thisField, comparedField) {
        var property1 = document.getElementsByName(thisField)[0];
        var inputPlaceholder = property1.placeholder;

        if (helper.validateEmailValue(thisFieldInput)) {

            is_safari ? $('#'+thisField+'Improper').removeClass('show').addClass('hide') : null; 
            !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
            $('#'+thisField).off('input');

            if(helper.validateEmailService(thisFieldInput)){

                is_safari ? $('#emailRegistered').removeClass('hide').addClass('show') : null;
                !is_safari ? $('#'+thisField).get(0).setCustomValidity('This email address is already in our system. Sign in, or enter a new email address') : null;
                return false;

            } else {

                is_safari ? $('#emailRegistered').removeClass('show').addClass('hide') : null;

                if(helper.validateParams(thisField, comparedField)){
                    //helper.unBindField(thisField);
                    return true;

                } else{
                    return false;
                }
            }
        } else{

            is_safari ? $('#'+thisField+'Improper').removeClass('hide').addClass('show') : null; 
            !is_safari ? $('#'+thisField).get(0).setCustomValidity(inputPlaceholder+' is in improper format') : null;
            return false;
        }
    },

    unBindField: function(id) {
        $('#'+id).off('change');
        $('#'+id).unbind('change');
        $('#'+id).get(0).setCustomValidity('');
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

/*
focusout:

*** STARTS ON INPUT ******************************

$(this).on('input', function(){
    helper.testUserInput('password',pattern);
});
helper.testUserInput('password',pattern);

*************************************************




change (password):

*******************************************************************

if(helper.validateParams('password', 'confirmPassword')){
    $('#confirmPassword').off('input');
}

*******************************************************************





change (email / basic text / SELECT):

*******************************************************************

helper.validateEmailField($(this).val(), 'email', 'confirmEmail');
    if(email valid)
        if(email !registered)
            helper.validateParams(thisField, comparedField)


helper.evaluateBasicTextSelectField('city');

SELECT
*******************************************************************
*/



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









