import '../typedef/ListNode.js';
import '../typedef/HoriNode.js';

/**
 * 数组转单链表
 * @param {number[]} arr
 * @returns {ListNode | null}
 */
function createListNode(arr) {
  if (arr.length > 0) {
    const head = createSingleListNode(arr[0]);
    let pointer = head;
    for (let i = 1; i < arr.length; i++) {
      const next = createSingleListNode(arr[i]);
      pointer.next = next;
      pointer = next;
    }
    return head;
  } else {
    return null;
  }
}

/**
 * 创建单独的链表节点
 * @param {number} val
 * @returns {ListNode}
 */
function createSingleListNode(val) {
  return {val: val, next: null};
}

/**
 * 创建带有next指针的Node
 * @param {number} val
 * @returns {HoriNode}
 */
function createHoriNode(val) {
  return {val: val, left: null, right: null, next: null};
}

export {createSingleListNode, createListNode, createHoriNode};