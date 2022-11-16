/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  if (nums.length === 0) {
    this._bst = null;
  } else {
    this._bst = buildBST(nums);
  }
  this._target = k;
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  if (this._bst === null) {
    this._bst = {val, left: null, right: null};
  } else {
    addToBST(this._bst, val);
  }
  const resultRef = {value: undefined};
  findTarget(this._bst, this._target, {value: 0}, resultRef);
  return resultRef.value;
};

/**
 * @param {number[]} nums
 * @returns {TreeNode}
 */
function buildBST(nums) {
  const root = {val: nums[0], left: null, right: null};
  nums.forEach((ele, index) => {
    if (index > 0) {
      const val = nums[index];
      addToBST(root, val);
    }
  });
  return root;
}

function addToBST(node, val) {
  if (node) {
    if (val > node.val) {
      if (!node.right) {
        node.right = {val: val, left: null, right: null};
      } else {
        addToBST(node.right, val);
      }
    } else if (val <= node.val) {
      if (!node.left) {
        node.left = {val: val, left: null, right: null};
      } else {
        addToBST(node.left, val);
      }
    }
  }
}

function findTarget(node, k, counterRef, resultRef) {
  if (node) {
    findTarget(node.right, k, counterRef, resultRef);
    counterRef.value++;
    if (counterRef.value === k) {
      resultRef.value = node.val;
    } else if (counterRef.value < k) {
      findTarget(node.left, k, counterRef, resultRef);
    }
  }
}

function test() {
  const obj = new KthLargest(2, [2,1,3]);
  obj.add(4);
  obj.add(6);
  const r = obj.add(0);
  console.log(r);
}

test();


/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 *
 * 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
 * 请实现 KthLargest类：
 * KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
 * int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 * 1 <= k <= 10^4
 * 0 <= nums.length <= 10^4
 * -10^4 <= nums[i] <= 10^4
 * -10^4 <= val <= 10^4
 * 最多调用 add 方法 10^4 次
 * 题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素
 *
 * 思路：
 * 构造一个BST，然后添加元素的时候模拟BST添加操作
 * 最后遍历的时候采用右-根-左，每添加一个元素就计数，计数到N的时候停止遍历并返回
 */
