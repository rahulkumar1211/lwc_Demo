import  LightningDataTable  from 'lightning/datatable';
import customNameTemplate from './customName.html';
import customRankTemplate from './customRank.html';
import customPictureTemplate from './customPicture.html';
import customPicklistTemplate from './customPicklist.html';
import customPicklistEditTemplate from './customPicklistEdit.html'

export default class CustomDataType extends LightningDataTable{
    static customTypes={
        customName:{
            template:customNameTemplate,
            standardCellLayout: true,
            typeAttributes: ['contactName']
        },
        customRank:{
            template:customRankTemplate,
            standardCellLayout: false,
            typeAttributes: ['rankIcon']
        },
        customPicture:{
            template:customPictureTemplate,
            standardCellLayout: true,
            typeAttributes: ['pictureUrl']
        },
        customPicklist:{
            template:customPicklistTemplate,
            editTemplate:customPicklistEditTemplate,
            standardCellLayout:true,
            typeAttributes:['options','value','context']
        }
    }
}