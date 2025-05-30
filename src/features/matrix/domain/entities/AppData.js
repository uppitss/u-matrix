import {UTab} from "./UTab";

export class AppData {
    constructor(data) {
        this.version = data.version;
        this.tabs = data.tabs.map((item)=>{
            const utab = new UTab();
            utab.parse(item);
            return utab;
        });
    }
}