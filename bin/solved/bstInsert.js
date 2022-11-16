/**
 * @param {TreeNode} root
 * @param {number} val
 * @return {TreeNode}
 */
var insertIntoBST = function(root, val) {
  if (root) {
    const nodeVal = root.val;
    if (nodeVal < val && !root.right) {
      root.right = {val: val, left: null, right: null};
    } else if (nodeVal > val && !root.left) {
      root.left = {val: val, left: null, right: null};
    } else if (nodeVal < val && root.right){
      insertIntoBST(root.right, val);
    } else if (nodeVal > val && root.left) {
      insertIntoBST(root.left, val);
    }
    return root;
  } else {
    return {val: val, left: null, right: null};
  }
};


/**
 * 给定二叉搜索树（BST）的根节点root和要插入树中的值value，将值插入二叉搜索树, 返回插入后二叉搜索树的根节点。
 * 输入数据 保证 ，新值和原始二叉搜索树中的任意节点值都不同。
 * 注意，可能存在多种有效的插入方式，只要树在插入后仍保持为二叉搜索树即可。 你可以返回 任意有效的结果 。
 * 树中的节点数将在[0,10^4]的范围内。
 * -10^8<= Node.val <= 10^8
 * 所有值Node.val是独一无二的。
 * -10^8<= val <= 10^8
 * 保证val在原始BST中不存在。
 *
 */

