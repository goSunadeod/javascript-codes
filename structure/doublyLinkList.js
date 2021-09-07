class Node {
  constructor(data) {
    // data 为当前节点储存的数据
    this.data = data;
    // next 指向下一个节点
    this.next = null;
    // prev 指向前一个节点
    this.prev = null;
  }
}

// 双向链表
class DoublyLinkedList {
  constructor() {
    // 双向链表开头
    this.head = null;
    // 双向链表结尾
    this.tail = null;
  }
  add(item) {
    // 实例化一个节点
    let node = new Node(item);
    // 如果当前链表还没有头
    if (!this.head) {
      this.head = node;
      this.tail = node;
      // 如果当前链表已经有了头，只需要在尾部加上该节点
    } else {
      // 把当前的尾部作为新节点的 prev
      node.prev = this.tail;
      // 把当前的尾部的 next 指向为新节点 node
      this.tail.next = node;
      this.tail = node;
    }
  }
  addAt(index, item) {
    let current = this.head;
    // 维护查找时当前节点的索引
    let counter = 1;
    let node = new Node(item);
    // 如果在头部插入
    if (index === 0) {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    // 非头部插入，需要从头开始，找寻插入位置
    else {
      while (current) {
        current = current.next;
        if (counter === index) {
          node.prev = current.prev;
          current.prev.next = node;
          node.next = current;
          current.prev = node;
        }
        counter++;
      }
    }
  }
  remove(item) {
    let current = this.head;
    while (current) {
      // 找到了目标节点
      if (current.data === item) {
        // 目标链表只有当前目标项，即目标节点即是链表头又是链表尾
        if (current == this.head && current == this.tail) {
          this.head = null;
          this.tail = null;
        }
        // 目标节点为链表头
        else if (current == this.head) {
          this.head = this.head.next;
          this.head.prev = null;
        }
        // 目标节点为链表尾部
        else if (current == this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        }
        // 目标节点在链表首尾之间，中部
        else {
          current.prev.next = current.next;
          current.next.prev = current.prev;
        }
      }
      current = current.next;
    }
  }
  removeAt(index) {
    // 都是从“头”开始遍历
    let current = this.head;
    let counter = 1;
    // 删除链表头部
    if (index === 0) {
      this.head = this.head.next;
      this.head.prev = null;
    } else {
      while (current) {
        current = current.next;
        // 如果目标节点在链表尾
        if (current == this.tail) {
          this.tail = this.tail.prev;
          this.tail.next = null;
        } else if (counter === index) {
          current.prev.next = current.next;
          current.next.prev = current.prev;
          break;
        }
        counter++;
      }
    }
  }
  reverse() {
    let current = this.head;
    let prev = null;
    while (current) {
      let next = current.next;
      // 前后倒置
      current.next = prev;
      current.prev = next;
      prev = current;
      current = next;
    }
    this.tail = this.head;
    this.head = prev;
  }
  swap(index1, index2) {
    // 使 index1 始终小于 index2，方便后面查找交换
    if (index1 > index2) {
      return this.swap(index2, index1);
    }
    let current = this.head;
    let counter = 0;
    let firstNode;
    while (current !== null) {
      // 找到第一个节点，先存起来
      if (counter === index1) {
        firstNode = current;
      }
      // 找到第二个节点，进行数据交换
      else if (counter === index2) {
        // ES 提供了更为简洁的交换数据的方式，这里我们用传统方式实现，更为直观
        let temp = current.data;
        current.data = firstNode.data;
        firstNode.data = temp;
      }
      current = current.next;
      counter++;
    }
    return true;
  }
  isEmpty() {
    return this.length() < 1;
  }
  length() {
    let current = this.head;
    let counter = 0;
    // 完整遍历一遍链表
    while (current !== null) {
      counter++;
      current = current.next;
    }
    return counter;
  }
  traverse(fn) {
    let current = this.head;

    while (current !== null) {
      // 执行遍历时回调
      fn(current);
      current = current.next;
    }
    return true;
  }
  find(item) {
    let current = this.head;
    let counter = 0;
    while (current) {
      if (current.data == item) {
        return counter;
      }
      current = current.next;
      counter++;
    }
    return false;
  }
}
