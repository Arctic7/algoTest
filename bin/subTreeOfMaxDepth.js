/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var subtreeWithAllDeepest = function(root) {
  const resultRef = {value: 1};
  getDepth(root, 0, resultRef);
  const maxDepths = [];
  findDepthNode(root, null, 0, resultRef.value, maxDepths);
  return findMutualParent(maxDepths);
};

/**
 * @param {TreeNode} node
 * @param {number} parentDepth
 * @param {{value: number}} resultRef
 */
function getDepth(node, parentDepth, resultRef) {
  if (node) {
    const depth = parentDepth + 1;
    if (depth > resultRef.value) {
      resultRef.value = depth;
    }
    getDepth(node.left, depth, resultRef);
    getDepth(node.right, depth, resultRef);
  }
}

/**
 * @param {TreeNode} node
 * @param {TreeNode} parentNode
 * @param {number} parentDepth
 * @param {number} targetDepth
 * @param {TreeNode[]} resultArr
 */
function findDepthNode(node, parentNode, parentDepth, targetDepth, resultArr) {
  if (node) {
    node.parent = parentNode;
    const depth = parentDepth + 1;
    if (depth === targetDepth) {
      resultArr.push(node);
    } else if (depth < targetDepth) {
      findDepthNode(node.left, node, depth, targetDepth, resultArr);
      findDepthNode(node.right, node, depth, targetDepth, resultArr);
    }
  }
}

/**
 * @param {TreeNode[]} nodes
 * @returns {TreeNode} node
 */
function findMutualParent(nodes) {
  if (nodes.length === 1) {
    return nodes[0];
  } else {
    let isMutual = true;
    let parent;
    let index = 0;
    while(true) {
      if (index >= nodes.length) {
        index = 0;
      }
      const node = nodes[index];
      if (index === 0) {
        parent = node.parent;
      } else {
        isMutual = parent === node.parent;
      }
      nodes[index] = node.parent;
      if ((index === nodes.length - 1) && isMutual) {
        break;
      }
      index++;
    }
    return parent;
  }
}

function test() {
  const root = {val: 1};
  const result = [];
  findDepthNode(root, null, 0, 1, result);
  console.log(findMutualParent(result));
}
test();

/**
 * 给定一个根为root的二叉树，每个节点的深度是 该节点到根的最短距离 。
 * 返回包含原始树中所有 最深节点 的 最小子树 。
 * 如果一个节点在 整个树 的任意节点之间具有最大的深度，则该节点是 最深的 。
 * 一个节点的子树是该节点加上它的所有后代的集合。
 * 树中节点的数量在 [1, 500] 范围内。
 * 0 <= Node.val <= 500
 * 每个节点的值都是 独一无二 的。
 * 思路：
 * 第一步找出树的深度
 * 第二步找出所有自身深度等于树的深度的节点
 * 第三步求它们的最小共同祖先
 * 第三步我的思路是构造一个逆向的指向，对于所有节点来说，把它们添加一个属性指向父节点，然后从根节点到这些节点，视为链表
 * 假设有N个指针指向最深节点，第一次迭代后指针全部移动到它们的父节点，然后判断是否相同，如果全部相同，返回这个父节点，如果不相同，继续移动指针做迭代
 */