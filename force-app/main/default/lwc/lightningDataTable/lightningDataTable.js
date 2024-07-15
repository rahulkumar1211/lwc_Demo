import { LightningElement,wire } from 'lwc';
import GET_ContactData from '@salesforce/apex/contactController.getContactListForDataTable';

const COLUMNS=[
    {label:'Name', type:'customName', typeAttributes:{
        'contactName':{
            fieldName:'Name'
        }
    }},
    {label:'Account Name', fieldName:'accountLink', type:'url', typeAttributes:{
        label:{
            fieldName: 'accountName'
        },
        target:'_blank'//if we want to open account record in new page. 
    }},//because we want to make this clickable
    {label:'Title',fieldName:'Title', cellAttributes:{
        class:{
            fieldName:'titleColor'
        }
    }},
    {label:'Phone', fieldName:'Phone', type:'phone'},
    {label:'Email', fieldName:'Email', type:'email'},
    {label:'Rank', fieldName:'Rank__c', type:'customRank', typeAttributes:{
        'rankIcon':{
            fieldName:'rankIconName'
        }
    }},
    {label:'Picture', type:'customPicture', typeAttributes:{
        'pictureUrl':{
            fieldName:'Picture__c'
        }  
    },
    cellAttributes:{
       alignment:'center'
    }}
];

export default class LightningDataTable extends LightningElement {
    columns=COLUMNS;
    contacts;

    @wire(GET_ContactData)
    getContactData({data,error}){
        if(data){
            console.log(data);
            this.contacts=data.map(record=>{
                let accountLink='/'+record.AccountId; //adding '/' will make it clickable, only applicable to datatable
                let accountName=record.Account.Name;
                let titleColor='slds-text-color_success'; //adding success(means green color) to title
                let rankIconName=record.Rank__c>5?'utility:lead':'utility:ribbon';
                return {
                    ...record,
                    accountLink:accountLink,
                    accountName:accountName,
                    titleColor:titleColor,
                    rankIconName:rankIconName
                }
            })
            
        }
        if(error){
            console.log(error);
        }
    }
}