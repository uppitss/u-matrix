import {AppData} from "../entities/AppData";


export class AppDataService {
    constructor(repository) {
        this.repository = repository;
        this.appData = undefined;
    }
    serialize = (data) => {
        return JSON.stringify(data, null, 2);
    }

    deserialize = (jsonString) => {
        return JSON.parse(jsonString);
    }
    async readData() {
        const data = await this.repository.readData();
        const appData = new AppData(this.deserialize(data));
        this.appData = appData;//Прикопаем для получения вкладок
        return appData;
    }
    async saveData(appData) {
        const data = this.serialize(appData);
        this.repository.saveData(data);
        this.appData = appData;//Прикопаем для получения вкладок
    }
    getTabs(){
        if (this.appData !== undefined) {
            return this.appData.tabs;
        }
        else {
            return [];
        }
    }
}