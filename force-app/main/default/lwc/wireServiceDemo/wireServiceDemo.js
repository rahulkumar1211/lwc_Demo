import { LightningElement, wire } from 'lwc';
import CONTACT_LIST from '@salesforce/apex/contactController.contactList';


export default class WireServiceDemo extends LightningElement {
    contactData;
    error;

    @wire(CONTACT_LIST)
    contactList({data,error}){
        if(data){
            this.contactData=data;
            this.error=undefined;
            
        }
        if(error){
            console.error(error);
            this.error=error;
            this.contactData=undefined;
        }
    }

    renderedCallback(){
        if(this.contactData!=null){
            console.log(JSON.stringify(this.contactData));
        }
    }
}