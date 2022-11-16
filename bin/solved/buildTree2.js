import '../../typedef/TreeNode.js';

/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  if (postorder.length === 1) {
    return {val: postorder[0], left: null, right: null};
  } else if (postorder.length > 1) {
    // 用哈希表记录每个元素的后序下标和中序下标，value内第一个元素是后续下标，第二个是中序下标
    /** @type {Map<string, number[]>} */
    const locationMap = new Map();
    postorder.forEach((ele, index) => {
      locationMap.set(String(ele), [index]);
    });
    inorder.forEach((ele, index) => {
      const locationArr = locationMap.get(String(ele));
      locationArr.push(index);
    });
    // 然后开始逐个定位节点左和节点右
    const root = createNode(postorder[postorder.length - 1]);
    findChildren(root, locationMap, 0, inorder.length - 1, postorder);
    return root;
  }
};

/**
 *
 * @param {number} nodeVal
 * @returns {TreeNode}
 */
function createNode(nodeVal) {
  return {val: nodeVal, left: null, right: null};
}

/**
 * @param {TreeNode} node
 * @param {Map<string, number[]>} locationMap
 * @param {number} inorderLeftRange
 * @param {number} inorderRightRange
 * @param {number[]} postorder
 */
function findChildren(node, locationMap, inorderLeftRange, inorderRightRange, postorder) {
  if (node && inorderLeftRange < inorderRightRange) {
    const location = locationMap.get(String(node.val));
    const postorderIndex = location[0];
    const inorderIndex = location[1];
    // 因为是后序遍历，所以要先从根右开始，先确定当前节点的右分支
    const hasRight = inorderIndex < inorderRightRange;
    let rightCount = 0;
    if (hasRight) {
      node.right = createNode(postorder[postorderIndex - 1]);
      rightCount = inorderRightRange - inorderIndex;
    }
    const hasLeft = inorderIndex > inorderLeftRange;
    if (hasLeft) {
      // 当前节点在后续的位置，左移右节点的数量，再左移一个位置，就是左节点的位置
      const leftIndex = postorderIndex - rightCount - 1;
      if (leftIndex >= 0) {
        node.left = createNode(postorder[leftIndex]);
      }
    }
    findChildren(node.left, locationMap, inorderLeftRange, inorderIndex - 1, postorder);
    findChildren(node.right, locationMap, inorderIndex + 1, inorderRightRange, postorder);
  }
}

function main() {
  const inorder = [4,2,5,1,6,3,7];
  const postorder = [4,5,2,6,7,3,1];
  console.log(buildTree(inorder, postorder));
}

main();

/**
 * 给定两个整数数组 inorder 和 postorder ，其中 inorder 是二叉树的中序遍历， postorder 是同一棵树的后序遍历，请你构造并返回这颗二叉树。
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * postorder和inorder均无重复元素
 * inorder均出现在postorder
 * postorder保证为二叉树的后序遍历序列
 * inorder保证为二叉树的中序遍历序列
 *
 * 思路：
 * 参考根据前序和中序遍历的步骤
 * 中序依然是左-根-右结构
 * 后续的最后一个元素一定是根，它的结构是左-右-根，且左的最后一个元素，右的最后一个元素，分别对应根的左右节点
 * 所以步骤依然是先确定根，然后根据根，在中序内确定左和右的数量，然后在后续内找到左的数量，最后一个元素确定为根左，右的数量，最后一个元素确定为根右
 */