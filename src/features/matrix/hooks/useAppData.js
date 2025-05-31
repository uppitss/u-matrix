import {useEffect, useMemo, useState} from 'react';

export const useAppData = (service) => {
    const [appData, setAppData] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true)

    useMemo(async () => {
        const appData = await service.readData();
        setAppData(appData)
    },[service])

    useEffect(()=>{
        if (appData !== undefined){
            setIsLoading(false);
        }
    },[appData]);

    const saveAppData = async (data)=>{
        service.saveData(data);
    }

    return {
        appData,
        isLoading,
        saveAppData
    };
}