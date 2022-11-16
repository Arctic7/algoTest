/**
 * @param {TreeNode} root
 */
var CBTInserter = function(root) {
  this._root = root;
  this._lastParentRow = undefined;
  this._lastParentRowIndex = 0;
  let row = [root];
  let rowIndex = 0;
  while(true) {
    const newRow = [];
    row.forEach(node => {
      if (node.left) {
        newRow.push(node.left);
      }
      if (node.right) {
        newRow.push(node.right);
      }
    });
    const maxCap = Math.pow(2, rowIndex + 1);
    if (newRow.length === maxCap) {
      this._lastParentRow = newRow;
      row = newRow;
    } else {
      // 最后一行没有盛满名额，循环结束
      this._lastParentRow = row;
      break;
    }
    rowIndex++;
  }
  // 找到最后一行之后判断一下哪个节点没撑满
  this._lastParentRow.every((parent, index) => {
    const hasBoth = parent.left && parent.right;
    if (!hasBoth) {
      this._lastParentRowIndex = index;
    }
    return hasBoth;
  });
};

/**
 * @param {number} val
 * @return {number}
 */
CBTInserter.prototype.insert = function(val) {
  const node = {val: val, left: null, right: null};
  const lastParent = this._lastParentRow[this._lastParentRowIndex];
  if (!lastParent.left) {
    lastParent.left = node;
  } else if (!lastParent.right) {
    lastParent.right = node;
    this._lastParentRowIndex++;
  }
  // 收尾操作在当前新增完成后执行，指针移动到末尾之后，更换最后一行
  if (this._lastParentRowIndex >= this._lastParentRow.length) {
    const newRow = [];
    this._lastParentRow.forEach(node => {
      newRow.push(node.left);
      newRow.push(node.right);
    });
    this._lastParentRow = newRow;
    this._lastParentRowIndex = 0;
  }
  return lastParent.val;
};

/**
 * @return {TreeNode}
 */
CBTInserter.prototype.get_root = function() {
  return this._root;
};

function test() {
  const root = {val: 1, left: null, right: null};
  const obj = new CBTInserter(root);
  obj.insert(2);
  obj.insert(3);
  obj.insert(4);
  obj.insert(5);
  obj.insert(6);
  console.log(obj.insert(7));
  console.log(obj.get_root());
}
test();

/**
 * Your CBTInserter object will be instantiated and called as such:
 * var obj = new CBTInserter(root)
 * var param_1 = obj.insert(val)
 * var param_2 = obj.get_root()
 *
 * 完全二叉树 是每一层（除最后一层外）都是完全填充（即，节点数达到最大）的，并且所有的节点都尽可能地集中在左侧。
 * 设计一种算法，将一个新节点插入到一个完整的二叉树中，并在插入后保持其完整。
 * 实现 CBTInserter 类:
 * CBTInserter(TreeNode root)使用头节点为root的给定树初始化该数据结构；
 * CBTInserter.insert(int v)向树中插入一个值为Node.val == val的新节点TreeNode。使树保持完全二叉树的状态，并返回插入节点TreeNode的父节点的值；
 * CBTInserter.get_root() 将返回树的头节点。
 * 树中节点数量范围为[1, 1000]
 * 0 <= Node.val <= 5000
 * root是完全二叉树
 * 0 <= val <= 5000
 * 每个测试用例最多调用insert和get_root操作10^4次
 * 思路：
 * 不是很难，用BFS记录最后一行完整的父节点，需要判断最后一行是否完整，如果不完整就返回上一行，然后还要记录一下最后一行的数量
 */