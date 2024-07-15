// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents

string tempvar = 'Enter_your_name_here';
System.debug('Hello World!');
System.debug('My name is ' + tempvar);

List<Contact> contList=[Select id, Picture__c, Rank__c, title from Contact];
    for(Contact con:contList){
        con.Picture__c='https://t4.ftcdn.net/jpg/02/81/89/73/360_F_281897358_3rj9ZBSZHo5s0L1ug7uuIHadSxh9Cc75.jpg';
        if(String.isBlank(con.Title)){
            con.Rank__c=3;
        }
        else{
            con.Rank__c=8;
        }
    }
   
   update contList;
