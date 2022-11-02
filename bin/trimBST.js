/**
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {TreeNode}
 */
var trimBST = function(root, low, high) {
  if (root && root.val >= low && root.val <= high) {
    findAndDelete(root, null, low, high);
  } else if (root && (root.val < low || root.val > high)) {
    if (root.val < low) {
      return trimBST(root.right, low, high);
    } else if (root.val > high) {
      return trimBST(root.left, low, high);
    }
  }
  return root;
};

function findAndDelete(node, parent, lowTarget, highTarget) {
  if (node) {
    const val = node.val;
    if (val < lowTarget || val > highTarget) {
      deleteNode(node, parent, lowTarget, highTarget)
    }
    findAndDelete(node.left, node, lowTarget, highTarget);
    findAndDelete(node.right, node, lowTarget, highTarget);
  }
}

function deleteNode(node, parent, lowTarget, highTarget) {
  if (node) {
    const isLeftChild = parent.left === node;
    if (!node.left && !node.right) {
      if (isLeftChild) {
        parent.left = null;
      } else {
        parent.right = null;
      }
    } else if (node.left || node.right) {
      // 有左右节点时，要判断砍掉哪一侧
      if (node.val < lowTarget) {
        const replace = node.right;
        if (isLeftChild) {
          parent.left = replace;
        } else {
          parent.right = replace;
        }
        if (replace && (replace.val < lowTarget || replace.val > highTarget)) {
          deleteNode(replace, parent, lowTarget, highTarget);
        }
      } else if (node.val > highTarget) {
        const replace = node.left;
        if (isLeftChild) {
          parent.left = replace;
        } else {
          parent.right = replace;
        }
        if (replace && (replace.val < lowTarget || replace.val > highTarget)) {
          deleteNode(replace, parent, lowTarget, highTarget);
        }
      }
    }
  }
}

function test() {
  const node = {
    val: 3,
    left: {val: 0, right: {val: 2, left: {val: 1}}},
    right: {val: 4},
  }
  trimBST(node, 1, 3);
  console.log(node);
}

test();

/**
 * 给你二叉搜索树的根节点root ，同时给定最小边界low和最大边界high。通过修剪二叉搜索树，使得所有节点的值在[low, high]中。
 * 修剪树不应该改变保留在树中的元素的相对结构 (即如果没有被移除，原有的父代子代关系都应当保留)。 可以证明，存在唯一的答案。
 * 所以结果应当返回修剪好的二叉搜索树的新的根节点。注意，根节点可能会根据给定的边界发生改变。
 * 树中节点数在范围 [1, 10^4] 内
 * 0 <= Node.val <= 10^4
 * 树中每个节点的值都是唯一的
 * 题目数据保证输入是一棵有效的二叉搜索树
 * 0 <= low <= high <= 10^4
 *
 * 思路：
 * 其实就是BST的查找和移除，但是要排除low=high=root.val的情况，因为这种情况下答案必定不唯一，因此后续算法不考虑这种场景
 * 另外也不能改变BST的相对结构，因此不能像之前那样删除节点之后从右侧节点中找一个最小的来替代，而只能从左侧或者右侧拉一个节点上来代替它
 * 最后修建不是查找，因此需要对BST做完整遍历，对于所有符合的节点都要做修剪
 * low和high是闭区间，不超出就可以不修剪
 * 对于一个要被删除的节点，如果它大于区间，则从它左侧找，找到一个符合区间的值代替它
 * 注意整体的架构是：dealWithNode; dealWithLeftNode; dealWithRightNode，用前序遍历把BST扫一遍，如果当前节点有问题，递归删除当前节点，删除完成之后左和右还是要扫一遍
 */