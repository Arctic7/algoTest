import '../../typedef/TreeNode.js';

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {
  if (preorder.length === 1) {
    return {val: preorder[0], left: null, right: null};
  } else if (preorder.length > 1) {
    // 用哈希表记录每个元素的前序下标和中序下标
    /** @type {Map<string, number[]>} */
    const locationMap = new Map();
    preorder.forEach((ele, index) => {
      locationMap.set(String(ele), [index]);
    });
    inorder.forEach((ele, index) => {
      const locationArr = locationMap.get(String(ele));
      locationArr.push(index);
    });
    // 拿到locationMap之后，每个元素的查找其前序和中序的下标就很方便了
    const root = createNode(preorder[0]);
    findChildren(root, locationMap, 0, preorder.length - 1, preorder);
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
 *
 * @param {TreeNode} node
 * @param {Map<string, number[]>} locationMap
 * @param {number} inOrderLeft 节点在中序的左子节点范围
 * @param {number} inOrderRight 节点在中序的右子节点范围
 * @param {number[]} preorder
 */
function findChildren(node, locationMap, inOrderLeft, inOrderRight, preorder) {
  if (node && inOrderLeft < inOrderRight) {
    // 确定当前节点在中序的位置
    const nodeLocations = locationMap.get(String(node.val));
    const hasLeft = nodeLocations[1] > inOrderLeft;
    if (hasLeft) {
      // 如果当前节点有左节点，则它在前序位置的后一个位置就是左节点位置
      const leftIndex = nodeLocations[0] + 1;
      if (leftIndex < preorder.length) {
        node.left = createNode(preorder[leftIndex]);
      }
    }
    const hasRight = nodeLocations[1] < inOrderRight;
    if (hasRight) {
      // 如果当前节点有右节点，则从它在前序的位置开始，跳过它的左子数量，就可以得到它的右节点
      const leftChildrenCount = nodeLocations[1] - inOrderLeft;
      const rightChildIndex = nodeLocations[0] + leftChildrenCount + 1;
      if (rightChildIndex < preorder.length) {
        node.right = createNode(preorder[rightChildIndex]);
      }
    }
    // 左右都搞定之后，递归左节点和右节点
    findChildren(node.left, locationMap, inOrderLeft, nodeLocations[1] - 1, preorder);
    findChildren(node.right, locationMap, nodeLocations[1] + 1, inOrderRight, preorder);
  }
}

function main() {
  const preorder = [1,2,4,3];
  const inorder = [2,4,1,3];
  console.log(buildTree(preorder, inorder));
}

main();

/**
 * 给定两个整数数组preorder 和 inorder，其中preorder 是二叉树的先序遍历， inorder是同一棵树的中序遍历，请构造二叉树并返回其根节点。
 * 1 <= preorder.length <= 3000
 * inorder.length == preorder.length
 * -3000 <= preorder[i], inorder[i] <= 3000
 * preorder和inorder均无重复元素
 * inorder均出现在preorder
 * preorder保证为二叉树的前序遍历序列
 * inorder保证为二叉树的中序遍历序列
 *
 * 思路：
 * 前序第一个值是根节点，之后的值，分为左干和右干。第二个值一定是左分支节点或者右分支节点，可以根据中序结果拿到
 * 中序遍历，数组的第一部分是左干，然后是根节点，然后是右干，左干的元素数量，从前序中位移相同距离后，下一个就是右分支节点
 * 所以操作是，先确定根，然后根在中序的位置，确定根的左和右节点，然后把左和右作为新的根，递归这个过程，注意及时更新下标范围
 * 下标范围一般用闭区间代替，当确定了左和右在中序的位置后，要把各自的闭区间范围移除根的位置，即根左分支的范围是根的左范围到根的前一个位置
 * 根右分支的范围是根的后一个位置到右范围
 */