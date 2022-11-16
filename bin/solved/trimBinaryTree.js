/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var pruneTree = function(root) {
  const result = findAndRemove(root);
  if (result) {
    return null;
  } else {
    return root;
  }
};

/**
 * @param {TreeNode} node
 * @returns {boolean} 需要移除就返回true
 */
function findAndRemove(node) {
  if (node) {
    const result1 = findAndRemove(node.left);
    const result2 = findAndRemove(node.right);
    if (result1) {
      node.left = null;
    }
    if (result2) {
      node.right = null;
    }
    // 如果子树都需要移除，则当前树是否移除则取决于它自己是否节点值是1
    const childResult = result1 && result2;
    return node.val !== 1 && childResult;
  }
  return true;
}

/**
 * 给你二叉树的根结点 root ，此外树的每个结点的值要么是 0 ，要么是 1 。
 * 返回移除了所有不包含 1 的子树的原二叉树。
 * 节点 node 的子树为 node 本身加上所有 node 的后代。
 * 树中节点的数目在范围 [1, 200] 内
 * Node.val 为 0 或 1
 * 
 * 思路：
 * 后续遍历，获取左右子结点各自是否不包含1，如果某一方不包含，则移除它，如果左右都不包含，则移除根
 * 空结点视为不包含1，需要移除，这样考虑到了单子结点的情况
 */