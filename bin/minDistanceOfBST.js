/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {
  const resultRef = {diff: undefined, prev: undefined};
  findMinDiff(root, resultRef);
  return resultRef.diff;
};

function findMinDiff(node, resultRef) {
  if (node) {
    findMinDiff(node.left, resultRef);
    if (resultRef.prev === undefined) {
      resultRef.prev = node.val;
    } else {
      if (resultRef.diff === undefined) {
        resultRef.diff = Math.abs(node.val - resultRef.prev);
      } else {
        resultRef.diff = Math.min(resultRef.diff, Math.abs(node.val - resultRef.prev));
      }
    }
    resultRef.prev = node.val;
    findMinDiff(node.right, resultRef)
  }
}

/**
 * 给你一个二叉搜索树的根节点 root ，返回树中任意两不同节点值之间的最小差值。
 * 差值是一个正数，其数值等于两值之差的绝对值。
 * 树中节点的数目范围是 [2, 100]
 * 0 <= Node.val <= 10^5
 * 
 * 思路：
 * 最小值要用中序遍历转为升序数组才能得到，相邻两个元素比较一次即可，当前元素永远和中序的上一个元素比
 */