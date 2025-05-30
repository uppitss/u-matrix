import {AppData} from "../entities/AppData";


export class AppDataService {
    constructor(repository) {
        this.repository = repository;
    }
    serialize = (data) => {
        return JSON.stringify(data, null, 2);
    }

    deserialize = (jsonString) => {
        return JSON.parse(jsonString);
    }
    async readData() {
        const data = await this.repository.readData();
        return new AppData(this.deserialize(data));
    }
    async saveData(appData) {
        const data = this.serialize(appData);
        this.repository.saveData(data);
    }
}