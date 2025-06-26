import { QUADRANTS } from '@/features/matrix/domain/constants/quadrants';
import {generateId} from "@/features/matrix/domain/utils/idGenerator";

export class UTask {
    constructor({
                    id = generateId(),
                    text = '',
                    quadrant = QUADRANTS.NOT_URGENT_NOT_IMPORTANT,
                    completed = false,
                    color = null,
                    position = 0,
                    dueDate = null,
                    tags = []
                } = {}) {
        this.id = id;
        this.text = text;
        this.quadrant = quadrant;
        // ... остальные свойства
    }
}