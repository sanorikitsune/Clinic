({
    doInit : function(component, event, helper){
        var myPageRef = component.get("v.pageReference");
        var patient = myPageRef.state.c__patient;
        component.set("v.patient", patient);
        helper.dataInit(component);
        
    },

    createAction : function(component, event, helper) {
        console.log("JSController");
        var validForm = component.find('form').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        var validSelect = component.find('select').get("v.value");
        if(validSelect ==''){
            validForm = false;
        }
        var doctor = component.get("v.doctor");
        var timesValue = [];
        timesValue = component.get("v.value");
        doctor.Time__c = timesValue;
        component.set("v.doctor", doctor);
        if(validForm){
            helper.createDoctor(component, doctor);    
        }
        else{
            //alert("Form is not sent");
            var textLine = document.querySelector('#message');                
            textLine.hidden = false;
            textLine.style.color = "Red";
            textLine.innerHTML = "Form is not sent";   
        }
    },


    selectDoctor : function(component, event, helper){
        //var wrap = component.find('doctorSelect');
        //wrap.set("v.hidden", false);
        
       
        $A.util.removeClass(component.find("doctorSelect"), "slds-hide");
        $A.util.addClass(component.find("but"), "slds-hide");

        //var but = component.find('but');
        //but.set("v.hidden", true);
        var progressBar = component.find('progress');
        progressBar.set('v.currentStep', '2');
    },

    selectTime : function(component, event, helper){

        $A.util.removeClass(component.find("timeSelect"), "slds-hide");
        $A.util.addClass(component.find("but"), "slds-hide");
        /*
        var wrap = component.find('timeSelect');
        wrap.set("v.hidden", false);    
        var but = component.find('but');
        but.set("v.hidden", true);*/
        var progressBar = component.find('progress');
        progressBar.set('v.currentStep', '2');
    },

    initCreateRecordTab : function(component, event, helper){
        
        helper.dataInit(component);
       
        //var but = component.find('but');
        //but.set("v.hidden", false);
        $A.util.removeClass(component.find("but"), "slds-hide");
        $A.util.addClass(component.find("timeSelect"), "slds-hide");
        $A.util.addClass(component.find("doctorSelect"), "slds-hide");
        $A.util.addClass(component.find("finish"), "slds-hide");  
        //var wrapT = component.find('timeSelect');
        //var wrapD = component.find('doctorSelect');
        //wrapT.set("v.hidden", true);
        //wrapD.set("v.hidden", true);
             
        //var but = document.querySelector('#but');
        //but.hidden = false;
        //alert("c");
        var progressBar = component.find('progress');
        progressBar.set('v.currentStep', '1');
        
    },

    initCheckRecordTab : function(component, event, helper){
        
        //helper.dataInit(component);
    },


    beforeRecord : function(component, event, helper){
        console.log("event catch");
        helper.dataInit(component);
       
        console.log("event catch2");
        $A.util.addClass(component.find("but"), "slds-hide");
        $A.util.addClass(component.find("timeSelect"), "slds-hide");
        $A.util.addClass(component.find("doctorSelect"), "slds-hide");
        $A.util.removeClass(component.find("finish"), "slds-hide");     
        var progressBar = component.find('progress');
        progressBar.set('v.currentStep', '4');
        console.log("event catch3");
        
    },
})