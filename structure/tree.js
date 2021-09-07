// 二叉搜索树（BST）
class Node {
  constructor(data) {
    this.left = null;
    this.right = null;
    this.value = data;
  }
  // 根据一个父节点，插入一个子节点
  insertNode(root, newNode) {
    // 根据待插入节点的值的大小，递归调用 this.insertNode
    if (newNode.value < root.value) {
      !root.left ? (root.left = newNode) : this.insertNode(root.left, newNode);
    } else {
      !root.right ? (root.right = newNode) : this.insertNode(root.right, newNode);
    }
  }
  // 插入一个新节点
  insert(value) {
    let newNode = new Node(value);
    // 判读是否是根节点
    if (!this.root) {
      this.root = newNode;
    } else {
      // 不是根结点，则直接调用 this.insertNode 方法
      this.insertNode(this.root, newNode);
    }
  }
  // 根据一个父节点，移除一个子节点
  removeNode(root, value) {
    if (!root) {
      return null;
    }
    if (value < root.value) {
      root.left = this.removeNode(root.left, value);
      return root;
    } else if (value > root.value) {
      root.right = this.removeNode(root.right, value);
      return root;
    } else {
      // 找到了需要删除的节点
      // 如果当前 root 节点无左右子节点
      if (!root.left && !root.right) {
        root = null;
        return root;
      }
      // 只有左节点
      if (root.left && !root.right) {
        root = root.left;
        return root;
      }
      // 只有右节点
      else if (root.right) {
        root = root.right;
        return root;
      }
      // 有左右两个子节点
      let minRight = this.findMinNode(root.right);
      root.value = minRight.value;
      root.right = this.removeNode(root.right, minRight.value);
      return root;
    }
  }
  // 移除一个节点
  remove(value) {
    if (this.root) {
      this.removeNode(this.root, value);
    }
  }
  // 找到最小的节点
  // 该方法不断递归，直到找到最左叶子节点即可
  findMinNode(root) {
    if (!root.left) {
      return root;
    } else {
      return this.findMinNode(root.left);
    }
  }
  // 根据一个父节点，查找子节点
  searchNode(root, value) {
    if (!root) {
      return null;
    }
    if (value < root.value) {
      return this.searchNode(root.left, value);
    } else if (value > root.value) {
      return this.searchNode(root.right, value);
    }
    return root;
  }
  // 查找节点
  search(value) {
    if (!this.root) {
      return false;
    }
    return Boolean(this.searchNode(this.root, value));
  }
  // 前序遍历
  preOrder(root) {
    if (root) {
      console.log(root.value);
      this.preOrder(root.left);
      this.preOrder(root.right);
    }
  }
  // 中序遍历
  inOrder(root) {
    if (root) {
      this.inOrder(root.left);
      console.log(root.value);
      this.inOrder(root.right);
    }
  }
  // 后续遍历
  postOrder(root) {
    if (root) {
      this.postOrder(root.left);
      this.postOrder(root.right);
      console.log(root.value);
    }
  }
}
