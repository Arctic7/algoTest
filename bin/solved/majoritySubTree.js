/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findFrequentTreeSum = function(root) {
  calculateEachSum(root);
  const sumMap = new Map();
  countSum(root, sumMap);
  const result = [];
  sumMap.forEach((val, key) => {
    const obj = {count: val, sum: Number(key)};
    result.push(obj);
  });
  result.sort((obj1, obj2) => {
    const count1 = obj1.count;
    const count2 = obj2.count;
    return count1 < count2 ? 1 : count1 > count2 ? -1 : 0;
  });
  const maxCount = result[0].count;
  const maxSums = [];
  for (let i = 0; i < result.length; i++) {
    const ele = result[i];
    if (ele.count === maxCount) {
      maxSums.push(ele.sum);
    } else if (ele.count < maxCount) {
      break;
    }
  }
  return maxSums;
};

/**
 * @param {TreeNode} node
 */
function calculateEachSum(node) {
  if (node) {
    calculateEachSum(node.left);
    calculateEachSum(node.right);
    let sum = node.val;
    if (node.left) {
      sum = sum + node.left.sum;
    }
    if (node.right) {
      sum = sum + node.right.sum;
    }
    node.sum = sum;
  }
}

/**
 * @param {TreeNode} node
 * @param {Map<string, number>} sumMap
 */
function countSum(node, sumMap) {
  if (node) {
    const nodeSumStr = String(node.sum);
    let sumCount = sumMap.get(nodeSumStr);
    if (sumCount === undefined) {
      sumMap.set(nodeSumStr, 1);
    } else {
      sumCount++;
      sumMap.set(nodeSumStr, sumCount);
    }
    countSum(node.left, sumMap);
    countSum(node.right, sumMap);
  }
}

/**
 * 给你一个二叉树的根结点root，请返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。
 * 一个结点的「子树元素和」定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。
 * 提示:
 * 节点数在 [1, 10^4] 范围内
 * -10^5 <= Node.val <= 10^5
 * 思路：
 * 统计节点和是比较好处理的，一个节点和就是它的子节点之和，但实际上如果把子节点加一个SUM属性则转为，一个节点的SUM就是它的值加左右节点的SUM之和
 * 所以遍历两次，第一次给所有子节点加SUM属性，并使用后续遍历求和，然后再前序遍历一次，把所有的SUM统计它们的出现次数。
 */