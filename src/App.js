import React, {useEffect, useMemo, useState} from 'react';
 import MatrixTabs from "./features/matrix/components/MatrixTabs";
 import LoadingSpinner from "./features/matrix/components/LoadingSpinner";
 import {readAppData, saveAppData} from "./features/matrix/services/ioService";

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [appData, setAppData] = useState(undefined)

    useMemo(async () => {
        const appData = await readAppData();
        setAppData(appData)
    },[])
    useEffect(()=>{
        if (appData !== undefined){
            setIsLoading(false);
        }
    },[appData]);


    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <MatrixTabs tabs={appData.tabs} onChangeData={(tabs)=>{
                setAppData((prev)=>{
                    prev.tabs=tabs;
                    if (process.env.NODE_ENV !== 'development') {
                        saveAppData(prev);
                    }
                    return prev;
                })
            }}/>}
        </>
    );
}

export default App;