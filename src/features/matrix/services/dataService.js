import { Tab } from '../models/Tab';
import { Task } from '../models/Task';

export function addTab(data, { title, color }) {
    const newTab = new Tab({ title, color });
    data.tabs.push(newTab);
    return newTab;
}

// Добавление задачи
function addTask(tab, text, quadrant) {
    const newTask = new Task({
        text,
        quadrant,
        position: tab.tasks.filter(t => t.quadrant === quadrant).length
    });
    tab.tasks.push(newTask);
    return newTask;
}
export function deleteTask(tab, taskId) {
    tab.tasks = tab.tasks.filter(t => t.id !== taskId);
}

// Поиск по ID
function findTabById(data, tabId) {
    return data.tabs.find(tab => tab.id === tabId);
}

function findTaskById(tab, taskId) {
    return tab.tasks.find(task => task.id === taskId);
}