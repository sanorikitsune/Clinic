({
    doInit : function(component, event, helper) {
        var timesOrigin = component.get("v.doctor");
        
        var time = timesOrigin.Time__c;
        if(time!=undefined){
            var result = [];
            var word = '';
            for (var i = 0; i < time.length; i++) {
                if(time[i]!=';'){
                    //word.push(time[i]);
                    word = word + time[i];
                }
                else{
                    result.push(word);
                    
                    //word=[];
                    word = '';
                }
                
               
             }
             result.push(word);
             console.log(result);
            component.set("v.times", result);
        }
        
    },

    deleteAction : function(component, event, helper) {
        console.log("delete");
        helper.deleteHelper(component);
    },

    verify : function(component, event, helper) {
        var time = event.getSource().get("v.label");
        var result = confirm(time + "\nAre sure?");
        if(result)
        {
            helper.verify(component, time);
        }
    },
})