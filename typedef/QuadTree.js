/**
 * @typedef QuadTree
 * @property {boolean} val
 * @property {boolean} isLeaf
 * @property {QuadTree | null} topLeft
 * @property {QuadTree | null} topRight
 * @property {QuadTree | null} bottomLeft
 * @property {QuadTree | null} bottomRight
 */

/**
 * @param {boolean} val
 * @returns {QuadTree} 生成好的四叉树
 */
function buildRootQuadTree(val) {
  return {isLeaf: true, val: val, topLeft: null, topRight: null, bottomLeft: null, bottomRight: null};
}

/**
 * @param {boolean} rootVal
 * @param {QuadTree} topLeft
 * @param {QuadTree} topRight
 * @param {QuadTree} bottomLeft
 * @param {QuadTree} bottomRight
 * @returns {QuadTree} 生成好的四叉树
 */
function buildNormalQuadTree(rootVal, topLeft, topRight, bottomLeft, bottomRight) {
  return {val: rootVal, isLeaf: false, topLeft, topRight, bottomLeft, bottomRight};
}

export {buildRootQuadTree, buildNormalQuadTree};