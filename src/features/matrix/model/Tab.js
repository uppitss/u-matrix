import { Task } from './Task';

export class Tab {
    constructor({
                    id = generateId(),
                    title = 'Новая вкладка',
                    color = '#3B82F6',
                    position = 0,
                    tasks = []
                } = {}) {
        this.tasks = tasks.map(t => new Task(t));
        // ... остальные свойства
    }
}