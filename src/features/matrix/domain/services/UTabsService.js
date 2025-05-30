import {UTab} from "@/features/matrix/domain/entities/UTab";

export class UTabsService {
    constructor(repository) {
        this.repository = repository;
    }

    async createTab(title, color, position) {
        const newTab = new UTab(title, color, position);
        return this.repository.addTab(newTab);
    }

    async deleteTab(id) {
        if (!id) throw new Error('Tab ID is required');
        return this.repository.removeTab(id);
    }

    async renameTab(id, newTitle) {
        const tabs = await this.repository.getTabs();
        const tab = tabs.find(t => t.id === id);
        if (!tab) throw new Error('Tab not found');

        const updatedTab = new Tab(
            tab.id,
            newTitle,
            tab.color,
            tab.createdAt
        );

        return this.repository.updateTab(updatedTab);
    }
}