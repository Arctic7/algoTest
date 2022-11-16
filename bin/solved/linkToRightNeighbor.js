/**
 * @typedef Node
 * @property {number} val
 * @property {Node | null} [left]
 * @property {Node | null} [right]
 * @property {Node | null} [next]
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (root) {
    /** @type {Node[][]} */
    const bfsArr = [];
    bfsArr.push([root]);
    let index = 0;
    while (index < bfsArr.length) {
      const nodeRow = bfsArr[index];
      /** @type {Node[]} */
      const nextRow = [];
      nodeRow.forEach(node => {
        const left = node.left;
        const right = node.right;
        if (left) {
          nextRow.push(left);
        }
        if (right) {
          nextRow.push(right);
        }
      });
      if (nextRow.length > 0) {
        bfsArr.push(nextRow);
      }
      index++;
    }
    // BFS完成后，遍历每一行，把下标i节点的next指向下标i + 1节点
    bfsArr.forEach(nodeRow => {
      for (let i = 0; i < nodeRow.length; i++) {
        if (i + 1 < nodeRow.length) {
          nodeRow[i].next = nodeRow[i + 1];
        }
      }
    });
  }
  return root;
};

/**
 * 给定一个完美二叉树，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：
 * struct Node {
 *   int val;
 *   Node *left;
 *   Node *right;
 *   Node *next;
 * }
 * 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 初始状态下，所有next 指针都被设置为 NULL。
 * 树中节点的数量在 [0, 212 - 1] 范围内
 * -1000 <= node.val <= 1000
 *
 * 思路：
 * 直接BFS遍历，记录一下层号，相同层号的节点按从左到右的顺序存储，最后遍历每一层，对下标是i的节点，让其next指向下标是i + 1的节点
 * 此算法对于非完全二叉树也有用
 */