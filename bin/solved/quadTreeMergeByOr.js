/**
 * @typedef Node
 * @property {boolean} val
 * @property {boolean} isLeaf
 * @property {Node | null} topLeft
 * @property {Node | null} topRight
 * @property {Node | null} bottomLeft
 * @property {Node | null} bottomRight
 */

/**
 * @param {Node} quadTree1
 * @param {Node} quadTree2
 * @return {Node}
 */
var intersect = function(quadTree1, quadTree2) {
  if (quadTree1.isLeaf === true && quadTree2.isLeaf === true) {
    return buildRootQuadTree(quadTree1.val || quadTree2.val);
  } else if ((quadTree1.isLeaf && quadTree1.val === true) || (quadTree2.isLeaf && quadTree2.val === true)){
    return buildRootQuadTree(true);
  } else {
    const topLeft = intersect(getQuadTreeChild(quadTree1, 'topLeft'), getQuadTreeChild(quadTree2, 'topLeft'));
    const topRight = intersect(getQuadTreeChild(quadTree1, 'topRight'), getQuadTreeChild(quadTree2, 'topRight'));
    const bottomLeft = intersect(getQuadTreeChild(quadTree1, 'bottomLeft'), getQuadTreeChild(quadTree2, 'bottomLeft'));
    const bottomRight = intersect(getQuadTreeChild(quadTree1, 'bottomRight'), getQuadTreeChild(quadTree2, 'bottomRight'));
    if (
      topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf
      && topLeft.val === topRight.val && bottomLeft.val === bottomRight.val && topLeft.val === bottomLeft.val
    ) {
      return buildRootQuadTree(topLeft.val);
    } else {
      return {val: topLeft.val, isLeaf: false, topLeft, topRight, bottomLeft, bottomRight};
    }
  }
};

/**
 * @param {boolean} val
 * @returns {Node}
 */
function buildRootQuadTree(val) {
  return {isLeaf: true, val: val, topLeft: null, topRight: null, bottomLeft: null, bottomRight: null};
}

/**
 * @param {Node} node
 * @param {string} part
 * @returns {Node}
 */
function getQuadTreeChild(node, part) {
  if (node.isLeaf === true) {
    return buildRootQuadTree(node.val);
  } else {
    let childNode;
    switch (part) {
      case 'topLeft':
        childNode = node.topLeft;
        break;
      case 'topRight':
        childNode = node.topRight;
        break;
      case 'bottomLeft':
        childNode = node.bottomLeft;
        break;
      case 'bottomRight':
        childNode = node.bottomRight;
        break;
    }
    return childNode;
  }
}


/**
 * 给你两个四叉树，quadTree1 和 quadTree2。其中 quadTree1 表示一个 n * n 二进制矩阵，而 quadTree2 表示另一个 n * n 二进制矩阵。
 * 请你返回一个表示 n * n 二进制矩阵的四叉树，它是 quadTree1 和 quadTree2 所表示的两个二进制矩阵进行 按位逻辑或运算 的结果。
 * 注意，当 isLeaf 为 False 时，你可以把 True 或者 False 赋值给节点，两种值都会被判题机制接受。
 * n == 2^x ，其中 0 <= x <= 9。
 *
 * 思路：
 * 这个题目就是给出两个大小一样的四叉树，然后求它们的矩阵表示结果的或运算，然后这个或运算也要以四叉树的形式表示
 * 注意val是boolean格式，另外四个节点不能少，如果没有，用null表示
 * 核心原则是不要把四叉树转为矩阵去比较，而是直接从根节点开始运算，可以假设如果两个树的根节点isLeaf都是true，则就不用拆分了，直接把它们的val做或运算即可
 * 如果一个根节点isLeaf=false，则另一个不管是不是true，都要开始拆分，两者都拆为四个象限，然后分别计算
 * 如果这四个象限还是无法一次得出，则把每个象限的计算视为新的根节点运算，采用递归的方式继续拆分，直到拿到结果，然后返回。
 * 如果两个四叉树中某一个全是1，则不用拆分了，直接返回全是1的结果，因为是或运算
 * 最后合并的时候注意，只有当四个象限全部是叶子节点，且它们的值都相同时，才能合并为一个新的叶子节点，否则即使全部是叶子节点但值不相同，依然合并为根节点
 */