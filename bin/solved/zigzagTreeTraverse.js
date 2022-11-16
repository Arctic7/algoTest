import '../../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function(root) {
  if (root) {
    /** @type {TreeNode[][]} BSF结果 */
    const levelOrder = [];
    levelOrder.push([root]);
    let index = 0;
    while (index < levelOrder.length) {
      const nodes = levelOrder[index];
      let nextRow = levelOrder[index + 1];
      if (nodes.length > 0) {
        if (nextRow === undefined) {
          nextRow = [];
          levelOrder[index + 1] = nextRow;
        }
        nodes.forEach(node => {
          const left = node.left;
          const right = node.right;
          if (left) {
            nextRow.push(left);
          }
          if (right) {
            nextRow.push(right);
          }
        });
      }
      index++;
    }
    // format results;
    /** @type {number[][]} */
    const numResults = [];
    levelOrder.forEach((row, index) => {
      if (index % 2 === 1) {
        row.reverse();
      }
      const numRow = row.map(node => node.val);
      if (numRow.length > 0) {
        numResults.push(numRow);
      }
    });
    return numResults;
  } else {
    return [];
  }
};

function main() {
  const node = {val: 3, left: {val: 20}, right: {val: 10, right: {val: 5}}};
  console.log(zigzagLevelOrder(node));
}

main();

/**
 * 给你二叉树的根节点 root ，返回其节点值的 锯齿形层序遍历 。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。
 * 根节点视为从左往右，下一层开始从右往左，再下一层开始从左往右，以此类推
 * 树中节点数目在范围 [0, 2000] 内
 * 思路：
 * 先使用BFS遍历，并把相同层的节点存入同一个数组，最后对BFS做处理，下标是奇数的做逆序，最后返回
 */