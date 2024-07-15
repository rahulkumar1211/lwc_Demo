import { LightningElement, api } from 'lwc';
import {showToastEvent} from 'lightning/platformShowToastEvent';
export default class CustomModalForDataTable extends LightningElement {
    @api isDisplayMode=false;
    @api isEditMode=false;
    @api recordInputId;


    get header(){
        if(this.isDisplayMode){
            return 'Display Contact Details';
        }
        else if(this.isEditMode){
            return 'Edit Contact Details';
        }
        else{
            return '';
        }
    }
    
    closeModalHandler(){
        let myCustomEvent=new CustomEvent('closemodal');
        this.dispatchEvent(myCustomEvent);
    }

    showToast(){
        const event=new showToastEvent({
            title:'Success',
            message:'record saved successfully',
            variant:'success'
        });
        this.dispatchEvent(event);
    }
    successHandler(){
        this.showToast();
        this.closeModalHandler();
    }

}