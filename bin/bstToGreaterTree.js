/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBST = function(root) {
  mirrorInorder(root, 0);
  return root;
};

/**
 * @param {TreeNode} node
 * @param {number} prev
 * @returns {number}
 */
function mirrorInorder(node, prev) {
  if (node) {
    const r = mirrorInorder(node.right, prev);
    node.val = node.val + r;
    return mirrorInorder(node.left, node.val);
  } else {
    return prev;
  }
}

/**
 * 给出二叉搜索树的根节点，该树的节点值各不相同，请你将其转换为累加树（Greater Sum Tree），使每个节点 node的新值等于原树中大于或等于node.val的值之和。
 * 提醒一下，二叉搜索树满足下列约束条件：
 * 节点的左子树仅包含键小于节点键的节点。
 * 节点的右子树仅包含键大于节点键的节点。
 * 左右子树也必须是二叉搜索树。
 * 树中的节点数介于 0 和 10^4 之间。
 * 每个节点的值介于 -10^4 和 10^4 之间。
 * 树中的所有值互不相同。
 * 给定的树为二叉搜索树。
 * 思路：
 * 这个题目的意思是，给出BST，对每个节点来说，要找出所有不小于它的节点，然后把这些节点值相加（包含它自身），作为它的新节点值
 * 所以BST最右侧的节点是最大的，因此它的新值和现有值一样
 * 简单研究一下之后发现这个问题就是一个镜像的中序遍历的问题，即右->根->左，先拿到右边的值，然后是根节点，要加上右边，然后是左节点，要加上根节点
 */