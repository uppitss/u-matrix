import {generateId} from "@/features/matrix/domain/utils/idGenerator";

export class UTab {
    constructor(title = 'Новая вкладка',
                color = '#3B82F6',
                position = 0) {

        this.id = generateId();
        this.title = title;
        this.color=color;
        this.position=position;

        this.tasks = [];
    }
    parse(data){
      this.id = data.id;
      this.title = data.title;
      this.color = data.color;
      this.position = data.position;
    }
}