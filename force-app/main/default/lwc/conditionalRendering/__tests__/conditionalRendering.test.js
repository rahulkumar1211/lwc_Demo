import { createElement } from '@lwc/engine-dom';
import ConditionalRendering from 'c/conditionalRendering';


describe('c-conditional-rendering',()=>{

    beforeEach(()=>{
        const element= createElement('c-conditional-rendering',{
            is:ConditionalRendering
        })
        document.body.appendChild(element);
    })

    test("don't show the password", ()=>{
        const element= createElement('c-conditional-rendering',{
            is:ConditionalRendering
        })
        document.body.appendChild(element)
       // const element=  document.querySelector('c-conditional-rendering')
        const password=element.shadowRoot.querySelector('.userinfo');
        expect(password).not.toBeNull();
        expect(password.textContent).toBe('Password is: *************')
    })

    test("show the password", ()=>{
        const element= createElement('c-conditional-rendering',{
            is:ConditionalRendering
        })
        document.body.appendChild(element)
       // const element=  document.querySelector('c-conditional-rendering')
        const inputElement=element.shadowRoot.querySelector('lightning-input');
        inputElement.checked=true
        inputElement.dispatchEvent(new CustomEvent('click'))
    
    /**
     * we know that dom rendering is asynchronous that is when the checkbox is checked, it will render
     * in async way, so to test that we'll use resolve
     */
        return Promise.resolve().then(()=>{
            const passwordElement= element.shadowRoot.querySelector('.userinfo');
            expect(passwordElement).not.toBeNull();
            expect(passwordElement.textContent).toBe('Password is: Rahul1211kumar');
        })
    })
    
})