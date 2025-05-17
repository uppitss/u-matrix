import {UTab} from "./UTab";

export class AppData {
    constructor(tabs, version = '1.0') {
        this.version = version;
        this.tabs = tabs.map(tab => {
            let t = new UTab();
            t.parse(tab);
            return t
        });
    }
}