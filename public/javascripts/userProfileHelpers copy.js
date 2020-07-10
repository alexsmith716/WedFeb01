
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
            $('.editProfileFormError').removeClass('show').addClass('hide');
            $('.editProfileFormError').text('');
            $('#editProfileInputElement').val('');
            $('#state').val('').trigger('change');
            $('.alert-success').hide();
            $('.alert-danger').hide();
            $('.modalOkayBtn').hide();
            $('.modalCancelSubmitBtns').show();
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

            /*
            you need:
                1. what input type is used (input/select):
                    ('#editProfileInputElement').val()
                    ('#state').val()
                2. the input type: (change email (check pre-existing), change text/select, change password)
                3. value has to be validated

                3. ajax: url
                4. a new API is needed to handle edit type (email: has to be verified)
            */
                // server:  GET= getUserProfile
                // server:  PUT- putUserProfile         198
                // api:     GET= getUserProfileResponse
                // api:     PUT= putUserProfileResponse 243

        $('#submitEditProfileBtn').on('click', function(e) {
            console.log('#submitEditProfileBtn ++++')
            e.preventDefault();
            var serviceUrl;
            var dataObject = {};
            var data = {};

            var whichFormDataID = $('#editProfileForm').data('whichformdataid');
            //var whatPostType = $('#'+whichformdataid).data('formelementtype');
            //var whatPostType = $('#'+whichformdataid).data('formelementtype');

            var evaluatedUserInput = helper.evaluateInput(whichFormDataID);

            console.log('#submitEditProfileBtn > evaluatedUserInput: ', evaluatedUserInput); // input element value
            console.log('#submitEditProfileBtn > whichFormDataID: ', whichFormDataID); // firstName/city/email/password
            //console.log('#submitEditProfileBtn > whatPostType: ', whatPostType);

            if(!evaluatedUserInput){
                console.log('submitEditProfileBtn > BAD FORM');
                return false;
            }else{
                console.log('submitEditProfileBtn > GOOD FORM');
                $('.loading').show();

                serviceUrl = 'https://localhost:3000/api/evaluateuserprofile';

                dataObject = {
                    dataValue: evaluatedUserInput,
                    dataID: whichFormDataID
                }
                data = {
                    dataObject: dataObject,
                    expectedResponse: true
                };
           
                $.ajax({
                    rejectUnauthorized: false,
                    url: serviceUrl,
                    type: 'PUT',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',

                    success: function(data, status) {
                        if (data.message === 'success') {
                            console.log('submitEditProfileBtn > ajax > success > success');
                            $('#editProfileForm .alert-success').show();
                            $('#editProfileForm .modalOkayBtn').show();
                            $('#editProfileForm .modalCancelSubmitBtns').hide();
                            $('#editProfileForm .loading').hide();
                        } else {
                            console.log('submitEditProfileBtn > ajax > success > error');
                            $('#editProfileForm .editProfileFormError').text('editProfileForm .editProfileFormError 111');
                            $('#editProfileForm .editProfileFormError').addClass('show').removeClass('hide');
                            $('#editProfileForm .loading').hide();
                            return false;
                        }
                    },
                    error: function(xhr, status) {
                        console.log('submitEditProfileBtn > ajax > error > error');
                        $('#editProfileForm .editProfileFormError').text('Could not update your '+email+' try again or contact customer service.');
                        $('#editProfileForm .editProfileFormError').addClass('show').removeClass('hide');
                        $('#editProfileForm .loading').hide();
                        return false;
                    }
                });
            }
        });
    },

    makeTitleFromElementID: function(whichID) {
        var whichID2 = whichID.replace(/-/g, ' ');
        labelText = whichID2.replace(/\b\w/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        return labelText;
    },


    evaluateInput: function(whichID) {
        console.log('evaluateInput +++++', whichID)
        var emailPattern = /\S+@\S+\.\S+/;
        var passwordPattern = /^\S{4,}$/;
        var whichFormElementType;
        var isThisElementValueValid;
        var pattern;

        
        if($('#'+whichID).data('formelementtype') === 'select'){
            whichFormElementType = $('#state');
        }else{
            whichFormElementType = $('#editProfileInputElement');
        }

        var whichTypeVal = whichFormElementType.val();
        var elementTitle = whichFormElementType.attr('title');
        
        if(whichID === 'email' || whichID === 'password'){

            whichID === 'email' ? pattern = emailPattern : pattern = passwordPattern;
            isThisElementValueValid = pattern.test(whichTypeVal);

            if(isThisElementValueValid){
                console.log()
                $('.editProfileFormError').text(''); 
                $('.editProfileFormError').removeClass('show').addClass('hide');
                //return true;
                return whichTypeVal;
            }else{
                $('.editProfileFormError').text(elementTitle);
                $('.editProfileFormError').removeClass('hide').addClass('show');
                return false;
            }
 
        }else{
        
            if(whichTypeVal && whichTypeVal !== ''){
                $('.editProfileFormError').text(''); 
                $('.editProfileFormError').removeClass('show').addClass('hide');
                //return true;
                return whichTypeVal;
            }else{
                $('.editProfileFormError').text(elementTitle);
                $('.editProfileFormError').removeClass('hide').addClass('show');
                return false;
            }
        }
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
            whichTabs === 'accountInfo' ? $('#updateAccountBtn').text('Done') : null;
            whichTabs === 'personalInfo' ? $('#updatePersonalBtn').text('Done') : null;
        }
        if(e.style.display === 'none'){
            whichTabs === 'accountInfo' ? $('#updateAccountBtn').text('Update Account info') : null;
            whichTabs === 'personalInfo' ? $('#updatePersonalBtn').text('Update Personal info') : null;
        }
    },

    // you need:
    // element ID
    // element type
    // currentValue
    doEditProfileModal: function(editProfileFormModalID, editProfileFormID, editBtnClicked) {
        console.log('doEditProfileModal >>>>>')
        var editBtnClickedParentElem = $(editBtnClicked).parent();
        var labelText = helper.makeTitleFromElementID(editBtnClickedParentElem.data('id'));
        var currentFormValue = editBtnClickedParentElem.data('formelementcurrentval');
        var currentFormType = editBtnClickedParentElem.data('formelementtype');
        var dataID = editBtnClickedParentElem.data('id');

        console.log('doEditProfileModal > dataID: ', dataID);
        console.log('doEditProfileModal > currentFormValue: ', currentFormValue);
        console.log('doEditProfileModal > currentFormType: ', currentFormType);

        $('#editProfileInputElementParent').removeClass('show').addClass('hide');
        $('#editProfileSelectElementParent').removeClass('show').addClass('hide');
        $('#editProfileInputElement').prop('disabled', true);
        $('#state').prop('disabled', true);

        if(currentFormType === 'select'){
            $('#editProfileSelectElementParent').removeClass('hide').addClass('show');
            $('#state').prop( 'disabled', false );
            $('#state').find('[option]').focus();

        }else{
            $('#editProfileInputElementParent').removeClass('hide').addClass('show');
            $('#editProfileInputElement').prop( 'disabled', false );
            $('#editProfileInputElement').attr({ 
                placeholder: labelText, 
                type: currentFormType
            });
    
            switch (editBtnClickedParentElem.data('id')) {
                case 'first-name':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '21',
                        title: 'Please type a First Name'
                    });
                    break;
                case 'last-name':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '31',
                        title: 'Please type a Last Name'
                    });
                    break;
                case 'city':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '31',
                        title: 'Please type a City'
                    });
                    break;
                case 'email':
                    $('#editProfileInputElement').attr({ 
                        maxlength: '31',
                        title: 'Please type a valid Email Address'
                    });
                    break;
                case 'password':
                    $('#editProfileInputElement').attr({ 
                        pattern: '[^\S]{4,}',
                        minlength: '4',
                        title: 'Password must be at least 4 characters long. No whitespace allowed'
                    });
                    break;
            }
        }

        $('#editProfileFormLabelCurrent').html('Current ' + labelText + ':');
        $('#editProfileFormLabelUpdated').html('Change your ' + labelText + ':');
        $('#modalFormElementValueCurrent').html(currentFormValue);
        
        $('#'+editProfileFormID).data('whichformdataid', editBtnClickedParentElem.data('id'));
        
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

