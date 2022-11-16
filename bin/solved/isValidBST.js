import '../../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
  const prevObj = {val: Number.NEGATIVE_INFINITY};
  return traverseTree(root, prevObj);
};

/**
 *
 * @param {TreeNode} node
 * @param {Object} prevObj
 * @returns {boolean}
 */
function traverseTree(node, prevObj) {
  if (node) {
    const result = traverseTree(node.left, prevObj);
    if (result) {
      const val = node.val;
      if (prevObj.val < val) {
        prevObj.val = val;
        return traverseTree(node.right, prevObj);
      } else {
        return false;
      }
    }
    return result;
  }
  return true;
}

/**
 * 给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。
 * 有效 二叉搜索树定义如下：
 * 节点的左子树只包含 小于 当前节点的数。
 * 节点的右子树只包含 大于 当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 * 思路：
 * 中序遍历BST，然后记录上一个值，上一个值必须小于当前节点值，然后更新上一个值，继续比较，直到出现意外为止
 */