({
    timeInit : function(component) {
        console.log("doInit helper start");
        var action = component.get("c.getTimes"); //apex
        console.log("doInit helper start 2");
        /*action.setParams({            
        });
        */
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.times", response.getReturnValue());                
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");       
        
    },

    filter : function(component, source) {

        var action = component.get("c.getDoctorsbyTime");
        var value = source.get("v.label");

        action.setParams({
            "settime": value
        });

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
        console.log("filter complete");
    },
})