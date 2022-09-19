import '../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
  if (root) {
    const h = getHeight(root, 1);
    const result = {value: 0, stopFlag: false};
    findMissing(root, 1, h - 1, result);
    const missing = result.value;
    return Math.pow(2, h) - missing - 1;
  }
  return 0;
};

/**
 * @param {TreeNode} root
 * @param {number} h
 * @returns {number}
 */
function getHeight(root, h) {
  if (root) {
    return getHeight(root.left, h + 1);
  } else {
    return h - 1;
  }
}

/**
 * @param {TreeNode} node
 * @param {number} curH
 * @param {number} targetH
 * @param {{value: number, stopFlag: boolean}} result
 */
function findMissing(node, curH, targetH, result) {
  if (node && !result.stopFlag) {
    if (curH === targetH) {
      if (!node.right) {
        result.value++;
      }
      if (!node.left) {
        result.value++;
      }
      if (node.right || node.left) {
        result.stopFlag = true;
      }
    } else if (curH < targetH) {
      if (node.right) {
        findMissing(node.right, curH + 1, targetH, result);
      }
      if (node.left) {
        findMissing(node.left, curH + 1, targetH, result);
      }
    }
  }
}

/**
 * 给你一棵 完全二叉树 的根节点 root ，求出该树的节点个数。
 * 完全二叉树 的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。
 * 若最底层为第 h 层，则该层包含 1~2^h个节点。
 * 树中节点的数目范围是[0, 5 * 10^4]
 * 0 <= Node.val <= 5 * 10^4
 * 题目数据保证输入的树是完全二叉树
 * 进阶：遍历树来统计节点是一种时间复杂度为 O(n) 的简单解决方案。你可以设计一个更快的算法吗？
 *
 * 思路：
 * 只要确定最后一层的节点数量就可以了。所以可以采用根-右-左的遍历顺序来处理，但是需要知道二叉树节点的高度
 * 然后从根节点开始，按照根-右-左的顺序走，当走到h - 1的位置时，开始统计子节点缺失的数量，当遇到子节点不缺失（即存在）时停止
 */