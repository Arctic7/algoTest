import '../../typedef/TreeNode.js';

/**
 * @param {TreeNode} root
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function(root) {
  if (!root.left && !root.right) {
    return [];
  } else {
    const dupMap = new Map();
    const results = [];
    serializeAndTraverse(root.left, '', dupMap, results);
    serializeAndTraverse(root.right, '', dupMap, results);
    return results;
  }
};

/**
 * @param {TreeNode} node
 * @param {string} str
 * @param {Map<string, boolean>} dupMap
 * @param {TreeNode[]} results
 * @returns {string}
 */
function serializeAndTraverse(node, str, dupMap, results) {
  if (node) {
    str = str + '-' + String(node.val);
    str = str + '-' + serializeAndTraverse(node.left, '', dupMap, results);
    str = str + '-' + serializeAndTraverse(node.right, '', dupMap, results);
    // last, put serialize to map
    const result = dupMap.get(str);
    if (result === undefined) {
      dupMap.set(str, false);
    } else if (result === false) {
      dupMap.set(str, true);
      results.push(node);
    }
  } else {
    str = str + '-x';
  }
  return str;
}

function main() {
  const node = {val: 0, left: {val: 0}, right: {val: 0}};
  const results = findDuplicateSubtrees(node);
  console.log(results);
}

main();


/**
 * 给定一棵二叉树 root，返回所有重复的子树。
 * 对于同一类的重复子树，你只需要返回其中任意一棵的根结点即可。
 * 如果两棵树具有相同的结构和相同的结点值，则它们是重复的。
 * 树中的结点数在[1,10^4]范围内。
 * -200 <= Node.val <= 200
 * 思路：
 * 子树的意思是取一个节点，然后把它和它所有的子节点看作一个整体，所以根节点不存在子树，因为它的所有节点组成的整体就是树本身
 * 子树的最高根节点只能是根左或者根右
 * 此题的关键是，如果两个子树相同，则子树内部依然要继续找更小的子树比较是否相同，因此很恶心
 * 所以最好的办法就是获取一个节点的所有子树的序列化结果，并存入map集合，最后比较map集合是否存在相同的序列化结果，如果存在则把这个节点存入最后结果
 * 需要注意的是节点的序列化不能跳过空枝，且序列化的字符串拼接要加分隔符，不然会出现1-11和11-1判定为相同的情况
 * 遍历顺序建议用前序根左右
 */

