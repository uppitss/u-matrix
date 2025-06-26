import {useEffect, useState} from 'react';

export const useTabs = (service) => {
    const [tabs, setTabs] = useState([]);
    const [activeTabId, setActiveTabId] = useState(tabs.length > 0 ? tabs[0].id : -1);
    const [editedTabId, setEditedTabId] = useState(undefined);

    useEffect(() => {
            setTabs(service.getTabs());
    }, [service]);

    const editTab = async (id) => {
        setEditedTabId(id);
    }
    const changeTab = async (id) => {
        setActiveTabId(id);
    }
    const addTab = async (title, color) => {
        const {newTabId, newTabs} = await service.addTab(tabs);
        setTabs(newTabs);
        setActiveTabId(newTabId);
    };

    const removeTab = async (id) => {
        const {newActiveTabId,newTabs} = await service.removeTab(id,activeTabId,tabs);
        setTabs(newTabs);
        setActiveTabId(newActiveTabId);
    };

    const renameTab = async (id, title) => {
        const newTabs = await service.renameTab(id,title,tabs);
        setTabs(newTabs);
    }

    return {
        tabs,
        activeTabId,
        editedTabId,
        addTab,
        removeTab,
        renameTab,
        changeTab,
        editTab,
    };
};