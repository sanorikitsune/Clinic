({
    doInit : function(component, event, helper){       
        
        helper.timeInit(component);
        
    },

    filter : function(component, event, helper) {
        var source = event.getSource();
        helper.filter(component, source);
    }
})