import {createElement} from '@lwc/engine-dom';
import LoopComponent from 'c/loopComponent';

const ExpectedValue=['Nikhil','Mohit','Sohan','Mihir','Rachika'];

describe('c-loop-component',()=>{
    afterEach(()=>{
        while(document.body.firstChild){
            document.body.removeChild(document.body.firstChild)
        }
    })

    test('display length for forLoop',()=>{
        const element= createElement('c-loop-component',{
            is:LoopComponent
        })
        document.body.appendChild(element)
       // const forLoop=document.queryLocator('c-loop-component');
        const forLoopData= element.shadowRoot.querySelectorAll('.forEachList>li'); // forEachList>li will give the li item for foreach loop
       /*  expect(forLoopData[0].data.Name.textContent).toBe('Nikhil');
        expect(forLoopData[0].data.Id.textContent).toBe('1'); */
        expect(forLoopData.length).toEqual(5);   
    })

    test('display user data',()=>{
        const element= createElement('c-loop-component',{
            is:LoopComponent
        })
        document.body.appendChild(element);
        const forLoopData= Array.from(element.shadowRoot.querySelectorAll('.forEachList>li'));
        const userList= forLoopData.map(li=>li.textContent);
        expect(userList.length).toEqual(5);
        expect(userList).toEqual(ExpectedValue);
    })

    test('display first and last text of iterator loop',()=>{
        const element= createElement('c-loop-component',{
            is:LoopComponent
        })
        document.body.appendChild(element);
        const firstText=element.shadowRoot.querySelector('.iteratorList>li:first-child>div:first-child')
        const lastText=element.shadowRoot.querySelector('.iteratorList>li:last-child>div:last-child')
        expect(firstText.textContent).toBe('Start of Iterator Loop')
        expect(lastText.textContent).toBe('End of Iterator Loop')

    })
})