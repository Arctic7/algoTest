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
  if (rootVal === val1 || rootVal === val2) {
    return root;
  } else {
    let find1;
    let find2;
    if (root.left) {
      find1 = lowestCommonAncestor(root.left, p, q);
    }
    if (root.right) {
      find2 = lowestCommonAncestor(root.right, p, q);
    }
    if (find1 && find2) {
      return root;
    } else if (find1 || find2) {
      return find1 || find2;
    } else {
      return null;
    }
  }
};

/**
 * 给定一个二叉树, 找到该树中两个指定节点的最近公共祖先。
 * 树中节点数目在范围 [2, 105] 内。
 * -109 <= Node.val <= 109
 * 所有 Node.val 互不相同 。
 * p != q
 * p 和 q 均存在于给定的二叉树中。
 *
 * 思路：
 * 不能用BST那套来确定是往左找还是往右找了
 * 首先如果待查找值之一就是节点值，则返回节点值
 * 然后依然是分布问题，比如一个左一个右，或者两个都在节点同一侧，但实际上我们不知道具体的分布，因此要在左侧和右侧找到这些节点
 * 如果左侧找到一个节点，右侧找到一个节点，则祖先就是根节点
 * 如果两个节点都在同一侧，则应该遍历二叉树，那么后续场景则根节点转移为这一侧的子节点，那么一定会存在这样的场景：
 * 场景1，两者是父子或父孙关系
 * 场景2，两者有共同祖先
 * 无论是哪种场景，对于一侧的子节点来说，依然是去它的左和右找结果，判断逻辑也是一样的，因此可以递归
 * 结论：在同一侧，或者不在同一侧的，从当前根节点的左右去找它们，找打谁就返回谁。
 * 如果两侧都有返回，则当前根节点就是结果，返回当前根节点。
 * 如果一侧有返回，另一侧没有，则这一侧的返回就是它们的父节点，里面还有两种情况，它们有一个父节点，以及它们中的一个是另一个父节点，不管哪种，返回都是对的
 */