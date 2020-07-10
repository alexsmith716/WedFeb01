
var helper = {

    init: function() {

        helper.initializeJqueryEvents();
    },

    initializeJqueryEvents:  function(){

        $('#editProfileFormModal').on('shown.bs.modal', function() {
          $(this).find('[autofocus]').focus();
          //var hasFocus = $('#state').is(':focus');
          //var hasFocus = $('#inputElement').is(':focus');
        });

        $('#editProfileFormModal').on('hidden.bs.modal', function (e) {
            //$('#editProfileForm').get(0).reset();
            $('#editProfileForm .editProfileFormError').removeClass('show').addClass('hide');
            $('#editProfileForm .editProfileFormError').text('');
            $('#editProfileInputElement').val('');
            $('#state').val('').trigger('change');
        });

        $('#personalInfoToggle').click(function(){
            helper.toggleEditBtn('personalInfo', true);
        });

        $('#personalInfoUpdate').click(function(){
            helper.toggleEditBtn('personalInfo', false);
        });

        $('#accountInfoToggle').click(function(){
            helper.toggleEditBtn('accountInfo', true);
        });

        $('#accountInfoUpdate').click(function(){
            helper.toggleEditBtn('accountInfo', false);
        });

        $('.editFormElement').click(function(){
            helper.doEditProfileModal('editProfileFormModal', 'editProfileForm', this);
        });

        $('#submitEditProfileBtn').on('click', function(e) {
            console.log('#submitEditProfileBtn > click ++++')
            e.preventDefault();

            // whichformelementid === firstNameBtn
            var whichFormElementID = $('#editProfileForm').data('whichformelementid');
            // whichformelement === editProfileInputElement/state
            //var whichType = $('#editProfileForm').data('whichformelement');

            //$('#'+editProfileFormID).data('whichformelementid', editBtnClickedParentID);
            //$('#'+editProfileFormID).data('whichformelement', whichFormElementID);

            console.log('#submitEditProfileBtn > evaluateInput > whichID: ', whichFormElementID);

            //console.log('#submitEditProfileBtn > evaluateInput > whichType > placeholder: ', $(whichType).attr('placeholder'));
            //console.log('#submitEditProfileBtn > evaluateInput > whichType > title: ', $(whichType).attr('title'));

            //var isFormValid = helper.evaluateInput(whichID, whichType);

            //console.log('#submitEditProfileBtn > isFormValid: ', isFormValid);


            /*
            you need:
                1. what input type is used (input/select):
                    ('#editProfileInputElement').val()
                    ('#state').val()
                2. the input type: (text, email, password, select)
                3. value has to be validated

                3. ajax: url
                4. a new API is needed to handle edit type (email: has to be verified)
            */

            /*
            var isFormValid = helper.evaluateInput(activeEdit,activeEditType);
            if(!isFormValid){
                console.log('#### submitEditProfileBtn > click > BAD FORM: ', isFormValid);
            }else{
                console.log('#### submitEditProfileBtn > click > GOOD FORM: ', isFormValid);
            }
            */

            /*
            var serviceUrl = 'https://localhost:3000/api/evaluateuseremail';
            var data = {};
            var email = $('#forgotEmail').val();
            var isEmailValid = emailPattern.test(email);

            if (email === '' || !isEmailValid) {

                if(is_safari && (email !== '' && !isEmailValid)){
                    $('#forgotPasswordForm .loginerror').text('Email is incorrect format. Please try again.');
                }else if(email === ''){
                    $('#forgotPasswordForm .loginerror').text('Email is required. Please try again.');
                }

                is_safari ? $('#forgotPasswordForm .loginerror').removeClass('hide').addClass('show') : null;

                !is_safari ? $('<input type="submit">').hide().appendTo($('#forgotPasswordForm')).click().remove() : null;
                
                return false;
            }

            is_safari ? $('#forgotPasswordForm .loginerror').removeClass('show').addClass('hide') : null;

            $('.loading').show();
     
            data = {
                email: email,
                expectedResponse: true
            };

            $.ajax({
                rejectUnauthorized: false,
                url: serviceUrl,
                type: 'POST',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json; charset=utf-8',

                success: function(data, status) {
                    if (data.message === 'success') {
                        $('.alert-warning').show();
                        $('.forgotOkBtn').show();
                        $('.forgotCSBtns').hide();
                        $('.loading').hide();
                    } else {
                        $('#forgotPasswordForm .loginerror').text('Could not validate your email.');
                        $('#forgotPasswordForm .loginerror').removeClass('hide');
                        $('.loading').hide();
                        return false;
                    }
                },
                error: function(xhr, status) {
                    $('#forgotPasswordForm .loginerror').text('Could not validate your email, try again or contact customer service.');
                    $('#forgotPasswordForm .loginerror').removeClass('hide');
                    $('.loading').hide();
                    return false;
                }
            });
            */
        });

    },

    /*
        var lengthMinusThree = (formElementID.length)-3;
        var btnRemoved = formElementID.slice(0,lengthMinusThree);
        var labelText = btnRemoved.replace(/([A-Z])/g, ' $1');
        labelText = labelText.replace(/^./, function(str){return str.toUpperCase();});

        var sl = (inputAttr1.length)-3;
        var inputAttr = inputAttr1.slice(0,sl);
        var titleText = inputAttr.replace(/([A-Z])/g, ' $1');
        titleText = titleText.replace(/^./, function(str){return str.toUpperCase();});
    */

    makeTitleFromElementID: function(whichID) {
        var lengthMinusThree = (whichID.length)-3;
        var btnRemoved = whichID.slice(0,lengthMinusThree);
        var labelText = btnRemoved.replace(/([A-Z])/g, ' $1');
        labelText = labelText.replace(/^./, function(str){return str.toUpperCase();});
        return labelText;
    },

    // whichformelementid === firstNameBtn                      whichID
    // whichformelementtype === editProfileInputElement/state   whichType
    evaluateInput: function(whichID, whichType) {
        var emailPattern = /\S+@\S+\.\S+/;
        var passwordPattern = /^\S{4,}$/;
        var formElementID = $('#'+whichID);
        var whichTypeVal = $('#'+whichType).val();
        var titleText = helper.makeTitleFromElementID(whichID);

        var isThisElementValueValid;
        var pattern;
        var regExErrorMsg;
        
        console.log('#### evaluateInput > formElementID.TITLEEEEE!!!: ', formElementID);
        console.log('#### evaluateInput > titleText: ', titleText);
        console.log('#### evaluateInput > whichID: ', whichID);
        console.log('#### evaluateInput > formElementID: ', $(whichID));
        console.log('#### evaluateInput > whichTypeVal: ', whichTypeVal);
        console.log('#### evaluateInput > whichType: ', whichType);
        
        /*
        if(whichID === 'emailBtn' || whichID === 'passwordBtn'){
            console.log('#### evaluateInput > whichID 1===: ', whichID);
            whichID === 'emailBtn' ? pattern = emailPattern : pattern = passwordPattern;
            isThisElementValueValid = pattern.test(whichTypeVal);
            console.log('#### evaluateInput > isThisElementValueValid: ', isThisElementValueValid);

            if(isThisElementValueValid){
                $('#editProfileForm .editProfileFormError').removeClass('show').addClass('hide');
                $('#editProfileFormError').text(''); 
                return true;
            }else{

                whichID === 'emailBtn' ? regExErrorMsg = 'Please type a valid Email Address' : null;
                whichID === 'passwordBtn' ? regExErrorMsg = 'Password must be at least 4 characters long. No whitespace allowed' : null;

                $('#editProfileForm .editProfileFormError').removeClass('hide').addClass('show');
                $('#editProfileForm .editProfileFormError').text('Please fill out this field. ' + regExErrorMsg);
                return false;
            }
 
        }else{
            console.log('#### evaluateInput > whichID 2===: ', whichID);
        
            if(whichTypeVal && whichTypeVal !== ''){
                $('#editProfileForm .editProfileFormError').removeClass('show').addClass('hide');
                $('#editProfileForm .editProfileFormError').text(''); 
                return true;
            }else{
                
                if (whichID !== 'state'){
                    $('#editProfileForm .editProfileFormError').text('Please type a valid '+titleText); 
                }else{
                    $('#editProfileForm .editProfileFormError').text('Please type a valid '+titleText); 
                }
                $('#editProfileForm .editProfileFormError').removeClass('hide').addClass('show');
                return false;
            }
        }
        */
    },

    toggleEditBtn: function(whichTabs,displayTab) {
        var tabID, i, e;
        tabID = document.getElementsByClassName(whichTabs);

        for(i=0; i < tabID.length; i++) {
            e = tabID[i]; 
            if(displayTab){
                e.style.display = 'none';
            }else{
                if(e.style.display == 'none') {
                    e.style.display = 'inline';
                } else {
                    e.style.display = 'none';
                }
            }
        }
        if(e.style.display === 'inline'){
            whichTabs === 'accountInfo' ? $('#updateAccountBtnv').text('Done') : null;
            whichTabs === 'personalInfo' ? $('#updatePersonalBtn').text('Done') : null;
        }
        if(e.style.display === 'none'){
            whichTabs === 'accountInfo' ? $('#updateAccountBtn').text('Update Account info') : null;
            whichTabs === 'personalInfo' ? $('#updatePersonalBtn').text('Update Personal info') : null;
        }
    },

    // click from Edit btn ('editProfileForm', this);
    // data-formelementtype="text", data-formelementvalue=`${currentUser.firstname}`
    doEditProfileModal: function(editProfileFormModalID, editProfileFormID, editBtnClicked) {
        
        var editBtnClickedParentElem = $(editBtnClicked).parent();
        var labelText = helper.makeTitleFromElementID(editBtnClickedParentElem.attr('id'));
        var currentFormValue = $(editBtnClickedParentElem).data('formelementcurrentval');
        var currentFormType = $(editBtnClickedParentElem).data('formelementtype');
        var whichFormElementID;

        $('#editProfileInputElementParent').removeClass('show').addClass('hide');
        $('#editProfileSelectElementParent').removeClass('show').addClass('hide');
        $('#editProfileInputElement').prop('disabled', true);
        $('#state').prop('disabled', true);

        if(currentFormType === 'select'){
            $('#editProfileSelectElementParent').removeClass('hide').addClass('show');
            $('#state').prop( 'disabled', false );
            $('#state').find('[option]').focus();
            //whichFormElementID = $('#state');
            //whichFormElementID = 'state';

        }else{
            $('#editProfileInputElementParent').removeClass('hide').addClass('show');
            $('#editProfileInputElement').prop( 'disabled', false );
            $('#editProfileInputElement').attr({ 
                placeholder: labelText, 
                type: currentFormType
            });

            switch (editBtnClickedParentElem.attr('id')) {
                case 'firstNameBtn':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '21',
                        title: 'Please type your First Name. Maximum 21 characters'
                    });
                    break;
                case 'lastNameBtn':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '31',
                        title: 'Please type your Last Name.  Maximum 31 characters'
                    });
                    break;
                case 'cityBtn':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '31',
                        title: 'Please type your City'
                    });
                    break;
                case 'emailBtn':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '31',
                        title: 'Please type a valid Email Address'
                    });
                    break;
                case 'passwordBtn':
                    $('#editProfileInputElement').attr({ 
                        pattern: '[^\S]{4,}',
                        minlength: '4',
                        title: 'Password must be at least 4 characters long. No whitespace allowed'
                    });
                    break;
            }
            //whichFormElementID = $('#editProfileInputElement');
            //whichFormElementID = 'editProfileInputElement';
        }

        $('#editProfileFormLabelCurrent').html('Current ' + labelText + ':');
        $('#editProfileFormLabelUpdated').html('Change your ' + labelText + ':');
        $('#modalFormElementValueCurrent').html(currentFormValue);
        
        //$('#editProfileFormID').attr('whichformelementid', editBtnClickedParentID);
        //$('#editProfileFormID').attr('whichformelement', whichFormElement);

        $('#'+editProfileFormID).data('whichformelementid', editBtnClickedParentID);
        //$('#'+editProfileFormID).data('whichformelement', whichFormElementID);
        
        $('#'+editProfileFormModalID).modal({
          keyboard: false,
          backdrop: 'static'
        })
    },

    postData: function() {
        var data = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            confimEmail: $('#confirmEmail').val(),
            password: $('#password').val(),
            city: $('#city').val() == undefined ? null : $('#city').val(),
            state: $('#state').val() == undefined ? null : $('#state').val()
        }
        return data;
    },

}

$(function () {
    helper.init();
});

