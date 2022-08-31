import '../typedef/TreeNode.js';

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function(n) {
  if (n === 1) {
    const root = {val: 1, left: null, right: null};
    return [root];
  } else if (n === 2) {
    const root1 = {val: 1, left: null, right: {val: 2, left: null, right: null}};
    const root2 = {val: 2, left: {val: 1, left: null, right: null}, right: null};
    return [root1, root2];
  } else if (n > 2) {
    const result = [];
    for (let i = 1; i <= n; i++) {
      const root = createNode(i);
      const exclude = new Set();
      exclude.add(i);
      insertNext(root, n, exclude, result);
    }
    return result;
  }
};

/**
 *
 * @param {number} val
 * @returns {TreeNode}
 */
function createNode(val) {
  return {val: val, left: null, right: null};
}

/**
 * 找出可用的集合，把每个元素插入到BST内
 * @param {TreeNode} node
 * @param {number} n
 * @param {Set<number>} exclude
 * @param {TreeNode[]} resultArr
 */
function insertNext(node, n, exclude, resultArr) {
  if (exclude.size === n) {
    let exist = false;
    resultArr.every(ele => {
      if (nodeCompare(ele, node)) {
        exist = true;
      }
      return !exist;
    });
    if (!exist) {
      resultArr.push(node);
    }
  } else if (exclude.size < n) {
    for (let i = 1; i <= n; i++) {
      if (!exclude.has(i)) {
        // 此元素可以插入BST
        const clone = nodeClone(node);
        insertNode(clone, i);
        const excludeClone = setClone(exclude);
        excludeClone.add(i);
        insertNext(clone, n, excludeClone, resultArr);
      }
    }
  }
}

/**
 * 二叉树完整复制
 * @param {TreeNode | null} treeNode
 * @returns {TreeNode | null}
 */
function nodeClone(treeNode) {
  if (treeNode) {
    const cloneRoot = {val: treeNode.val};
    const cloneLeft = nodeClone(treeNode.left);
    const cloneRight = nodeClone(treeNode.right);
    cloneRoot.left = cloneLeft;
    cloneRoot.right = cloneRight;
    return cloneRoot;
  } else {
    return null;
  }
}

/**
 * @param {Set} rawSet
 * @returns {Set}
 */
function setClone(rawSet) {
  return new Set(Array.from(rawSet));
}

/**
 * @param {TreeNode} node
 * @param {number} num
 */
function insertNode(node, num) {
  const nodeVal = node.val;
  if (num < nodeVal) {
    if (!node.left) {
      node.left = createNode(num);
    } else {
      insertNode(node.left, num);
    }
  } else if (num > nodeVal) {
    if (!node.right) {
      node.right = createNode(num);
    } else {
      insertNode(node.right,num);
    }
  }
}

/**
 * 比较两个树是否相同
 * @param {TreeNode} node1
 * @param {TreeNode} node2
 * @returns {boolean} true表示两个树相同
 */
function nodeCompare(node1, node2) {
  if (node1 == null && node2 == null) {
    return true;
  } else if ((node1 == null && node2 != null) || (node1 != null && node2 == null)) {
    return false;
  } else if (node1 != null && node2 != null) {
    const r1 = node1.val === node2.val;
    if (r1) {
      return nodeCompare(node1.left, node2.left) && nodeCompare(node1.right, node2.right);
    } else {
      return r1;
    }
  }
}

function main() {
  const r = generateTrees(3);
  console.log(r.length);
  console.log(r);
}

main();

/**
 * 给你一个整数 n ，请你生成并返回所有由 n 个节点组成且节点值从 1 到 n 互不相同的不同 二叉搜索树 。可以按 任意顺序 返回答案。
 * 1 <= n <= 8
 * 思路：
 * 二叉树的遍历，需要遵守BST的规则，从根节点开始构建。由于每个节点值是唯一的，因此只要每次选择不同，就能构建出不同的BST
 * 构造出N个只有根节点的BST，然后对每个BST，遍历剩余N-1个元素，取出一个，插入到BST内，BST的插入过程和遍历是类似的
 * 当所有元素都用完的时候，这个BST就构造完成了，最后判断一下是否和已存入的BST相同（需要判断两个BST是否相同），如果都不相同，再存入结果集合
 */