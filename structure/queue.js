// 队列 先进先出 FIFO
class Queue {
  constructor(...args) {
    // 使用数组进行模拟
    this.queue = [...args];
  }
  enqueue(...items) {
    // 入队
    return this.queue.push(...items);
  }
  dequeue() {
    // 出队
    return this.queue.shift();
  }
  front() {
    return this.isEmpty() ? undefined : this.queue[0];
  }
  back() {
    return this.isEmpty() ? undefined : this.queue[this.size() - 1];
  }
  isEmpty() {
    return this.size() == 0;
  }
  size() {
    return this.queue.length;
  }
}
