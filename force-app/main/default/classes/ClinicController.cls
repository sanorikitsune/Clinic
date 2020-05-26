public with sharing class ClinicController {
    @AuraEnabled
    public static string savePatient(Patient__c patient) {
        List<Patient__c> checkPolicy = [SELECT Policy__c FROM Patient__c WHERE Policy__c =:patient.Policy__c];
        if (!checkPolicy.isEmpty()){
            string message = 'This policy is already exists';
            return message;
        }    

        System.debug(patient);
       
        string err;
        try{
            insert patient;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }


    @AuraEnabled
    public static String loginPatient(Patient__c patient) {
        Patient__c[] check = [SELECT Policy__c FROM Patient__c WHERE Policy__c =:patient.Policy__c LIMIT 1];
        if (check.isEmpty()){
            string message = 'This policy is not exists';
            return message;
        }        
        string message = 'Success';
        return message;
        
    }


    @AuraEnabled
    public static Patient__c getPatient(Patient__c patient) {
        Patient__c[] myPatient = [SELECT Id, First_Name__c, Last_Name__c, Policy__c FROM Patient__c WHERE Policy__c=:patient.Policy__c];
        return myPatient[0];
    }


    @AuraEnabled
    public static string saveDoctor(Doctor__c doctor) {        
        System.debug(doctor);       
        string err;
        try{
            insert doctor;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
    }


    @AuraEnabled
    public static Doctor__c[] getDoctors(string type) {       

        switch on type {
            when 'Therapist' {
                return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c WHERE Type__c= 'Therapist'];
            }
            when 'Otolaryngologist' {
                return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c WHERE Type__c= 'Otolaryngologist'];
            }
            when 'Surgeon' {
                return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c WHERE Type__c= 'Surgeon'];
            }
            when 'Cardiologist' {
                return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c WHERE Type__c= 'Cardiologist'];
            }            
            when else {
                return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c];
            }
        }
    }

    @AuraEnabled
    public static Doctor__c getDoctor(Record__c record) {
              
        Doctor__c[] myDoctor =  [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c WHERE Id=:record.Doctor__c];
        return myDoctor[0];
        
        
    }
    
    @AuraEnabled
    public static Record__c[] getRecords(Patient__c patient) {       
        return [SELECT Id, Doctor__c, Patient__c, Time__c FROM Record__c WHERE Patient__c=:patient.Id];
    }


    @AuraEnabled
    public static String[] getTimes() {       
        Doctor__c[] doctors = [SELECT Id, Time__c FROM Doctor__c];

        Set<String> time_string= new Set<String>();

        for(Doctor__c doctor : doctors){
            String[] tmpString = doctor.Time__c.split(';');
            For(String s : tmpString){
                
                time_string.add(s);
                
            }   
        }
        List<String> listStrings = new List<String>(time_string);
        listStrings.sort();
        return listStrings;

    }


    @AuraEnabled
    public static Doctor__c[] getDoctorsbyTime(String settime) {
        if(settime=='All'){
            return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c];
        }
        else{
            return [SELECT Id, First_Name__c, Last_Name__c, Type__c, Time__c FROM Doctor__c WHERE Time__c includes (:settime)];
        }       
        
    }


    @AuraEnabled
    public static String deleteDoctor(Doctor__c item) {
        string err;
        Doctor__c[] delItem =[SELECT Id FROM Doctor__c WHERE Id=:item.Id];
        try{
        delete delItem;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
        
    }
    @AuraEnabled
    public static String deleteRecord(Record__c item) {
        string err;
        Record__c[] delItem =[SELECT Id FROM Record__c WHERE Id=:item.Id];
        try{
        Doctor__c[] mydoctor = [SELECT Id, Time__c FROM Doctor__c WHERE Id=:item.Doctor__c LIMIT 1];
                String[] tmpString = mydoctor[0].Time__c.split(';');
                tmpString.add(item.Time__c);
                mydoctor[0].Time__c = String.join( tmpString, ';' );
                Doctor__c updateDoctor = mydoctor[0];
        
        delete delItem;
        update updateDoctor;
        }
        catch(DmlException e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
        
    }


    @AuraEnabled
    public static String addRecord(Doctor__c doctor, string recordTime, Patient__c patient) {
        string err;
        
        Record__c[] check1 = [SELECT Id FROM Record__c WHERE Time__c =:recordTime AND Doctor__c=:doctor.Id LIMIT 1];
        try{
        Record__c[] check2 = [SELECT Id FROM Record__c WHERE Time__c =:recordTime AND Patient__c=:patient.Id LIMIT 1];
        
        boolean flag = false;
        if(check1.isEmpty())
        {            
            if(check2.isEmpty())
            {            
                flag = true; 
            }
            else{
                return 'you are already recorded at this time';
            }    
        }
        else{
            return 'the coupon is already taken';
        }
        
            if(flag){
                Doctor__c[] mydoctor = [SELECT Id, Time__c FROM Doctor__c WHERE Id=:doctor.Id LIMIT 1];
                String[] tmpString = mydoctor[0].Time__c.split(';');
                String[] newString = new List<String>();
                For(String s : tmpString){
                    if(s != recordTime){
                        newString.add(s);
                    }
                }
                mydoctor[0].Time__c = String.join( newString, ';' );
                Doctor__c updateDoctor = mydoctor[0];


                Record__c newRecord = new Record__c();
                newRecord.Patient__c = patient.id;
                newRecord.Doctor__c = doctor.id;
                newRecord.Time__c = recordTime;
                insert newRecord;
                update updateDoctor;
            }
            else{
                return 'something is wrong';
            }
        }
        catch(Exception  e)
        {
            System.debug('A DML exception has occurred: ' +
                e.getMessage());
            err =    'A DML exception has occurred: ' +
            e.getMessage();    
            return err;     
        }
        err='Success';
        return err;
        
    }
}