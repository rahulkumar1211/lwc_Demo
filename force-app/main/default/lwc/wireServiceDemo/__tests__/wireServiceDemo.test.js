import { createElement } from '@lwc/engine-dom';
import WireServiceDemo from 'c/wireServiceDemo';
import CONTACT_LIST from '@salesforce/apex/contactController.contactList';

const mockContactList=require('./data/getContactList.json');

jest.mock(
    '@salesforce/apex/contactController.contactList',()=>{
        const {createApexTestWireAdapter}= require('@salesforce/sfdx-lwc-jest');
        return {
            default: createApexTestWireAdapter(jest.fn())
        }
    },
    {virtual:true}
)


describe('wire-service-demo',()=>{

    afterEach(()=>{
        while(document.body.firstChild){
            document.body.removeChild(document.body.firstChild);
        }
        //prevent data saved on mocks after leaking between tests
        jest.clearAllMocks();
    });

    test('check length of data return',()=>{
        const element= createElement('c-wire-service-demo',{
            is:WireServiceDemo
        })
        document.body.appendChild(element);

        //emit data from apex
        CONTACT_LIST.emit(mockContactList);
        return Promise.resolve().then(()=>{
            const contactData=element.shadowRoot.querySelectorAll('p');
            expect(contactData.length).toBe(mockContactList.length);
        })
    })

    test('check content of the data',()=>{
        const element=createElement('c-wire-service-demo',{
            is:WireServiceDemo
        })
        document.body.appendChild(element);
        //emit mock data from apex
        CONTACT_LIST.emit(mockContactList);
        return Promise.resolve().then(()=>{
            const contactData=element.shadowRoot.querySelectorAll('p');
            expect(contactData[0].textContent).toBe(mockContactList[0].Name);
        })
    })

    test('apex error message',()=>{
        const element=createElement('c-wire-service-demo',{
            is:WireServiceDemo
        })
        document.body.appendChild(element);
        //emit data from apex
        CONTACT_LIST.error();

        return Promise.resolve().then(()=>{
            const errorElement=element.shadowRoot.querySelector('p');
            expect(errorElement).not.toBeNull();
            expect(errorElement.textContent).toBe('Contact Data not available')

        })

    })

})