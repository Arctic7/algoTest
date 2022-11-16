/**
 * @param {TreeNode} root
 * @return {number}
 */
var findSecondMinimumValue = function(root) {
  let row = [root];
  const minVal = root.val;
  let min = Number.POSITIVE_INFINITY;
  let find = false;
  while (true) {
    const newRow = [];
    row.forEach(node => {
      if (node.left) {
        newRow.push(node.left);
      }
      if (node.right) {
        newRow.push(node.right);
      }
    });
    if (newRow.length === 0) {
      break;
    } else {
      newRow.forEach(ele => {
        if (ele.val !== minVal) {
          min = Math.min(min, ele.val);
          find = true;
        }
      });
      row = newRow;
    }
  }
  return find ? min : -1;
};

/**
 * 给定一个非空特殊的二叉树，每个节点都是正数，并且每个节点的子节点数量只能为2或0。
 * 如果一个节点有两个子节点的话，那么该节点的值等于两个子节点中较小的一个。
 * 更正式地说，即root.val = min(root.left.val, root.right.val) 总成立。
 * 给出这样的一个二叉树，你需要输出所有节点中的第二小的值 。
 * 如果第二小的值不存在的话，输出-1。
 * 树中节点数目在范围 [1, 25] 内
 * 1 <= Node.val <= 2^31 - 1
 * 对于树中每个节点 root.val == min(root.left.val, root.right.val)
 *
 * 思路：
 * 应该很容易能猜到根节点是最小的，第二小的就是从第二层开始往下走的
 * 因此是BFS遍历，找到每层的节点，取最小值，如果这个值大于根节点就是它
 * 记得左右两个分支可能会有不同的最小值，因此一定要完整遍历到最后一层才能判断出来
 */