({
    deleteHelper : function(component) {    
        var item = component.get("v.doctor");         
        var action = component.get("c.deleteDoctor"); //apex
        
            action.setParams({
                "item": item
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.destroy();
                }
                else {
                    console.log("Failed with state: " + state);
                }
            });
            $A.enqueueAction(action);
    
        
    },


    verify : function(component, time) {    
        var doctor = component.get("v.doctor");
        var patient = component.get("v.patient");           
        var action = component.get("c.addRecord"); //apex
        var result;
            action.setParams({
                "doctor": doctor,
                "recordTime": time,
                "patient": patient
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                result = action.getReturnValue();
                if (state === "SUCCESS") {
                    
                    alert(action.getReturnValue());
                    result = action.getReturnValue();
                    
                    if(result=='Success')
                    {
                        
                        var updateEvent = component.getEvent("success");
                        updateEvent.fire();
                        console.log("eventfire");
                    }
                    
                }
                else {
                    alert(result);
                    console.log("Verify failed with state: " + state + result);
                    
                }
            });
            $A.enqueueAction(action);
    
        
    },
})