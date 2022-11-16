/**
 * @param {TreeNode} root
 * @param {number} val
 * @param {number} depth
 * @return {TreeNode}
 */
var addOneRow = function(root, val, depth) {
  if (depth === 1) {
    const newRoot = createNode(val);
    newRoot.left = root;
    return newRoot;
  } else if (depth > 1) {
    const queue = [];
    let index = 0;
    queue.push([root]);
    while (index < queue.length) {
      // 每轮循环开始前，判断一下是否到depth的上一层了
      // depth为3，上一层是2，对应根节点index=1，所以depth和index相差为2就是对的
      if (index === depth - 2) {
        const parents = queue[index];
        parents.forEach(parent => {
          const left = parent.left;
          const right = parent.right;
          const newLeft = createNode(val);
          const newRight = createNode(val);
          parent.left = newLeft;
          newLeft.left = left;
          parent.right = newRight;
          newRight.right = right;
        });
        break;
      } else {
        const row = queue[index];
        const newRow = [];
        row.forEach(node => {
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
    }
    return root;
  }
};

/**
 * @param {number} val
 * @return {TreeNode}
 */
function createNode(val) {
  return {val: val, left: null, right: null};
}

/**
 * 给定一个二叉树的根root和两个整数，val和depth，在给定的深度depth处添加一个值为 val 的节点行。
 * 注意，根节点root位于深度1。
 * 加法规则如下:
 * 给定整数depth，对于深度为depth - 1 的每个非空树节点 cur ，创建两个值为 val 的树节点作为 cur 的左子树根和右子树根。
 * cur 原来的左子树应该是新的左子树根的左子树。
 * cur 原来的右子树应该是新的右子树根的右子树。
 * 如果 depth == 1 意味着depth - 1根本没有深度，那么创建一个树节点，值 val 作为整个原始树的新根，而原始树就是新根的左子树。
 * 节点数在[1, 10^4]范围内
 * 树的深度在[1, 10^4]范围内
 * -100 <= Node.val <= 100
 * -10^5<= val <= 10^5
 * 1 <= depth <= the depth of tree + 1
 *
 * 思路：
 * 简单来说是在树中的某一行插入N个节点，节点值都是val，然后当前这一行的节点全部作为这N个节点的子节点
 * 如果在根节点插入，则根节点下移，新增一个节点作为新的根节点，它的左子指向原根节点
 * 非根节点插入，先找到上一层，对上一层的所有节点，其左右都加上val节点，然后上一层的所有节点，原来的左右关系，被新的val节点代替
 * 可以用BFS来处理，先对树进行BFS存储，然后每次取出一层，最后拿到depth的上一层的节点就好了
 */