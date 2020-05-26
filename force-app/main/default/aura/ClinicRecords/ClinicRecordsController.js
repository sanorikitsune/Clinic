({
    doInit : function(component, event, helper) {
        helper.doInitHelper(component);
    },

    deleteAction : function(component, event, helper) {
        console.log("delete");
        helper.deleteHelper(component);
    },
})