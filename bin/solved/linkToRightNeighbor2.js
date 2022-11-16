import '../../typedef/HoriNode.js';
import {createHoriNode} from '../_util.js';

/**
 * @param {HoriNode} root
 * @return {HoriNode}
 */
var connect = function(root) {
  if (root) {
    connectNode(root.left, root, true);
    connectNode(root.right, root, false);
    connect(root.right);
    connect(root.left);
  }
  return root;
};

/**
 * @param {HoriNode | null} node1
 * @param {HoriNode | null} node2
 */
function connectNode(child, parent, isLeftNode) {
  if (child) {
    let findHorizontal = false;
    // 如果子节点是左节点，先尝试和兄弟右节点连接，其次尝试找父节点的下一个节点的左或右，如果没有，则继续找父节点的next的左或右
    if (isLeftNode) {
      const right = parent.right;
      if (right) {
        child.next = right;
      } else {
        findHorizontal = true;
      }
    } else {
      findHorizontal = true;
    }
    if (findHorizontal) {
      let next = parent.next;
      let hasChildren = false;
      while (next) {
        hasChildren = !!(next.left || next.right);
        if (hasChildren) {
          const nextChild = next.left || next.right;
          child.next = nextChild;
          break;
        } else {
          next = next.next;
        }
      }
    }
  }
}


function main() {
  const root = createHoriNode(1);
  root.left = createHoriNode(2);
  root.right = createHoriNode(3);
  root.left.left = createHoriNode(4);
  root.left.right = createHoriNode(5);
  root.right.right = createHoriNode(6);
  root.left.left.left = createHoriNode(7);
  root.right.right.right = createHoriNode(8);
  connect(root);
  console.log(root.left.left.left);
}

main();


/**
 * 给定一个二叉树（不是满二叉树，就是一般的那种），填充它的每个 next 指针，让这个指针指向其下一个右侧节点。
 * 如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
 * 初始状态下，所有next指针都被设置为 NULL。
 * 你只能使用常量级额外空间。
 * 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
 * 树中的节点数小于 6000
 * -100 <= node.val <= 100
 *
 * 思路：
 * 直接使用BFS可以轻松解决
 * 还可以使用递归处理，核心思路是利用父子关系，和父节点的next指向，实现模拟BFS的递归操作
 * 比如给定左节点和父节点，则左节点的next指向父节点的右节点，如果右节点不存在，则找父节点的next节点的左和右，直到父节点这一侧的next节点都被找完
 * 最后的递归采用根 - 右 - 左的顺序，先确定好右分支的所有next指向，这样左分支的next指向就不会出现明明有但是指向不到的情况
 */