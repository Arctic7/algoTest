/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
  if (root) {
    const queue = [];
    let i = 0;
    queue.push([root]);
    while (i < queue.length) {
      const nodes = queue[i];
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
      i++;
    }
    const largestInRow = [];
    queue.forEach(row => {
      let maxVal = row[0].val;
      row.forEach(node => {
        if (node.val > maxVal) {
          maxVal = node.val;
        }
      });
      largestInRow.push(maxVal);
    });
    return largestInRow;
  } else {
    return [];
  }
};

/**
 * 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
 * 二叉树的节点个数的范围是 [0,10^4]
 * -2^31 <= Node.val <= 2^31 - 1
 * 思路：
 * 典型的BFS遍历，先拿到全部结果，然后把每行的最大值汇总
 */