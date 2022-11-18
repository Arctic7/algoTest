/**
 * @param {TreeNode} root
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function(root, voyage) {
  const iterator = {value: 0};
  const flipped = [];
  const r = traverse(root, voyage, iterator, flipped);
  if (r) {
    return flipped;
  } else {
    return [-1];
  }
};

/**
 * 进入函数的时候iterator的指针就是已经指向当前节点了，需要做判断，然后递归到子节点，需要在递归前调整指针
 * @param {TreeNode} node
 * @param {number[]} preorder
 * @param {{value: number}} iterator
 * @param {number[]} flipped
 * @returns {boolean} true表示仍处于可控的翻转状态，false表示出现不可调和的矛盾，注定不能翻转成功
 */
function traverse(node, preorder, iterator, flipped) {
  let result = true;
  if (node) {
    const nodeVal = node.val;
    const curStop = preorder[iterator.value];
    result = nodeVal === curStop;
    if (result) {
      // 单节点时不翻转了
      if ((node.left || node.right) && (!node.left || !node.right)) {
        const singleChild = node.left || node.right;
        iterator.value++;
        result = traverse(singleChild, preorder, iterator, flipped);
      } else if (node.left && node.right) {
        // 双节点
        iterator.value++;
        const next = preorder[iterator.value];
        let match = false;
        if (next === node.left.val) {
          // 不翻转
          match = true;
        } else if (next === node.right.val) {
          // 需要翻转
          const left = node.left;
          node.left = node.right;
          node.right = left;
          // 保存子节点被翻转了的父节点
          flipped.push(nodeVal);
          match = true;
        }
        if (match) {
          // 左右有一方能用于后续迭代时，继续，否则终止
          result = traverse(node.left, preorder, iterator, flipped);
          // 迭代右节点之前一定要更新指针
          iterator.value++;
          result = result && traverse(node.right, preorder, iterator, flipped);
        } else {
          result = false;
        }
      }
    }
  }
  return result;
}

function test() {
  const root = {
    val: 1,
    left: {val: 2},
    right: {val: 3, left: {val: 5,}, right: {val: 6}},
  };
  const preorder = [1,3,6,5,2];
  console.log(flipMatchVoyage(root, preorder));
}

test();

/**
 * 给你一棵二叉树的根节点 root ，树中有 n 个节点，每个节点都有一个不同于其他节点且处于 1 到 n 之间的值。
 * 另给你一个由 n 个值组成的行程序列 voyage ，表示 预期 的二叉树 先序遍历 结果。
 * 通过交换节点的左右子树，可以 翻转 该二叉树中的任意节点。例，翻转节点 1 的效果如下：
 * 请翻转 最少 的树中节点，使二叉树的 先序遍历 与预期的遍历行程voyage相匹配。
 * 如果可以，则返回 翻转的 所有节点的值的列表。你可以按任何顺序返回答案。如果不能，则返回列表 [-1]。
 * 树中的节点数目为 n，n == voyage.length
 * 1 <= n <= 100
 * 1 <= Node.val, voyage[i] <= n
 * 树中的所有值互不相同
 * voyage中的所有值互不相同
 *
 * 思路：
 * 注意返回的是翻转的节点的值的数组，即如果翻转了3个节点，则返回这三个节点的值的数组
 * 这个题目是要求对二叉树翻转至少1次，以匹配给定的先序遍历结果，如果二叉树本身就是先序遍历结果，或者翻转多少次都满足不了这个结果，则返回[-1]
 * 从根节点开始，逐个对比当前节点和先序遍历结果
 * 先比较根节点，再比较左右节点
 * 如果根节点不一致，则直接返回false，表示不能靠翻转匹配
 * 如果根节点一致，继续比较左右节点，如果左右节点不一致，尝试翻转来匹配
 * 如果翻转后匹配成功，则保留这个翻转并继续遍历
 * 如果翻转后匹配还是失败，则返回false，表示不能靠翻转匹配
 * 每次翻转后把翻转了的节点值存下来
 * 最后判断一下翻转了多少节点，如果一个都没有，返回false，否则返回翻转了的节点集合
 * 暂时有一个情况不清楚，比如单节点的情况，只有一侧时，翻转或者不翻转都能符合先序遍历结果，此时要算可翻转还是算不可翻转呢？
 */