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
 * @param {number[][]} grid
 * @return {Node}
 */
var construct = function(grid) {
  const row = grid.length - 1;
  const col = grid[0].length - 1;
  return buildQuadTree(grid, 0, row, 0, col);
};

/**
 * @param {number[][]} grid
 * @param {number} rowStart 行下标起点，包含
 * @param {number} rowEnd 行下标终点，包含
 * @param {number} colStart 列下标起点，包含
 * @param {number} colEnd 列下标终点，包含
 * @returns {Node}
 */
function buildQuadTree(grid, rowStart, rowEnd, colStart, colEnd) {
  if (rowStart === rowEnd && colStart === colEnd) {
    return {
      val: grid[rowStart][colStart] === 1,
      isLeaf: true,
      topLeft: null,
      topRight: null,
      bottomLeft: null,
      bottomRight: null
    };
  } else {
    let topLeft;
    let topRight;
    let bottomLeft;
    let bottomRight;
    // 0 1 2 3
    const topLeftRow1 = rowStart;
    const topLeftRow2 = Math.floor((rowEnd + rowStart) / 2);
    const topLeftCol1 = colStart;
    const topLeftCol2 = Math.floor((colStart + colEnd) / 2);
    const gridSame1 = isSame(grid, topLeftRow1, topLeftRow2, topLeftCol1, topLeftCol2);
    if (gridSame1) {
      topLeft = {
        val: grid[topLeftRow1][topLeftCol1] === 1, isLeaf: true,
        topLeft: null, topRight: null, bottomLeft: null, bottomRight: null
      };
    } else {
      topLeft = buildQuadTree(grid, topLeftRow1, topLeftRow2, topLeftCol1, topLeftCol2);
    }
    const topRightRow1 = topLeftRow1;
    const topRightRow2 = topLeftRow2;
    const topRightCol1 = topLeftCol2 + 1;
    const topRightCol2 = colEnd;
    const gridSame2 = isSame(grid, topRightRow1, topRightRow2, topRightCol1, topRightCol2);
    if (gridSame2) {
      topRight = {
        val: grid[topRightRow1][topRightCol1] === 1, isLeaf: true,
        topLeft: null, topRight: null, bottomLeft: null, bottomRight: null
      };
    } else {
      topRight = buildQuadTree(grid, topRightRow1, topRightRow2, topRightCol1, topRightCol2);
    }
    const boLeR1 = topLeftRow2 + 1;
    const boLeR2 = rowEnd;
    const boLeC1 = topLeftCol1;
    const boLeC2 = topLeftCol2;
    const gridSame3 = isSame(grid, boLeR1, boLeR2, boLeC1, boLeC2);
    if (gridSame3) {
      bottomLeft = {
        val: grid[boLeR1][boLeC1] === 1, isLeaf: true,
        topLeft: null, topRight: null, bottomLeft: null, bottomRight: null
      };
    } else {
      bottomLeft = buildQuadTree(grid, boLeR1, boLeR2, boLeC1, boLeC2);
    }
    const boRiR1 = topLeftRow2 + 1;
    const boRiR2 = rowEnd;
    const boRiC1 = topRightCol1;
    const boRiC2 = topRightCol2;
    const gridSame4 = isSame(grid, boRiR1, boRiR2, boRiC1, boRiC2);
    if (gridSame4) {
      bottomRight = {
        val: grid[boRiR1][boRiC1] === 1, isLeaf: true,
        topLeft: null, topRight: null, bottomLeft: null, bottomRight: null
      };
    } else {
      bottomRight = buildQuadTree(grid, boRiR1, boRiR2, boRiC1, boRiC2);
    }
    // 最后汇总，判断四个格子是否都是叶子节点
    const allLeaf = topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf;
    const allSameVal = topLeft.val === topRight.val && bottomLeft.val === bottomRight.val && topLeft.val === bottomLeft.val;
    if (allLeaf && allSameVal) {
      return {
        val: grid[rowStart][colStart] === 1, isLeaf: true,
        topLeft: null, topRight: null, bottomLeft: null, bottomRight: null
      };
    } else {
      return {
        val: topLeft.val, isLeaf: false,
        topLeft: topLeft, topRight: topRight, bottomLeft: bottomLeft, bottomRight: bottomRight
      };
    }
  }
}

/**
 * 判断范围内的所有值是否相同
 * @param {number[][]} grid
 * @param {number} rowStart 行下标起点，包含
 * @param {number} rowEnd 行下标终点，包含
 * @param {number} colStart 列下标起点，包含
 * @param {number} colEnd 列下标终点，包含
 * @returns {boolean}
 */
function isSame(grid, rowStart, rowEnd, colStart, colEnd) {
  let val;
  let result = true;
  for (let r = rowStart; r <= rowEnd; r++) {
    for (let c = colStart; c <= colEnd; c++) {
      if (val === undefined) {
        val = grid[r, c];
      } else {
        result = val === grid[r, c];
      }
      if (!result) {
        break;
      }
    }
    if (!result) {
      break;
    }
  }
  return result;
}

function main() {
  const grid = [[0,1],[1,0]];
  console.log(construct(grid));
}

main();

/**
 * 此数据结构一般会用于图像识别，即把一个图像看作是M * N个像素点，然后从中构造四叉树，并分辨像素之间的关系。
 *
 * 给你一个 n * n 矩阵 grid ，矩阵由若干 0 和 1 组成。请你用四叉树表示该矩阵 grid 。
 * 你需要返回能表示矩阵的 四叉树 的根结点。
 * 注意，当 isLeaf 为 False 时，你可以把 True 或者 False 赋值给节点，两种值都会被判题机制 接受 。
 * 四叉树数据结构中，每个内部节点只有四个子节点。此外，每个节点都有两个属性：
 * val：储存叶子结点所代表的区域的值。1 对应 True，0 对应 False；
 * isLeaf: 当这个节点是一个叶子结点时为 True，如果它有 4 个子节点则为 False 。
 * 我们可以按以下步骤为二维区域构建四叉树：
 * 如果当前网格的值相同（即，全为 0 或者全为 1），将 isLeaf 设为 True ，将 val 设为网格相应的值，并将四个子节点都设为 Null 然后停止。
 * 如果当前网格的值不同，将 isLeaf 设为 False， 将 val 设为任意值，然后如下图所示，将当前网格划分为四个子网格。
 * 使用适当的子网格递归每个子节点。
 * n == grid.length == grid[i].length
 * n == 2^x 其中 0 <= x <= 6
 *
 * 思路：
 * 归纳起来是这样理解的：
 * 只考虑N*N的结构，且N一定是2的幂
 * 从大到小把这个网格结构细分为左上，右上，左下，右下
 * 然后对每个细分结构，判断其内部元素的值是否相同，如果相同，就作为一个节点存在，isLeaf = 1
 * 如果不相同，则继续细分，递归这个过程，此时也要构造一个节点，它的值可以是节点任意的值，实际上只能从0或者1中选择，所以此时这个父节点的val不重要，一般会用0表示
 * 到最后把所有的结构细分完成后，返回根节点
 * 注意val是boolean格式，另外四个节点不能少，如果没有，用null表示
 */