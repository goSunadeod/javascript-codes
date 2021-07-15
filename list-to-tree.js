const arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
];

// 1 递归
const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
};

const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid);
  return result;
};

// 2 最优
function arrayToTree(data) {
  const result = [];
  const itemMap = {};
  for (const item of data) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: []
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]['children']
    };

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: []
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

//3 最简单
function arrayToTree(data) {
  const tempObj = {};
  data.reduce((pre, cur) => {
    if (!tempObj[cur.id]) {
      tempObj[cur.id] = { ...cur, children: [] };
    }
    if (!cur.pid) {
      pre.push(cur);
    } else {
      tempObj[cur.pid].children.push(tempObj[cur.id]);
    }
    return pre;
  }, []);
  console.log(tempObj['1']);
}
