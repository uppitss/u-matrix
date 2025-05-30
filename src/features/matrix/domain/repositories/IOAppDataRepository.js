import {IAppDataRepository} from "./IAppDataRepository";

export class IOAppDataRepository extends IAppDataRepository
{
    constructor() {
        super();
        this.filePath="matrix.json";
    }

    async readData() {
        return new Promise((resolve, reject) =>{
            try {
                window.electronAPI.readFile(this.filePath).then((data)=>{resolve(data);});
            } catch (err) {
                reject(`Ошибка чтения файла: ${err.message}`);
            }
        })
    }
    async saveData(data) {
        return new Promise((resolve,reject)=>{
            try {
                window.electronAPI.writeFile(this.filePath, data).then(resolve(true));
            } catch (err) {
                reject(`Ошибка сохранения файла: ${err.message}`);
            }
        })
    }
}