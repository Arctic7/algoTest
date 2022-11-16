/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (nums.length === 1) {
    return createTreeNode(nums[0]);
  } else {
    const startIndex = 0;
    const endIndex = nums.length - 1;
    return buildNode(nums, startIndex, endIndex);
  }
};

function buildNode(arr, startIndex, endIndex) {
  if (startIndex > endIndex) {
    return null;
  } else {
    const maxIndex = findMaxIndex(arr, startIndex, endIndex);
    if (maxIndex !== -1) {
      const node = createTreeNode(arr[maxIndex]);
      const leftNode = buildNode(arr, startIndex, maxIndex - 1);
      const rightNode = buildNode(arr, maxIndex + 1, endIndex);
      node.left = leftNode;
      node.right = rightNode;
      return node;
    } else {
      return null;
    }
  }
}

function findMaxIndex(arr, startIndex, endIndex) {
  if (startIndex <= endIndex) {
    let max = arr[startIndex];
    let maxIndex = startIndex;
    for (let i = startIndex; i <= endIndex; i++) {
      const ele = arr[i];
      if (ele > max) {
        max = ele;
        maxIndex = i;
      }
    }
    return maxIndex;
  }
  return -1;
}

function createTreeNode(val) {
  return {val, left: null, right: null};
}

function test() {
  const arr = [1,3,5,4];
  console.log(constructMaximumBinaryTree(arr));
}

test();

/**
 * 给定一个不重复的整数数组nums，最大二叉树可以用下面的算法从nums递归地构建:
 * 创建一个根节点，其值为nums中的最大值。
 * 递归地在最大值左边的子数组前缀上构建左子树。
 * 递归地在最大值右边的子数组后缀上构建右子树。
 * 返回nums构建的最大二叉树。
 *
 * 1 <= nums.length <= 1000
 * 0 <= nums[i] <= 1000
 * nums 中的所有整数 互不相同
 *
 * 思路：
 * 简单来说就是给定一个数组找最大值，然后把最大值的左侧看作是左树范围，右侧看作是右树范围
 * 然后递归这个过程，从左树内找最大的，其左右构造它的子树，从右侧找最大的，其左右构造它的子树
 * 递归的时候注意控制一下查找范围就可以了
 */