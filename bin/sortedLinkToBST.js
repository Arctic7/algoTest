import '../typedef/ListNode.js';
import '../typedef/TreeNode.js';
import {createListNode} from './_util.js';

/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  if (head) {
    /** @type {ListNode[]} */
    const arr = [];
    let pointer = head;
    while (pointer) {
      arr.push(pointer);
      pointer = pointer.next;
    }
    if (arr.length === 1) {
      return createNode(arr[0].val);
    } else if (arr.length === 2) {
      const root = createNode(arr[0].val);
      root.right = createNode(arr[1].val);
      return root;
    } else if (arr.length > 2) {
      // 拿到数组之后转单链表
      return createBST(arr, 0, arr.length - 1);
    }
  }
  return null;
};

/**
 *
 * @param {ListNode[]}  nodeArr
 * @param {number} leftIndex
 * @param {number} rightIndex
 * @returns {TreeNode | null}
 */
function createBST(nodeArr, leftIndex, rightIndex) {
  if (leftIndex === rightIndex) {
    return createNode(nodeArr[leftIndex].val);
  } else if (leftIndex < rightIndex) {
    const midIndex = Math.floor((rightIndex + leftIndex) / 2);
    const root = createNode(nodeArr[midIndex].val);
    const left = createBST(nodeArr, leftIndex, midIndex - 1);
    const right = createBST(nodeArr, midIndex + 1, rightIndex);
    root.left = left;
    root.right = right;
    return root;
  } else {
    return null;
  }
}

/**
 * @param {number} nodeVal
 * @returns {TreeNode}
 */
function createNode(nodeVal) {
  return {val: nodeVal, left: null, right: null};
}

function main() {
  const arr = [1,2,3,4,5];
  const node = createListNode(arr);
  console.log(sortedListToBST(node));
}

main();

/**
 * 给定一个单链表的头节点head，其中的元素按升序排序 ，将其转换为高度平衡的二叉搜索树。
 * 本题中，一个高度平衡二叉树是指一个二叉树每个节点的左右两个子树的高度差不超过 1。
 * 输入: head = [-10,-3,0,5,9]
 * 输出: [0,-3,9,-10,null,5]
 * 解释: 一个可能的答案是[0，-3,9，-10,null,5]，它表示所示的高度平衡的二叉搜索树。
 * head 中的节点数在[0, 2 * 104] 范围内
 * -105 <= Node.val <= 105
 *
 * 思路：
 * 单链表转数组，用空间换时间，然后用数组转BST的策略处理
 */
