({
    filter : function(component, source) {

        var action = component.get("c.getDoctors");
        var value = source.get("v.label");

        action.setParams({
            "type": value
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