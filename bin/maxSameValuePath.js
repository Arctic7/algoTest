/**
 * @param {TreeNode} root
 * @return {number}
 */
var longestUnivaluePath = function(root) {
  const resultRef = {value: 0};
  traverse(root, resultRef);
  return resultRef.value;
};

function traverse(node, resultRef) {
  if (node) {
    if (!node.left && !node.right) {
      node.leftPath = 0;
      node.rightPath = 0;
    } else {
      traverse(node.left, resultRef);
      traverse(node.right, resultRef);
      // 没有左节点，或者左节点值和当前值不同，不能视为path
      if (!node.left || (node.left && node.val !== node.left.val)) {
        node.leftPath = 0;
      } else if (node.left && node.val === node.left.val) {
        node.leftPath = Math.max(node.left.leftPath, node.left.rightPath) + 1;
      }
      // 右节点的处理类似
      if (!node.right || (node.right && node.val !== node.right.val)) {
        node.rightPath = 0;
      } else if (node.right && node.right.val === node.val) {
        node.rightPath = Math.max(node.right.leftPath, node.right.rightPath) + 1;
      }
      // 最后当前节点的值，要么是合并要么是从左右中选一个
      let sum = 0;
      if (node.left && node.right && node.val === node.left.val && node.val === node.right.val) {
        sum = node.leftPath + node.rightPath;
      } else {
        sum = Math.max(node.leftPath, node.rightPath);
      }
      if (sum > resultRef.value) {
        resultRef.value = sum;
      }
    }
  }
}

/**
 * 给定一个二叉树的root，返回最长的路径的长度 ，这个路径中的每个节点具有相同值。
 * 这条路径可以经过也可以不经过根节点。
 * 两个节点之间的路径长度由它们之间的边数表示。
 * 树的节点数的范围是 [0, 10^4]
 * -1000 <= Node.val <= 1000
 * 树的深度将不超过1000
 *
 * 思路：
 * 要想找到最长的，必须考虑以每个节点为根节点的情况
 * 每个节点视为以它为根节点时的最长路径，它的最长路径等于左子的路径和右子路径取最大值，如果左右子的值相同，则等于左子路径 + 右子路径
 * 每个节点额外存储3个值，以它为根的最长路径，以及它的左路径和右路径，左右相同值时也要分开存储
 * 对于叶子节点来说，这3个值都是0
 * 对于叶子节点的上一层来说，可以拿到左和右的路径值
 * 总体上是后续遍历
 */