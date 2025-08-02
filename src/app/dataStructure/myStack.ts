export default class Stack<T> { // Generic type for elements
    private items: T[];
    private uniqueValues: Set<T>;
  
    constructor() {
      this.items = [];
      this.uniqueValues = new Set();
    }
  
    push(element: T): void { // Specify return type (void for push)
      if (!this.uniqueValues.has(element)) {
        this.items.push(element);
        this.uniqueValues.add(element);
      } else {
        // console.warn('Duplicate value ignored:', element);
      }
    }
  
    pop(): T | undefined { // Specify return type (element or undefined)
      const poppedItem = this.items.pop();
      if (poppedItem !== undefined) {
        this.uniqueValues.delete(poppedItem);
      }
      return poppedItem;
    }

    peek(): T | undefined {
        // Access the last element without removing it
        return this.items[this.items.length - 1];
      }
  
    isEmpty(): boolean {
      return this.items.length === 0;
    }
  
    size(): number {
      return this.items.length;
    }
  
    // ... other stack methods with type annotations
  }
  