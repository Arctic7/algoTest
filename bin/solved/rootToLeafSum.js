import '../../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {
  const sumObj = {sum: 0};
  if (root) {
    traverse(root, '', sumObj);
  }
  return sumObj.sum;
};

/**
 * @param {TreeNode} node
 * @param {string} path
 * @param {{sum: number}} sumObj
 */
function traverse(node, path, sumObj) {
  if (node) {
    path = path + String(node.val);
    if (isLeaf(node)) {
      const num = Number(path);
      sumObj.sum = sumObj.sum + num;
    } else {
      traverse(node.left, path, sumObj);
      traverse(node.right, path, sumObj);
    }
  }
}

/**
 * @param {TreeNode} node
 * @returns {boolean}
 */
function isLeaf(node) {
  return node && !node.left && !node.right;
}

/**
 * 给你一个二叉树的根节点 root ，树中每个节点都存放有一个 0 到 9 之间的数字。
 * 每条从根节点到叶节点的路径都代表一个数字：
 * 例如，从根节点到叶节点的路径 1 -> 2 -> 3 表示数字 123 。
 * 计算从根节点到叶节点生成的 所有数字之和 。
 * 叶节点 是指没有子节点的节点。
 * 树中节点的数目在范围 [1, 1000] 内
 * 0 <= Node.val <= 9
 * 树的深度不超过 10
 *
 * 思路：典型的DFS问题，遍历到叶子节点的时候，记录所有路径，转为数字，最后汇总
 */