/**
 * @param {TreeNode} root
 * @return {number}
 */
var widthOfBinaryTree = function(root) {
  let row = [{node: root, index: 0}];
  let maxWidth = 1;
  while (true) {
    const newRow = [];
    // 索引值负数调整
    let indexAdjust = 0;
    row.forEach((nodeObj, index) => {
      if (index === 0) {
        indexAdjust = 0 - nodeObj.index;
      }
      const node = nodeObj.node;
      const parentIndex = nodeObj.index + indexAdjust;
      if (node.left) {
        newRow.push({
          node: node.left,
          index: parentIndex * 2
        });
      }
      if (node.right) {
        newRow.push({
          node: node.right,
          index: parentIndex * 2 + 1
        });
      }
    });
    const validWidth = getValidLength(newRow);
    if (validWidth > 0) {
      row = newRow;
      maxWidth = Math.max(maxWidth, validWidth);
    } else {
      break;
    }
  }
  return maxWidth;
};

function getValidLength(row) {
  if (row.length === 1) {
    return 1;
  } else if (row.length > 1) {
    const first = row[0].index;
    const last = row[row.length - 1].index;
    return last - first + 1;
  }
  return 0;
}

function test() {
  const node = {val: 1, left: {val: 2}, right: {val: 3}};
  console.log(widthOfBinaryTree(node));
}
test();

/**
 * 给你一棵二叉树的根节点 root ，返回树的 最大宽度 。
 * 树的 最大宽度 是所有层中最大的 宽度 。
 * 每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的 null 节点，这些 null 节点也计入长度。
 * 题目数据保证答案将会在 32 位 带符号整数范围内。
 * 树中节点的数目范围是 [1, 3000]
 *
 * 思路：
 * BFS遍历，但是空节点也要存下来，记为null，一个null节点如果被遍历到的，它的左子和右子都是null，也要存入
 * 然后对每层结果，从双指针开始，计算左边第一个不为null的下标，和右边第一个不为null的下标，得出宽度
 * 最后每层宽度对比，得出最大宽度
 * 实际用BFS会出现内存溢出的问题，所以每次只能保存上一行的所有节点，但是这样还是会内存溢出，所以不能无限制地存储null，需要改变思路
 * 每个父节点指定它在当前层的索引i，它的左子索引是2i，右子索引是2i + 1，只记录非空节点
 * 实际取值还会遇到index过大导致的问题，解决办法是对每行第一个节点的parentIndex值纠正为0，由于每行的所有节点相对位置是确定的，这种纠正不会影响他们的距离计算和子元素距离计算
 */