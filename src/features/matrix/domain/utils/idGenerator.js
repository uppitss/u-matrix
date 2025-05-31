export function generateId() {
    return crypto.randomUUID(); // или полифил для Node.js
}