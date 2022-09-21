import '../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  const rootVal = root.val;
  const val1 = p.val;
  const val2 = q.val;
  const min = Math.min(val1, val2);
  const max = Math.max(val1, val2);
  if (rootVal > min && rootVal < max) {
    return root;
  } else if (rootVal === val1 || rootVal === val2) {
    return root;
  } else if (rootVal > max) {
    return lowestCommonAncestor(root.left, p, q);
  } else if (rootVal < min) {
    return lowestCommonAncestor(root.right, p, q);
  }
};

/**
 * 给定一个二叉搜索树, 找到该树中两个指定节点的最近公共祖先。
 * 最近公共祖先，是指对于有根树T的两个结点 p、q，最近公共祖先表示为一个结点 x，满足 x 是 p、q 的祖先且 x 的深度尽可能大（一个节点也可以是它自己的祖先）。
 * 所有节点的值都是唯一的。
 * p、q 为不同节点且均存在于给定的二叉搜索树中。
 *
 * 思路：
 * BST可以利用两个节点值和根节点比较，比如一个大于根，一个小于根，或者就是根，则公共节点就是根
 * 如果两个都大于或者小于根，则在根的左或者右侧重复这个过程，直到找到公共节点为止
 */