/* Сервис отвечающий за чтение и запись данных */

import {deserialize, serialize} from "./serializer";
import {AppData} from "../domain/entities/AppData";
import App from "../../../App";

const filePath = "matrix.json"

// Чтение файла
const readFile = async (filePath) => {
    return new Promise((resolve, reject) =>{
        try {
            window.electronAPI.readFile(filePath).then((data)=>{resolve(data);});
        } catch (err) {
            reject(`Ошибка чтения файла: ${err.message}`);
        }
    })

};

// Сохранение файла
const saveFile = async (filePath, content) => {
    window.electronAPI.writeFile(filePath, content);
    return new Promise((resolve,reject)=>{
       try {
           window.electronAPI.writeFile(filePath, content).then(resolve(true));
       } catch (err) {
           reject(`Ошибка сохранения файла: ${err.message}`);
       }
   })

};

export const saveAppData = async (data)=>{
    const serialized = serialize(data);
    await saveFile(filePath,serialized);
}
export  const readAppData = async () =>{
    const fileData = await readFile(filePath);
    return deserialize(fileData);
}