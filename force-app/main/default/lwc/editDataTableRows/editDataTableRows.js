import { LightningElement,wire, api } from 'lwc';
import  getContacts from '@salesforce/apex/contactController.getContactBasedOnAccount';
import {deleteRecord, updateRecord} from 'lightning/uiRecordApi';
import {showToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';
import {getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import contact_object from '@salesforce/schema/Contact';
import LeadSource from '@salesforce/schema/Contact.LeadSource';

const ACTIONS=[
    {label:'View', name:'view'},
    {label:'Edit', name:'edit'},
    {label:'Delete', name:'delete'}
];


const columns=[
    {label:'FirstName', fieldName:'FirstName', editable:'true'},
    {label:'LastName', fieldName:'LastName', editable:'true'},
    {label:'Account Name', fieldName:'accName', editable:'true'},
    {label:'Phone', fieldName:'Phone', type:'Phone', editable:'true'},
    {label:'Email', fieldName:'Email', type:'email', editable:'true'},
    {label:'Rank', fieldName:'Rank__c', type:'number'},
    {label:'Picture', fieldName:'Picture__c', type:'url'},
    {
        label:'Lead Source', 
        fieldName:'LeadSource', 
        type:'customPicklist', 
        editable:'true',
        typeAttributes:{
            options:{ fieldName:'picklistOptions'},
            value:{fieldName:'LeadSource'},
            context:{fieldName:'Id'}
        }
    },
    {type:'action', typeAttributes:{
            rowActions:ACTIONS
        }
    }
    
];

export default class EditDataTableRows extends LightningElement {
    @api recordId;
    columns= columns;
    contacts;
    draftValues=[];
    contactRefreshProp;
    leadSourceOptions=[];
    viewMode=false;
    editMode=false;
    showModal=false;
    selectedRecordId;

    //fetch the info about the contact 
    @wire(getObjectInfo, {objectApiName: contact_object})
    getObjectData;
    //fetch the info about the LeadSource picklist values based on defaultRecordType of Contact
    @wire(getPicklistValues,{
        recordTypeId: '$getObjectData.data.defaultRecordTypeId',
        fieldApiName: LeadSource
    })wirePicklist({data,error}){
        if(data){
            console.log(data);
            this.leadSourceOptions=data.values;
        }
        else if(error){
            console.log(error);
        }
    }


    @wire(getContacts,{accountId:'$recordId', pickList:'$leadSourceOptions'})
    getContactData({data,error}){
        if(data){
            this.contactRefreshProp=data;
            this.contacts= data.map(record=>{
                let accName=record.Account.Name;
                let pickListOpitons= this.leadSourceOptions;
                return {...record,
                         accName:accName,
                         picklistOptions:pickListOpitons};
            })
        }
        else{
            console.log(error);
        }
    }
    //to update the record value we have two options: we can make a call to updateRecord Adaptor (wire adaptor) 
    //or make a apex callout
    
    async saveHandler(event){
        //first access the draft values
        let records=event.detail.draftValues; //it will return array of modified records
        let updateRecordArray=records.map(currentItem=>{
            let fieldInput={...currentItem}
            return {
                fields:fieldInput
            };
        });

        this.draftValues=[];

        let updateRecordArrayPromise= updateRecordArray.map(item=>{
           return updateRecord(item); //this updateRecord operation is asynchronous operation so either we have to use async-await or we have to use promise
        });

        await Promise.all(updateRecordArrayPromise); //this will wait till the above operation is completed

        const toastEvent=new showToastEvent({
            message:'records updated successfully',
            variant:'success',
            title:'record updated notification'

        })
        this.dispatchEvent(toastEvent);
        await refreshApex(this.contactRefreshProp); //this will refresh the data in lightning datatable after we update the record
    }
    /**This method will handle the actions performed on any row */
    rowActionHandler(event){
        let action=event.detail.action;
        let row=event.detail.row;
        this.selectedRecordId=row.Id;
        console.log(this.selectedRecordId);
        this.viewMode=false;
        this.editMode=false;
        this.showModal=false;

        if(action.name==='view'){
            this.viewMode=true;
            this.showModal=true;
        }
        else if(action.name==='edit'){
            this.editMode=true;
            this.showModal=true;
        }
        else if(action.name==='delete'){
            this.deleteHandler();
        }
    }

    async deleteHandler(){
       
       //use deleteRecordAdapter or Apex class
       await deleteRecord(this.selectedRecordId);
       const toastEvent=new showToastEvent({
        message:'records deleted successfully',
        variant:'success',
        title:'record deleted notification'

    })
    this.dispatchEvent(toastEvent);
    await refreshApex(this.contactRefreshProp);

    }

    async closeModal(){
        this.showModal=false;
        if(this.editMode){
            await refreshApex(this.contactRefreshProp);
        }
    }
}