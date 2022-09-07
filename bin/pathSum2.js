import '../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function(root, targetSum) {
  const resultArr = [];
  if (root) {
    findPaths(root, 0, '', targetSum, resultArr);
  }
  return resultArr;
};

/**
 * @param {TreeNode} node
 * @param {number} prev
 * @param {string} pathStr
 * @param {number} targetSum
 * @param {number[][]} resulArr
 */
function findPaths(node, prev, pathStr, targetSum, resulArr) {
  if (node) {
    const next = prev + node.val;
    if (pathStr.length === 0) {
      pathStr = String(node.val);
    } else {
      pathStr = pathStr + ',' + node.val;
    }
    if (!node.left && !node.right && next === targetSum) {
      const path = pathStr.split(',').map(ele => Number(ele));
      resulArr.push(path);
    } else if (node.left || node.right) {
      findPaths(node.left, next, pathStr, targetSum, resulArr);
      findPaths(node.right, next, pathStr, targetSum, resulArr);
    }
  }
}

/**
 * 给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有从根节点到叶子节点 路径总和等于给定目标和的路径。
 * 叶子节点是指没有子节点的节点。
 * 树中节点总数在范围 [0, 5000] 内
 * -1000 <= Node.val <= 1000
 * -1000 <= targetSum <= 1000
 * 思路：
 * 二叉树所有路径的完整遍历，需要记录所有路径，当遍历到叶子节点后，判断一下当前路径是否等于目标值，如果是，把此路径存入最后结果
 * 注意为了节省内存，路径用字符串记录，考虑到有负数节点，不能用'-'作为节点分隔符，用逗号比较好
 */