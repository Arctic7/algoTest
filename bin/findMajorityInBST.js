/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function(root) {
  const result = {prev: Number.NEGATIVE_INFINITY, prevCount: 0, majority: new Set(), majorityCount: 0};
  traverse(root, result);
  // 最后再做一次收尾
  doClose(result);
  return Array.from(result.majority);
};

/**
 * @param {TreeNode} node
 * @param {{prev: number; prevCount: number; majority: Set<number>; majorityCount: number;}} result
 */
function traverse(node, result) {
  if (node) {
    traverse(node.left, result);
    const curVal = node.val;
    const prev = result.prev;
    if (curVal === prev) {
      result.prevCount++;
    } else {
      doClose(result);
    }
    traverse(node.right, result);
  }
}

/**
 * @param {{prev: number; prevCount: number; majority: Set<number>; majorityCount: number;}} result
 */
function doClose(result) {
  const prev = result.prev;
  // 前一个值收尾
  if (result.prevCount > result.majorityCount) {
    result.majority = new Set();
    result.majority.add(prev);
    result.majorityCount = result.prevCount;
  } else if (result.prevCount === result.majorityCount) {
    result.majority.add(prev);
    result.majorityCount = result.prevCount;
  }
  // 最后公共收尾
  result.prev = curVal;
  result.prevCount = 1;
}

/**
 * 给你一个含重复值的二叉搜索树（BST）的根节点 root ，找出并返回 BST 中的所有 众数（即，出现频率最高的元素）。
 * 如果树中有不止一个众数，可以按 任意顺序 返回。
 * 假定 BST 满足如下定义：
 * 结点左子树中所含节点的值 小于等于当前节点的值
 * 结点右子树中所含节点的值 大于等于当前节点的值
 * 左子树和右子树都是二叉搜索树
 * 提示：
 * 树中节点的数目在范围 [1, 10^4] 内
 * -10^5 <= Node.val <= 10^5
 * 进阶：你可以不使用额外的空间吗？（假设由递归产生的隐式调用栈的开销不被计算在内）
 * 思路：
 * 不可能不使用额外空间，因为返回格式是数组，数组本身就是额外空间，所以这个题目的意思是不要使用O(n)空间
 * 硬要想的话，中序遍历开始，构造一个对象，只保存出现次数到目前为止最大的，和当前元素的出现次数
 * 因为是中序遍历所以节点值一定是有序递增的，当节点值变化后，统计上一个节点值的出现次数，和当前出现次数比较，如果超过，则替换当前结果
 */