public with sharing class contactController {
   @AuraEnabled(cacheable=true)
    public static List<Contact> contactList(){
        return [Select Name from Contact];
    }
}