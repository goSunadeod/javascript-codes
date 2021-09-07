// 栈 后进先出 LIFO
class Stack {
  constructor(...args) {
    // 使用数组进行模拟
    this.stack = [...args];
  }
  push(...items) {
    // 入栈
    return this.stack.push(...items);
  }
  pop() {
    // 出栈，从数组尾部弹出一项
    return this.stack.pop();
  }
  peek() {
    return this.isEmpty() ? undefined : this.stack[this.size() - 1];
  }
  isEmpty() {
    return this.size() == 0;
  }
  size() {
    return this.stack.length;
  }
}
