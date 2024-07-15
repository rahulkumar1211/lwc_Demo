import { LightningElement,api } from 'lwc';
import {NavigationMixin} from 'lightning/Navigation';

export default class QuickActionDemo extends NavigationMixin(LightningElement) {
    @api recordId;
    @api invoke(){
        console.log('Invoked', recordId);
        this[NavigationMixin.Navigate]({
            type:'Standard__webPage',
            attributes:{
                url:'https://www.portal.azure.com'
            }

        })
    }
}