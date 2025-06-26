import React, {useEffect, useMemo, useState} from 'react';
import MatrixTabs from "./features/matrix/components/MatrixTabs";
import LoadingSpinner from "./features/matrix/components/LoadingSpinner";
import {useAppData} from "./features/matrix/hooks/useAppData";
import {UTabsService} from "./features/matrix/domain/services/UTabsService";

function App({service}) {
    const {appData, isLoading, saveAppData} = useAppData(service)
    const handleTabModified = (action, tabs) => {
        // if (process.env.NODE_ENV !== 'development') {
        //     saveAppData(prev);
        // }
        console.log("NeedSave APPDATA. Action="+action);
        console.log(tabs);
    }

    const tabsService = new UTabsService(service, handleTabModified);

    return (
        <>
            {isLoading && <LoadingSpinner/>}
            {!isLoading && <MatrixTabs service={tabsService} />}
        </>
    );
}

export default App;