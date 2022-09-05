import '../typedef/TreeNode.js';
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  const memObj = {
    prev: null,
    swap1: null,
    swap2: null,
    current: null,
  };
  traverse(root, memObj);
  if (!memObj.swap2) {
    memObj.swap2 = memObj.current;
  }
  const temp = memObj.swap1.val;
  memObj.swap1.val = memObj.swap2.val;
  memObj.swap2.val = temp;
};

/**
 * @param {TreeNode | null} node
 * @param {{prev: TreeNode | null; swap1: TreeNode | null; swap2: TreeNode | null, current: TreeNode | null}} memObj
 */
function traverse(node, memObj) {
  if (node) {
    memObj.current = node;
    traverse(node.left, memObj);
    // deal with current node
    if (memObj.prev) {
      // compare prev and current
      const val1 = memObj.prev.val;
      const val2 = node.val;
      if (val2 < val1) {
        if (!memObj.swap1) {
          memObj.swap1 = memObj.prev;
          memObj.swap2 = node;
        } else if (memObj.swap2) {
          memObj.swap2 = node;
        }
      }
    }
    memObj.prev = node;
    traverse(node.right, memObj);
  }
}


function main() {
  const tree = {val: 4, left: {val:1}, right: {val: 3, right: {val:2}}};
  recoverTree(tree);
  console.log(tree);
}

main();


/**
 * 给你二叉搜索树的根节点 root ，该树中的 恰好 两个节点的值被错误地交换。请在不改变其结构的情况下，恢复这棵树 。
 * 树上节点的数目在范围 [2, 1000] 内
 * -231 <= Node.val <= 231 - 1
 * 你能想出一个只使用 O(1) 空间的解决方案吗？
 * 思路：
 * 节点只做值交换，不交换内存地址
 * 使用中序遍历，把二叉树转为数组，然后找数组内存在的两个不符合的元素，是一种解法，但是空间复杂度是O(n)
 * 空间复杂度O(1)的解法，依然是基于中序遍历，但是只保留上一个结果和当前结果
 * 中序遍历获得的数组内，有两个元素交换了位置，因此可以两两比较，第一次下降的值的前一个值，和最后一次下降的值，就是交换的元素
 * 比如正常的BST中序结果是1234，如果交换一次，可以是1324，或1432，第一次下降的值的前一个值，和最后一次下降的值，就是交换了的元素
 */