import '../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {
  if (root) {
    /** @type {TreeNode[][]} */
    const queue = [];
    queue.push([root]);
    let index = 0;
    while (index < queue.length) {
      const row = queue[index];
      const nextRow = [];
      if (row.length > 0) {
        row.forEach(node => {
          if (node.left) {
            nextRow.push(node.left);
          }
          if (node.right) {
            nextRow.push(node.right);
          }
        });
        if (nextRow.length > 0) {
          queue.push(nextRow);
        }
      }
      index++;
    }
    const result = [];
    queue.forEach(row => {
      if (row.length > 0) {
        const last = row[row.length - 1];
        result.push(last.val);
      }
    });
    return result;
  }
  return [];
};

/**
 * 给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 * 二叉树的节点个数的范围是 [0,100]
 * -100 <= Node.val <= 100
 * 思路：
 * 转化为BFS遍历，然后取每行最后一个结果
 */

