({
    createPatient : function(component, newPatient) {
        console.log("JSHelper");
        var action = component.get("c.savePatient");

        action.setParams({
            "patient": newPatient
        });
        var result;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Success"); 
                //alert(action.getReturnValue());
                result = action.getReturnValue();
                var textLine = document.querySelector('#message');
                if(result=='Success')
                {
                    textLine.style.color = "Black";
                }
                else{
                    textLine.style.color = "Red";
                }
                textLine.hidden = false;
                textLine.innerHTML = result;                                   
            }
            else{
                console.log("NOT Success");
                console.log(state);
                //alert(action.getReturnValue());
                result = action.getReturnValue();

                var textLine = document.querySelector('#message');
                textLine.hidden = false;
                textLine.innerHTML = result;                           
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");
    },

    LogIn : function(component, Patient) {
        console.log("JSHelper");
        var action = component.get("c.loginPatient"); //not

        action.setParams({
            "patient": Patient
        });
        var result;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log("Success"); 
                //alert(action.getReturnValue());
                result = action.getReturnValue();
                var textLine = document.querySelector('#loginMessage');
                textLine.hidden = false;
                if(result=='Success')
                {
                    textLine.style.color = "Black";
                }
                else{
                    textLine.style.color = "Red";
                }
                textLine.innerHTML = result;
                if(result=='Success')
                    {                      
                        this.loginProvide(component, Patient);
                    }                                 
            }
            else{
                console.log("NOT Success");
                console.log(state);
                //alert(action.getReturnValue());
                result = action.getReturnValue();

                var textLine = document.querySelector('#loginMessage');
                textLine.hidden = false;
                textLine.innerHTML = result;                           
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");
    },



    loginProvide : function(component, Patient) {
        var action = component.get("c.getPatient");
        action.setParams({
            "patient": Patient
        });
        var myPatient;
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                myPatient = action.getReturnValue(); 
                //-----------
                var navService = component.find("navService");
                var pageReference = {
                    type: 'standard__component',
                    attributes: {
                        componentName: 'c__ClinicMainPage'  //change                                
                    },
                    state: {
                    "c__patient": myPatient    //change
                     }
                                };
                //event.preventDefault();
                    navService.navigate(pageReference);                         



            }
            else{
                console.log("NOT Success");
                console.log(state);                       
            }
        });
        
        $A.enqueueAction(action);
        console.log("EndOfHelper");        
    }
})