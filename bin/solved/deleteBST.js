/**
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function(root, key) {
  if (root) {
    const result = findTarget(root, key, null, false);
    const target = result.cur;
    const parent = result.parent;
    // 目标值是否是它父节点的左节点，父节点为null时此变量无意义
    const isLeft = result.isLeft;
    if (target && target === root) {
      // 判断目标是否是叶子节点，或只有单子节点，或者两个都有
      if (isLeaf(target)) {
        root = null;
        return root;
      } else if (target.left && !target.right) {
        const newRoot = target.left;
        target.left = null;
        return newRoot;
      } else if (!target.left && target.right) {
        const newRoot = target.right;
        target.right = null;
        return newRoot;
      } else {
        // 根节点同时有左右节点
        const result2 = findLeftMin(target.right, target);
        // 值替换
        target.val = result2.cur.val;
        deleteTarget(result2.cur, result2.parent, result2.cur === result2.parent.left);
      }
    } else if (target && target !== root) {
      deleteTarget(target, parent, result.isLeft);
    }
    // 找不到目标时无需处理
  }
  // 没有节点时返回null
  return root;
};

/**
 * 找到目标值和它的父节点
 * @param {TreeNode} node
 * @param {number} key
 * @param {TreeNode | null} parent
 * @param {boolean} isLeft
 */
function findTarget(node, key, parent, isLeft) {
  if (node) {
    const nodeVal = node.val;
    if (key > nodeVal) {
      return findTarget(node.right, key, node, false);
    } else if (key < nodeVal) {
      return findTarget(node.left, key, node, true);
    } else {
      return {cur: node, parent: parent, isLeft: isLeft};
    }
  }
  return {cur: null, parent: null, isLeft: false};
}

/**
 * @param {TreeNode} node
 * @returns {boolean}
 */
function isLeaf(node) {
  return node && !node.left && !node.right;
}

/**
 * @param {TreeNode | null} target
 * @param {TreeNode} parent 必须要有
 * @param {boolean} isLeft
 */
function deleteTarget(target, parent, isLeft) {
  if (target) {
    if (isLeaf(target)) {
      if (isLeft) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if ((target.left && !target.right) || (target.right && !target.left)) {
      const newRoot = target.left ? target.left : target.right;
      target.left = null;
      target.right = null;
      if (isLeft) {
        parent.left = newRoot;
      } else {
        parent.right = newRoot;
      }
    } else if (target.left && target.right) {
      const result = findLeftMin(target.right, target);
      // 值替换
      target.val = result.cur.val;
      const isLeft2 = result.cur === result.parent.left;
      deleteTarget(result.cur, result.parent, isLeft2);
    }
  }
}

/**
 * @param {TreeNode} node
 * @param {TreeNode} parent
 */
function findLeftMin(node, parent) {
  if (!node.left) {
    return {cur: node, parent: parent};
  } else {
    return findLeftMin(node.left, node);
  }
}

/**
 * 给定一个二叉搜索树的根节点 root 和一个值 key，删除二叉搜索树中的key对应的节点，并保证二叉搜索树的性质不变。
 * 返回二叉搜索树（有可能被更新）的根节点的引用。
 * 节点数的范围[0, 10^4].
 * -10^5<= Node.val <= 10^5
 * 节点值唯一
 * root是合法的二叉搜索树
 * -10^5<= key <= 10^5
 *
 * 思路：其实就是BST的删除操作。
 * 删除完当前节点后，要从子节点中拉一个节点上来做新的节点
 * 如果当前节点是叶子节点，直接删除即可，此时需要父节点参与
 * 如果当前节点有左或者右的单节点，则直接把对应节点拉上来替换它，此时也需要父节点参与
 * 如果当前节点的左右都有，则从右侧节点中找一个最小的，和它做值替换，此时不需要父节点参与，被替换的节点作为新的待删除节点，重复这个过程
 * 最后再考虑一下特殊情况，即目标值是根节点
 */