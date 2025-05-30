import React, {useEffect, useMemo, useState} from 'react';
import MatrixTabs from "./features/matrix/components/MatrixTabs";
import LoadingSpinner from "./features/matrix/components/LoadingSpinner";
import {useAppData} from "./features/matrix/hooks/useAppData";

function App({service}) {
   const {appData,isLoading,saveAppData} = useAppData(service)

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <MatrixTabs tabs={appData.tabs} onChangeData={(tabs)=>{
                // setAppData((prev)=>{
                //     prev.tabs=tabs;
                     if (process.env.NODE_ENV !== 'development') {
                         saveAppData(prev);
                     }
                //     return prev;
                // })
            }}/>}
        </>
    );
}

export default App;