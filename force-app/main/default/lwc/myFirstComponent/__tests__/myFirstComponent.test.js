import {createElement} from '@lwc/engine-dom';
import MyFirstComponent from 'c/MyFirstComponent';

describe('c-my-first-component',()=>{
    test('display first greeting',()=>{
        const element= createElement('c-my-first-component',{
            is:MyFirstComponent
        })
        document.body.appendChild(element)
        const firstDiv= element.shadowRoot.querySelector('div.first');
        expect(firstDiv.textContent).toBe('Hello, World!');
        
    })

    test('display second greeting',()=>{
        const element= createElement('c-my-first-component',{
            is:MyFirstComponent
        })
        document.body.appendChild(element)
        const secondDiv= element.shadowRoot.querySelector('div.second');
        expect(secondDiv.textContent).toBe('My, World!');
        
    })
})