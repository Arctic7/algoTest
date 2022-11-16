/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isCompleteTree = function(root) {
  let row = [root];
  let hasEmpty = false;
  let result = true;
  while (true) {
    const newRow = [];
    row.forEach(node => {
      if (node.left) {
        newRow.push(node.left);
      } else {
        newRow.push(null);
      }
      if (node.right) {
        newRow.push(node.right);
      } else {
        newRow.push(null);
      }
      if (!hasEmpty) {
        hasEmpty = !node.left || !node.right;
      }
    });
    // 遍历完成后判断null的出现位置
    if (hasEmpty) {
      let firstNullIndex = -1;
      newRow.every((ele, index) => {
        if (ele!== null && (ele.left || ele.right)) {
          result = false;
        } else {
          if (firstNullIndex === -1 && ele === null) {
            firstNullIndex = index;
          }
          if (firstNullIndex > -1 && index > firstNullIndex && ele !== null) {
            result = false;
          }
        }
        return result;
      });
      break;
    }
    row = newRow;
  }
  // 假设停止的这一行是正常的
  return result;
};

/**
 * 给定一个二叉树的root，确定它是否是一个完全二叉树。
 * 在一个完全二叉树中，除了最后一个层级外，所有层级都是完全被填满的，并且最后一个层级中的所有节点都是尽可能靠左的。它可以包含1到2h节点之间的最后一级h。
 * 树的结点数在范围  [1, 100] 内。
 * 1 <= Node.val <= 1000
 *
 * 思路：
 * 简单的BFS遍历，但是注意遍历过程中要记录缺失的情况，比如缺失左或者右
 * 当发现缺失之后，存入null，最后判断null出现的位置，以及如果有null，则后续都必须是null，如果不是null则视为异常
 * 如果当前这一行是正常的但是出现了缺损，则还要做最后一次判断，即视为当前这一行是最后一行，每个元素不能有子元素，如果有则视为异常
 */