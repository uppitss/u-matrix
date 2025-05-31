import React, {useEffect, useMemo, useState} from 'react';
import MatrixTabs from "./features/matrix/components/MatrixTabs";
import LoadingSpinner from "./features/matrix/components/LoadingSpinner";
import {useAppData} from "./features/matrix/hooks/useAppData";
import {UTabsService} from "./features/matrix/domain/services/UTabsService";

function App({service}) {
   const {appData,isLoading,saveAppData} = useAppData(service)

    const tabsService = new UTabsService(service);

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <MatrixTabs service={tabsService}  onChangeData={(tabs)=>{
                     if (process.env.NODE_ENV !== 'development') {
                         saveAppData(prev);
                     }
            }}/>}
        </>
    );
}

export default App;