/**
 * @param {TreeNode} root
 * @return {number}
 */
var findBottomLeftValue = function(root) {
  const queue = [];
  let index = 0;
  queue.push([root]);
  while (index < queue.length) {
    const nodes = queue[index];
    const newRow = [];
    nodes.forEach(node => {
      if (node.left) {
        newRow.push(node.left);
      }
      if (node.right) {
        newRow.push(node.right);
      }
    });
    if (newRow.length > 0) {
      queue.push(newRow);
    }
    index++;
  }
  const lastRow = queue[queue.length - 1];
  return lastRow[0].val;
};

/**
 * 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
 * 假设二叉树中至少有一个节点。
 * 二叉树的节点个数的范围是 [1,10^4]
 * -2^31 <= Node.val <= 2^31 - 1
 * 思路：
 * 条件是最深的，然后从左往右的第一个
 * 可以直接用BFS去处理，返回最后一行元素的第一个即可
 */