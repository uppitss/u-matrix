import { AppData } from '../models/AppData';

export function serialize(data) {
    return JSON.stringify(data, null, 2);
}

export function deserialize(jsonString) {
    const rawData = JSON.parse(jsonString);
    return new AppData(rawData);
}