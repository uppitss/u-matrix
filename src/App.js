import React, {useEffect, useMemo, useState} from 'react';
import {Button, Stack, Heading} from "@chakra-ui/react";
import MatrixTabs from "./features/matrix/components/MatrixTabs";
import LoadingSpinner from "./features/matrix/components/LoadingSpinner";
import {readAppData} from "./features/matrix/services/ioService";

function App() {
    const [isLoading, setIsLoading] = useState(true)
    const [appData, setAppData] = useState(undefined)

    useMemo(async () => {
        const appData = await readAppData();
        setAppData(appData)
    },[])
    useEffect(()=>{
        if (appData !== undefined){
            console.log(appData)
            setIsLoading(false);
        }
    },[appData]);


    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <MatrixTabs appData={appData}/>}
        </>
    );
}

export default App;