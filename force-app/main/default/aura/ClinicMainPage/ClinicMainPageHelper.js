({
    createDoctor : function(component, doctor) {
        console.log("JSHelper");
        var action = component.get("c.saveDoctor"); 
        console.log("JSHelper2");
        action.setParams({
            "doctor": doctor
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

    dataInit : function(component) {
        console.log("doInit helper start");
        var action = component.get("c.getDoctors"); //apex
        console.log("doInit helper start 2");
        /*action.setParams({            
        });
        */
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.doctors", response.getReturnValue());                
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
        
        var action = component.get("c.getRecords"); //apex
        console.log("doInit helper start 2");
        var patient = component.get("v.patient");
        action.setParams({  
            "patient": patient          
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.records", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
    },
})