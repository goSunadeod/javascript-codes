// 有向图
class Graph {
  constructor() {
    // 使用 Map 数据结构表述图中顶点关系
    this.AdjList = new Map();
  }
  // 添加顶点
  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, []);
    } else {
      throw 'vertex already exist!';
    }
  }
  // 添加边
  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)) {
        let arr = this.AdjList.get(vertex);
        if (!arr.includes(node)) {
          arr.push(node);
        }
      } else {
        throw `Can't add non-existing vertex ->'${node}'`;
      }
    } else {
      throw `You should add '${vertex}' first`;
    }
  }
  // 打印图
  print() {
    // 使用 for of 遍历并打印 this.AdjList
    for (let [key, value] of this.AdjList) {
      console.log(key, value);
    }
  }
  createVisitedObject() {
    let map = {};
    for (let key of this.AdjList.keys()) {
      arr[key] = false;
    }
    return map;
  }
  // 广度优先算法遍历 BFS
  bfs(initialNode) {
    // 创建一个已访问节点的 map
    let visited = this.createVisitedObject();
    // 模拟一个队列
    let queue = [];
    // 第一个节点已访问
    visited[initialNode] = true;
    // 第一个节点入队列
    queue.push(initialNode);
    while (queue.length) {
      let current = queue.shift();
      console.log(current);
      // 获得该节点的其他节点关系
      let arr = this.AdjList.get(current);
      for (let elem of arr) {
        // 如果当前节点没有访问过
        if (!visited[elem]) {
          visited[elem] = true;
          queue.push(elem);
        }
      }
    }
  }

  // 深度优先算法
  dfs(initialNode) {
    let visited = this.createVisitedObject();
    this.dfsHelper(initialNode, visited);
  }
  dfsHelper(node, visited) {
    visited[node] = true;
    console.log(node);
    let arr = this.AdjList.get(node);
    // 遍历节点调用 this.dfsHelper
    for (let elem of arr) {
      if (!visited[elem]) {
        this.dfsHelper(elem, visited);
      }
    }
  }
}

// let graph = new Graph();
// graph.addVertex('A');
// graph.addVertex('B');
// graph.addVertex('C');
// graph.addVertex('D');
