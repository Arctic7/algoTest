/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var allPossibleFBT = function(n) {
  if (n % 2 === 0) {
    return [];
  } else {
    const root = createNode();
    n = n - 1;
    if (n > 0) {
      const left = createNode();
      const right = createNode();
      root.left = left;
      root.right = right;
      n = n - 2;
      const choose = [left, right];
      if (n === 2) {
        choose.forEach(node => {
          const left = createNode();
          const right = createNode();
          node.left = left;
          node.right = right;
        });
      } else if (n > 2) {

      }
    }
  }
};

function createNode() {
  return {val: 0, left: null, right: null};
}


/**
 * 给你一个整数 n ，请你找出所有可能含 n 个节点的 真二叉树 ，并以列表形式返回。答案中每棵树的每个节点都必须符合 Node.val == 0 。
 * 答案的每个元素都是一棵真二叉树的根节点。你可以按 任意顺序 返回最终的真二叉树列表。
 * 真二叉树 是一类二叉树，树中每个节点恰好有 0 或 2 个子节点。
 * 1 <= n <= 20
 * 思路：
 * 典型的排列问题，一般思路是这样，从N个可能性中选第一个，然后从剩余可能性中继续选择或遍历，每选一个就记录选择，最后选完了就把所有的选择结果保存下来
 * 就此题来说，核心难点是记录选择，
 *
 */