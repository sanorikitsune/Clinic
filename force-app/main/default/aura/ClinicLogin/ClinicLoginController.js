({
    createAction : function(component, event, helper) {
        console.log("JSController");
        var validForm = component.find('signupForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);

        if(validForm){
            var newPatient = component.get("v.signup");
            helper.createPatient(component,newPatient);
                           
        }
        else{
            //alert("Form is not sent");
        }
    },

    loginAction : function(component, event, helper) {
        console.log("JSController");
        var form = component.find('loginForm');
        var validForm;
        if(form.value ==""){
            validForm = false;
        }
        else{
            validForm = true;
        }
        console.log("JSControllerMid");
        if(validForm){
            console.log("JSController2");
            var Patient = component.get("v.login");
            console.log("JSController3");
            helper.LogIn(component, Patient);
                           
        }
        else{
            //alert("Form is not sent");
        }
    },
})