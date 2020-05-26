({
    doInitHelper : function(component) {
        console.log("doInit helper start");
        var action = component.get("c.getDoctor"); //apex
        console.log("doInit helper start 2");
        var record = component.get("v.record");
        action.setParams({
            "record": record
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.doctor", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        $A.enqueueAction(action);
        console.log("doInit complete");
    },


    deleteHelper : function(component) {    
        var item = component.get("v.record");         
        var action = component.get("c.deleteRecord"); //apex
        
            action.setParams({
                "item": item
            });
    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.destroy();
                }
                else {
                    console.log("Failed with state: " + state + action.getReturnValue());
                }
            });
            $A.enqueueAction(action);
    
        
    },
})