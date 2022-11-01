/**
 * @param {TreeNode} root
 * @return {string[][]}
 */
var printTree = function(root) {
  const h = findHeight(root, 1);
  const matrix = new Array(h);
  matrix.fill('');
  matrix.forEach((ele, index) => {
    const row = new Array(Math.pow(2, h) - 1);
    row.fill('');
    matrix[index] = row;
  });
  const initRowIndex = 0;
  const initColIndex = (matrix[0].length - 1) / 2;
  matrix[initRowIndex][initColIndex] = String(root.val);
  traverse(root, initRowIndex, initColIndex, matrix);
  return matrix;
};

function findHeight(node, prevH) {
  if (node) {
    const left = findHeight(node.left, prevH + 1);
    const right = findHeight(node.right, prevH + 1);
    return Math.max(left, right);
  } else {
    return prevH - 1;
  }
}

function traverse(node, nodeRowIndex, nodeColIndex, matrix) {
  if (node) {
    if (node.left) {
      const rowIndex1 = nodeRowIndex + 1;
      const colIndex1 = nodeColIndex - Math.pow(2, matrix.length - nodeRowIndex - 2);
      matrix[rowIndex1][colIndex1] = String(node.left.val);
      traverse(node.left, rowIndex1, colIndex1, matrix);
    }
    if (node.right) {
      const rowIndex2 = nodeRowIndex + 1;
      const colIndex2 = nodeColIndex + Math.pow(2, matrix.length - nodeRowIndex - 2);
      matrix[rowIndex2][colIndex2] = String(node.right.val);
      traverse(node.right, rowIndex2, colIndex2, matrix);
    }
  }
}

function test() {
  const node = {
    val: 1,
    left: {val: 2},
    right: {val: 3},
  };
  console.log(printTree(node));
}

test();

/**
 * 给你一棵二叉树的根节点 root ，请你构造一个下标从 0 开始、大小为 m x n 的字符串矩阵 res ，用以表示树的 格式化布局 。构造此格式化布局矩阵需要遵循以下规则：
 * 树的 高度 为 height ，矩阵的行数 m 应该等于 height + 1 。
 * 矩阵的列数 n 应该等于 2^height - 1 。
 * 根节点 需要放置在 顶行 的 正中间 ，对应位置为 res[0][(n-1)/2] 。
 * 对于放置在矩阵中的每个节点，设对应位置为 res[r][c] ，将其左子节点放置在 res[r+1][c-2^(height-r-1)] ，右子节点放置在 res[r+1][c+2^(height-r-1)] 。
 * 继续这一过程，直到树中的所有节点都妥善放置。
 * 任意空单元格都应该包含空字符串 "" 。
 * 返回构造得到的矩阵 res 。
 *
 * 树中节点数在范围 [1, 2^10] 内
 * -99 <= Node.val <= 99
 * 树的深度在范围 [1, 10] 内
 *
 * 思路：
 * 先算出树的高度h，然后绘制一个arr[h][2^h - 1]的矩阵，全部填充为空字符串
 * 然后从根节点开始遍历树，对于每个节点，拿到它的子节点，然后把子节点存储在对应位置。
 * 根节点需要先存储自身，然后开始这个递归
 * 题目描述有问题，height实际上是树的高度减1，因此计算子节点的时候col坐标要减2
 */