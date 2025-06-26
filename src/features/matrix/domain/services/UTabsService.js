import {UTab} from "../entities/UTab";

export class UTabsService {
    constructor(appDataService,onTabModified) {
        this.appDataService = appDataService;
        this.onTabModified = onTabModified; // Колбэк для уведомлений
    }

    getTabs() {
        return this.appDataService.getTabs();
    }

    addTab(tabs) {
        // Логика добавления...
        const newTab = new UTab(`Новая вкладка ${tabs.length + 1}`, `hsl(${Math.random() * 360}, 70%, 50%)`, tabs.length + 1);
        const newTabId = newTab.id;
        const newTabs = [...tabs, newTab];
        this.onTabModified('added', newTabs);
        return {newTabId, newTabs}
    }

    removeTab(removedTabId, activeTabId, tabs) {
        const newTabs = [...tabs.filter((item) => item.id !== removedTabId)];
        let newActiveTabId = -1;
        if (newTabs.length !== 0) {
            // Если вкладки еще остались
            //TODO Решение неплохое, но как будто бы не достаточно хорошо работает. Обернуть тестами. Переделать, если надо.
            if (activeTabId === removedTabId) {
                newActiveTabId = newTabs[0].id;
            } else {
                newActiveTabId = activeTabId > removedTabId ? activeTabId - 1 : activeTabId;
            }
        }
        this.onTabModified('removed', newTabs);
        return {newActiveTabId,newTabs}


    }

    renameTab(id, title,tabs) {
        const newTabs = tabs.map((item)=>{
            if (item.id === id){
                item.title = title;
            }
            return item;
        });

        this.onTabModified('renamed', newTabs);
        return newTabs;

    }
}