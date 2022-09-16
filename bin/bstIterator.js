import '../typedef/TreeNode.js';
import {createTreeNode} from './_util.js';

/**
 * @param {TreeNode} root
 */
var BSTIterator = function(root) {
  /**
   * @type {{node: TreeNode; flag: string}[]} 第一个元素永远是根节点，叶子节点在最后面
   */
  this._routes = [];
  /**
   * @type {TreeNode | null}
   */
  this._next = null;
  // 初始化时先构造从根到左叶子的路径
  findRoutes({node: root, flag: 'left'}, this._routes);
};

/**
 * @param {{node: TreeNode; flag: string}} routeNode
 * @param {{node: TreeNode; flag: string}[]} routes
 */
function findRoutes(routeNode, routes) {
  if (routeNode) {
    // 子节点一定放在后面
    routes.push(routeNode);
    const _node = routeNode.node;
    // 优先往左探索，其次是停留在中间，最后往右探索
    if (_node.left) {
      findRoutes({node: _node.left, flag: 'left'}, routes);
    } else {
      // 找不到左节点的时候停止
      routeNode.flag = 'middle';
    }
  }
}

/**
 * @return {number}
 */
BSTIterator.prototype.next = function() {
  const last = this._routes[this._routes.length - 1];
  if (this._next === null) {
    this._next = last.node;
  } else {
    // 从末尾开始，先往右找，再往上找
    let notFound = true;
    let pointer = this._routes.length - 1;
    while (notFound && pointer > -1) {
      const curPointer = this._routes[pointer];
      // 先判断状态，当前节点可以是叶子节点，也可以是它的父节点，叶子节点可以是左，也可以是右
      if (curPointer.flag === 'middle') {
        // 先尝试往右找，不行再往上回溯
        if (curPointer.node.right) {
          notFound = false;
          curPointer.flag = 'right';
          findRoutes({node: last.node.right, flag: 'left'}, this._routes);
          this._next = this._routes[this._routes.length - 1].node;
        } else {
          pointer--;
          this._routes.pop();
        }
      } else if (curPointer.flag === 'left') {
        notFound = false;
        curPointer.flag = 'middle';
        this._next = curPointer.node;
      } else if (curPointer.flag === 'right') {
        // 只能往上回溯
        pointer--;
        this._routes.pop();
      }
    }
  }
  return this._next.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function() {
  if (this._next === null) {
    return true;
  } else {
    // 从末尾开始，先往右找，再往上找
    let notFound = true;
    let pointer = this._routes.length - 1;
    while (notFound && pointer > -1) {
      const curPointer = this._routes[pointer];
      // 先判断状态，当前节点可以是叶子节点，也可以是它的父节点，叶子节点可以是左，也可以是右
      if (curPointer.flag === 'middle') {
        // 先尝试往右找，不行再往上回溯
        if (curPointer.node.right) {
          notFound = false;
        } else {
          pointer--;
        }
      } else if (curPointer.flag === 'left') {
        notFound = false;
      } else if (curPointer.flag === 'right') {
        // 只能往上回溯
        pointer--;
      }
    }
    return !notFound;
  }
};

function main() {
  const root = createTreeNode(5);
  const left = createTreeNode(2);
  const right = createTreeNode(7);
  root.left = left;
  root.right = right;
  left.left = createTreeNode(1);
  left.right = createTreeNode(3);
  right.left = createTreeNode(6);
  right.right = createTreeNode(8);


  const obj = new BSTIterator(root);
  console.log(obj.next());
  console.log(obj.hasNext());
  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.hasNext());
  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.hasNext());
  console.log(obj.next());
  console.log(obj.next());
  console.log(obj.hasNext());
}

main();

/**
 * 实现一个二叉搜索树迭代器类BSTIterator ，表示一个按中序遍历二叉搜索树（BST）的迭代器：
 * BSTIterator(TreeNode root) 初始化 BSTIterator 类的一个对象。BST 的根节点 root 会作为构造函数的一部分给出。
 * 指针应初始化为一个不存在于 BST 中的数字，且该数字小于 BST 中的任何元素。
 * boolean hasNext() 如果向指针右侧遍历存在数字，则返回 true ；否则返回 false 。
 * int next()将指针向右移动，然后返回指针处的数字。
 * 注意，指针初始化为一个不存在于 BST 中的数字，所以对 next() 的首次调用将返回 BST 中的最小元素。
 * 你可以假设next()调用总是有效的，也就是说，当调用 next()时，BST 的中序遍历中至少存在一个下一个数字。
 * 树中节点的数目在范围 [1, 105] 内
 * 0 <= Node.val <= 106
 * 最多调用 105 次 hasNext 和 next 操作
 * 你可以设计一个满足下述条件的解决方案吗？next() 和 hasNext() 操作均摊时间复杂度为 O(1) ，并使用 O(h) 内存，其中 h 是树的高度。
 *
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 *
 * 思路：
 * 简单来说就是构造一个BST的中序结果的迭代器，给出一个指针和next方法，使得当连续调用next的时候，输出的值是BST的中序遍历结果
 * 由于BST中序遍历就是一个数组，因此最简单的方法就是先对BST中序遍历一次，保存下这个数组，然后当调用next时依次移动数组的指针即可
 * 但要求是next和hasNext要O(1)的时间复杂度，空间复杂度是O(h)，表示树的高度
 * 所以考虑人工模拟中序迭代，记录从根节点到叶子节点的每一个路径，然后当路径到达某个叶子节点终结后，下一次指针回到它的父节点，然后再下一次指向有右节点
 * 有点类似回溯，即先探求左枝，然后回溯到最近一个父节点，然后再探索右枝，回到父节点时，是选择留在父节点，还是探索右枝，需要通过记录之前的状态来判断
 */