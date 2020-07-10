
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
        // $(this).parent().siblings('div.bottom').find("input.post").focus();
        // n=$('table tr').length;
        // $('table').append('<tr><td><input name=field'+n+' autofocus></td><td><input name=value'+n+'></td></tr>');
        // $('input[name="aa"'+n+']').focus();
        // $("input:text:visible:first").focus();
        // $('input[@type="text"]')[0].focus(); 
        // ("#someTextBox").focus();
        // <input type="text" name="some_field" autofocus>

        /*
        // listen for capture phase 'change' event
        $('#signUpForm').get(0).addEventListener('change', function(e){
            console.log('signUpForm > addEventListener change > CAPTURE 1++ ', $(e.target).attr('id'));
            if ($(e.target).parents('div.confirmElement').length) {
                console.log('signUpForm > addEventListener change > CAPTURE 2++ ', $(e.target).attr('id'));
                $(this).data('confirmElement', true);
            }
        }, true);
        $('#signUpForm').on('focusout change', '#password', function(e) {
            console.log('password > focusout change ++');
            helper.handleElementEventsOnSubmit('password');
        });

        $('#signUpForm').on('focusout change', '#confirmPassword', function(e) {
            console.log('confirmPassword > focusout change ++');
            helper.handleElementEventsOnSubmit('confirmPassword');
        });
        */

        /*
        // listen for bubble phase 'change' event
        $('#signUpForm').get(0).addEventListener('change', function(e){
            console.log('signUpForm > addEventListener change > BUBBLE 1++ ', $(e.target).attr('id'));
            e.stopPropagation();
            $(this).data('confirmElement', false);
            if ($(e.target).parents('div.confirmElement').length) {
                console.log('signUpForm > addEventListener change > BUBBLE 2++ ', $(e.target).attr('id'));
                $(this).data('confirmElement', true);
            }
        }, false);
        */

        /*
        $('#password').on('focusout change', function(e) {
            console.log('password > focusout change ++');
            //helper.handleElementEventsOnSubmit('password');
            helper.handleElementEventsOnSubmit('password', e.type);
        });

        $('#confirmPassword').on('focusout change', function(e) {
            console.log('confirmPassword > focusout change ++');
            //helper.handleElementEventsOnSubmit('confirmPassword');
            helper.handleElementEventsOnSubmit('confirmPassword', e.type);
        });
        */

// focusin, change, focusout   mousedown
// $('#signUpForm').data('signUpFormActiveElement', $(document.activeElement).attr('id'));


        //$('body').on('mousedown', function(e) { 
            //console.log('body > mousedown ++: ', $(document.activeElement));
        //});

        /*
        $('#password').on('focusout', function(e) {
            console.log('password > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('password',pattern);
            });
            helper.testUserInput('password',pattern);
        });

        $('#password').on('change', function(e) {
            console.log('password > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPassword').on('focusout', function(e) {
            console.log('confirmPassword > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('confirmPassword',pattern);
            });
            helper.testUserInput('confirmPassword',pattern);
        });

        $('#confirmPassword').on('change', function(e) {
            console.log('confirmPassword > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });
        */

        /*
        $('#signUpForm').on('focusin', 'input', function(e) { 
            e.stopImmediatePropagation();
            console.log('#signUpForm > focusin > input > AE++: ', $(document.activeElement));
        });

        $('#signUpForm').on('focusout', 'input', function(e) { 
            e.stopImmediatePropagation();
            console.log('#signUpForm > focusout > input > AE++: ', $(document.activeElement));
        });

        $('#signUpForm').on('mousedown', 'input', function(e) { 
            e.stopImmediatePropagation();
            console.log('#signUpForm > mousedown > input > AE++: ', $(document.activeElement));
            console.log('#signUpForm > mousedown > input > DAE++: ', $('#signUpForm').data('activeElement'));

            $('#signUpForm').data('activeElement', $(document.activeElement));
            var ae = $('#signUpForm').data('activeElement');

            if(ae.prop('nodeName') !== 'BODY' && ae !== undefined){
    
                if(ae.attr('pattern')){
    
                    if(ae.attr('id') === 'displayname'){
                        helper.testUserInputEmail(ae.attr('id'), /^[A-Za-z0-9_]{4,21}$/);
                    }
    
                    if(ae.attr('id') === 'password' || ae.attr('id') === 'confirmPassword'){
                        helper.testUserInput(ae.attr('id'), /^\S{4,}$/);
                    }
    
                    if(ae.attr('id') === 'email' || ae.attr('id') === 'confirmEmail'){
                        helper.testUserInputEmail(ae.attr('id'), /\S+@\S+\.\S+/);
                    } 
                }
                console.log('body > #signUpForm > mousedown AE2++: ', $('#signUpForm').data('activeElement'));
            }
        });

        $('#password').on('change', function(e) {
            console.log('password > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPassword').on('change', function(e) {
            console.log('confirmPassword > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });
        */


        /*
        $('#signUpForm').on('focusin', function(e) {
            $(this).data('activeElement', $(document.activeElement));
            console.log('signUpForm > focusin ++: ', $(this).data('activeElement'));
        });

        $('#signUpForm').on('focusout', function(e) {
            console.log('signUpForm > focusout ++: ', $(this).data('activeElement'));
            var ae = $(this).data('activeElement');

            if(ae.attr('pattern')){
                console.log('signUpForm > focusout > pattern ++');

                if(ae.attr('id') === 'displayname'){
                    console.log('signUpForm > focusout > pattern > DISP ++');
                    helper.testUserInputEmail(ae.attr('id'), /^[A-Za-z0-9_]{4,21}$/);
                }

                if(ae.attr('id') === 'password' || ae.attr('id') === 'confirmPassword'){
                    console.log('signUpForm > focusout > pattern > PASS1 ++');
                    helper.testUserInput(ae.attr('id'), /^\S{4,}$/);
                }

                if(ae.attr('id') === 'email' || ae.attr('id') === 'confirmEmail'){
                    console.log('signUpForm > focusout > pattern > EMAIL ++');
                    helper.testUserInputEmail(ae.attr('id'), /\S+@\S+\.\S+/);
                }
                
            }
        });
        */

        /*
        $('#password').on('focusin', function(e) {
            console.log('password > focusin ++');
        });
        $('#password').on('focusout', function(e) {
            console.log('password > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('password',pattern);
            });
            helper.testUserInput('password',pattern);
        });
        $('#password').on('change', function(e) {
            console.log('password > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPassword').on('focusin', function(e) {
            console.log('confirmPassword > focusin ++');
        });
        $('#confirmPassword').on('focusout', function(e) {
            console.log('confirmPassword > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('confirmPassword',pattern);
            });
            helper.testUserInput('confirmPassword',pattern);
        });
        $('#confirmPassword').on('change', function(e) {
            console.log('confirmPassword > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });
        */




        /*
        $('#password').on('focusout', function(e) {
            console.log('password > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('password',pattern);
            });
            helper.testUserInput('password',pattern);
        });

        $('#password').on('change', function(e) {
            console.log('password > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPassword').on('focusout', function(e) {
            console.log('confirmPassword > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput('confirmPassword',pattern);
            });
            helper.testUserInput('confirmPassword',pattern);
        });

        $('#confirmPassword').on('change', function(e) {
            console.log('confirmPassword > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });
        */

        /*
        $('#signUpForm').get(0).addEventListener('focusin', function(e){
            $(this).data('signUpFormActiveElement', $(document.activeElement).attr('id'));
            console.log('signUpForm > addEventListener focusin ++ ', $(this).data('signUpFormActiveElement'));
            
        }, false);
        $('#signUpForm').get(0).addEventListener('focusout', function(e){
            console.log('signUpForm > addEventListener focusout ++ ', $(this).data('signUpFormActiveElement'));
            var pattern = /^\S{4,}$/;
            helper.testUserInput($(this).data('signUpFormActiveElement'),pattern);
        }, false);
        */

        /*
        $('#signUpSubmitBtn').on('click', function(e) {
            console.log('#signUpSubmitBtn > CLICK +++')
            e.preventDefault();
            e.stopImmediatePropagation();
            $(this).trigger('submit');
        });

        $('#signUpForm').on('focusin', 'input', function(e) {
            $(this).data('signUpFormActiveElement', $(document.activeElement).attr('id'));
            console.log('signUpForm > addEventListener focusin ++ ', $(this).data('signUpFormActiveElement'));
        });

        $('#signUpForm').on('focusout', 'input', function(e) {
            var ae = $(this).data('signUpFormActiveElement');
            console.log('signUpForm > addEventListener focusout ++ ', ae);
        });
        */

        /*
        $('#signUpSubmitBtnXX').on('click', function(e) {
            console.log('#signUpSubmitBtnXX > click > submit');
            e.preventDefault();
            $( "#signUpForm" ).submit();
        });

        $('#password').on('focusout change', function(e) {
            console.log('password > focusout change ++');
            //helper.handleElementEventsOnSubmit('password');
            helper.handleElementEventsOnSubmit('password', e.type);
        });

        $('#confirmPassword').on('focusout change', function(e) {
            console.log('confirmPassword > focusout change ++');
            //helper.handleElementEventsOnSubmit('confirmPassword');
            helper.handleElementEventsOnSubmit('confirmPassword', e.type);
        });
        */

        /*
        $('#password').on('focusin', function(e) {
            console.log('password > focusout ++');
            $(this).data('passwordVal', $(this).val());
        });

        $('#confirmPassword').on('focusin', function(e) {
            console.log('confirmPassword > focusout ++');
        });

        $('#password').on('focusout', function(e) {
            console.log('password > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                helper.testUserInput( $(this).attr('id') , pattern );
            });
            helper.testUserInput( $(this).attr('id') , pattern );
        });

        $('#confirmPassword').on('focusout', function(e) {
            console.log('confirmPassword > focusout ++');
        });
        */

        /*
        //$('#signUpForm').on('click', '#signUpSubmitBtn', function(e) {
        $('#signUpForm').on('click', function(e) {
            console.log('signUpForm > click > ++: ');
            e.preventDefault();
            e.stopPropagation();
        });

        $('#signUpSubmitBtn').on('click', function(e) {
            console.log('#signUpSubmitBtn > click +++');
            var ae = $('#signUpForm').data('signUpFormActiveElement');
            e.preventDefault();
            e.stopPropagation();
            //$('#'+ae).triggerHandler('focusout');
            //$(this).trigger('submit');
        });

        $('#password').on('focusin', function(e) {
            console.log('#password > focusin ++');
            $('#signUpForm').data('signUpFormActiveElement', $(document.activeElement).attr('id'));
        });

        $('#confirmPassword').on('focusin', function(e) {
            console.log('#confirmPassword > focusin ++');
            $('#signUpForm').data('signUpFormActiveElement', $(document.activeElement).attr('id'));
        });

        $('#password').on('focusout', function(e) {
            console.log('#password > focusout ++');
            e.preventDefault();
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                console.log('password > focusout > input ++');
                helper.testUserInput('password',pattern);
            });

            helper.testUserInput('password',pattern);
            
            if(helper.validateParams('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPassword').on('focusout', function(e) {
            console.log('#confirmPassword > focusout ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                console.log('confirmPassword > focusout > input ++');
                helper.testUserInput('confirmPassword',pattern);
            });

            helper.testUserInput('confirmPassword',pattern);
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });
  
        $('#passwordSectionXXXXX').on('focusout', '#password', function(e) {
            console.log('#passwordSection > focusout > password ++');
            //e.stopImmediatePropagation();
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                console.log('password > focusout > input ++');
                helper.testUserInput('password',pattern);
            });
            helper.testUserInput('password',pattern);

            $.when('focusout').done(function() {
              console.log('PPPPPPPPPPPPPPPPPPPP ++');
            });
        });


        $('#signUpFormXXXX').on('focusout', 'password', function(e) {
            e.stopPropagation();
            console.log('#signUpForm > focusout > password ++');
            var pattern = /^\S{4,}$/;
            $(this).on('input', function(){
                console.log('password > focusout > input ++');
                helper.testUserInput('password',pattern);
            });
            helper.testUserInput('password',pattern);

            $.when('focusout').done(function() {
              console.log('PPPPPPPPPPPPPPPPPPPP ++');
            });
        });

        $('#passwordXX').on('focusin', function(e) {
            $('#signUpForm').data('signUpFormActiveElement', $(document.activeElement).attr('id'));
            console.log('password > focusin ++ ', $('#signUpForm').data('signUpFormActiveElement'));
        });

        $('#passwordXXX').on('change', function(e) {
            console.log('password > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#confirmPassword').off('input');
            }
        });

        $('#confirmPasswordXX').on('focusout', function(e) {
            console.log('confirmPassword > focusout ++');
            var pattern = /^\S{4,}$/;

            $(this).on('input', function(){
                console.log('confirmPassword > focusout > input ++');
                helper.testUserInput('confirmPassword',pattern);
            });
            helper.testUserInput('confirmPassword',pattern);

            $(this).trigger('input');
            $(this).trigger('change');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });

        $('#confirmPasswordXX').on('change', function(e) {
            console.log('confirmPassword > change ++');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#password').off('input');
            }
        });
        */

        $('#displayname').on('focusout', function(e) {
            helper.handleElementEventsOnSubmit('displayname');
        });

        $('#email').on('focusout change', function(e) {
            console.log('#email > focusout change ++');
            helper.handleElementEventsOnSubmit('password','confirmEmail', e.type);
        });

        $('#confirmEmail').on('focusout change', function(e) {
            console.log('#confirmEmail > focusout change ++');
            helper.handleElementEventsOnSubmit('confirmEmail','password', e.type);
        });


        $('#password').on('focusout change', function(e) {
            console.log('#password > focusout change ++');
            helper.handleElementEventsOnSubmit('password','confirmPassword', e.type);
        });

        $('#confirmPassword').on('focusout change', function(e) {
            console.log('#confirmPassword > focusout change ++');
            helper.handleElementEventsOnSubmit('confirmPassword','password', e.type);
        });

        $('#firstname').on('focusout', function(e) {
            helper.handleElementEventsOnSubmit('firstname');
        });

        $('#lastname').on('focusout', function(e) {
            helper.handleElementEventsOnSubmit('lastname');
        });

        $('#city').on('focusout', function(e) {
            helper.handleElementEventsOnSubmit('city');
        });

        $('#state').on('focusout change', function(e) {
            helper.handleElementEventsOnSubmit('state');
        });

        $('#signUpForm').on('submit', function(e) {
            console.log('#signUpForm > SUBMIT ++');
            e.preventDefault();
            e.stopPropagation();
            showLoading();
            $('.formerror').addClass('hide');
            var data = helper.postData();
            var formValid = true;

            for (var constraintElement in data){
                var element = $('#'+constraintElement);
                var constraintSatisfied = element.get(0).checkValidity();
                var invalidElement = element.data('invalid');
                if(constraintSatisfied === false || invalidElement === 'true'){
                    formValid = false;
                    break;
                }
            }
    
            if (!formValid){
                console.log('+++++++++++ BAD FORM!!!!!!!!')
                if(is_safari){

                    var confirmElement = $(this).data('confirmElement');
                    console.log('#signUpForm > SUBMIT > ++ > confirmElement: ', confirmElement);
                    $(this).data('confirmElement', false);
                    /*
                    var ae = $('#signUpForm').data('signUpFormActiveElement');
                    if(ae !== undefined && ae !== 'signUpSubmitBtn'){
                        console.log('#signUpForm > SUBMIT +++ DOING SPECIFIC EVENT: ', ae);
                        helper.handleElementEventsOnSubmit(ae, true, e.type);
                        $(this).data('signUpFormActiveElement', 'signUpSubmitBtn');
                    }else{
                        console.log('#signUpForm > SUBMIT +++ DOING ALL EVENTS: ', ae);
                        for (var elementValue in data){
                            var element = $('#'+elementValue);
                            helper.handleElementEventsOnSubmit(elementValue, true, e.type);
                        }
                    }
                    */
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


    },


    formatDate: function(date) {
       return (date.getHours() < 10 ? '0' : '') + date.getHours() +
               ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() +
               ':' + (date.getSeconds() < 10 ? '0' : '') + date.getSeconds() +
               '.' + (date.getMilliseconds() < 10 ? '00' : (date.getMilliseconds() < 100 ? '0' : '')) +
               date.getMilliseconds();
    },

    handleElementEventsOnSubmit: function(elementID,confirmElementID,eType) {
        console.log('handleElementEventsOnSubmit +++1', elementID);

        elementID === 'displayname' ? helper.displaynameOnFocusout(elementID) : null;

        elementID === 'email' ? helper.emailOnFocusoutChange(elementID,confirmElementID, eType) : null;
        elementID === 'confirmEmail' ? helper.emailOnFocusoutChange(elementID,confirmElementID, eType) : null;

        elementID === 'password' ? helper.passwordOnFocusoutChange(elementID, confirmElementID, eType) : null;
        elementID === 'confirmPassword' ? helper.passwordOnFocusoutChange(elementID, confirmElementID, eType) : null;

        elementID === 'firstname' ? helper.evaluateBasicTextSelectField(elementID) : null;
        elementID === 'lastname' ? helper.evaluateBasicTextSelectField(elementID) : null;
        elementID === 'city' ? helper.evaluateBasicTextSelectField(elementID) : null;
        elementID === 'state' ? helper.selectElementOnFocusoutChange(elementID) : null;
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

    passwordOnFocusoutChange: function(elementID,confirmElementID,eType) {
        var thisElement = $('#'+elementID);
        var pattern = /^\S{4,}$/;
        console.log('passwordOnFocusoutChange ++');

        if (eType === 'change') {
            console.log('passwordOnFocusoutChange ++ > CHANGE');
            if(helper.validateParams('password', 'confirmPassword')){
                $('#'+confirmElementID).off('input');
            }
        }else{
            console.log('passwordOnFocusoutChange ++ > FOCUSOUT');
            thisElement.on('input', function(){
                helper.testUserInput(elementID,pattern);
            });
            helper.testUserInput(elementID,pattern);
        }
    },


    emailOnFocusoutChange: function(elementID, confirmElementID) {
        console.log('emailOnFocusoutChange ++')
        var thisElement = $('#'+elementID);

        if (eType === 'change') {
            helper.validateEmailField(elementID, confirmElementID);
        }else{
            thisElement.on('input', function(){
                helper.testUserInputEmail(elementID);
            });
            helper.testUserInputEmail(elementID);

        }

        thisElement.on('input', function(){
            helper.testUserInputEmail(elementID);
        });
        helper.testUserInputEmail(elementID);
    },

    selectElementOnFocusoutChange: function(elementID) {
        console.log('selectElementOnFocusoutChange ++');
        var thisElement = $('#'+elementID);
        var thisElementValue = thisElement.val();

        if(thisElementValue !== ''){
            is_safari ? $('#'+elementID+'Error').text('') : null;
            is_safari ? $('#'+elementID+'Error').removeClass('show').addClass('hide') : null;
            !is_safari ? thisElement.get(0).setCustomValidity('') : null;

        }else{
            is_safari ? $('#'+elementID+'Error').text('Please select an option. '+$('#'+elementID).attr('title')) : null;
            is_safari ? $('#'+elementID+'Error').removeClass('hide').addClass('show') : null; 
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


    validateParams: function(str1, str2) {
        console.log('validateParams ++');

        //if ($('#' + str2).val() !== '') {

            console.log('validateParams ++1')
            var property1 = document.getElementsByName(str1)[0];
            var property2 = document.getElementsByName(str2)[0];

            if (property1.value !== property2.value) {

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
        //}

        console.log('validateParams ++2')
    },



    validateEmailValue: function(email) {
        var emailPattern = /\S+@\S+\.\S+/;
        return emailPattern.test(email);
    },

    validateEmailField: function(thisField, comparedField) {
        var property1 = document.getElementsByName(thisField)[0];
        var inputPlaceholder = property1.placeholder;

        if (helper.validateEmailValue($('#'+thisField).val())) {

            is_safari ? $('#'+thisField+'Improper').removeClass('show').addClass('hide') : null; 
            !is_safari ? $('#'+thisField).get(0).setCustomValidity('') : null;
            $('#'+thisField).off('input');

            if(helper.validateEmailService($('#'+thisField).val())){

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

This answer uses promises, a JavaScript feature of the ECMAScript 6 standard. If your target platform does not support promises, polyfill it with PromiseJs.

Promises are a new (and a lot better) way to handle asynchronous operations in JavaScript:

$('a.button').click(function(){
    if (condition == 'true'){
        function1(someVariable).then(function() {
            //this function is executed after function1
            function2(someOtherVariable);
        });
    }
    else {
        doThis(someVariable);
    }
});


function function1(param, callback) {
    return new Promise(function (fulfill, reject){
        //do stuff
        fulfill(result); //if the action succeeded
        reject(error); //if the action did not succeed
    });
} 

This may seem like a significant overhead for this simple example, but for more complex code it is far better than using callbacks. You can easily chain multiple asynchronous calls using multiple then statements:

function1(someVariable).then(function() {
    function2(someOtherVariable);
}).then(function() {
    function3();
});

You can also wrap jQuery deferrds easily (which are returned from $.ajax calls):

Promise.resolve($.ajax(...params...)).then(function(result) {
    //whatever you want to do after the request
});


        */









