/**
 * @param {string} preorder
 * @return {boolean}
 */
var isValidSerialization = function(preorder) {
  /** @type {string[]} */
  const arr = preorder.split(',');
  let result = true;
  // 数组先替换为n + #的字符串组合，n代表数字，#代表空节点
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== '#') {
      arr[i] = 'n';
    }
  }
  let resultStr = arr.join('');
  // 没有精简到结尾时不能退出，只要结果有效也不能退出
  while (resultStr !== '#' && result) {
    // 先验证一下开头字母，它表示根节点
    result = resultStr.charAt(0) === 'n';
    if (result) {
      const newResultStr = resultStr.replace(/n##/g, '#');
      // 如果替换后的两者长度不相同，说明本次有匹配结果和替换，反之则是不能再替换
      result = newResultStr.length !== resultStr.length;
      // 如果还能替换，则迭代字符串
      if (result) {
        resultStr = newResultStr;
      }
    }
  }
  return result;
};

function main() {
  const preorder = '9,3,4,#,#,1,#,#,2,#,6,#,#';
  const r = isValidSerialization(preorder);
  console.log(r);
}

main();

/**
 * 序列化二叉树的一种方法是使用 前序遍历 。当我们遇到一个非空节点时，我们可以记录下这个节点的值。如果它是一个空节点，我们可以使用一个标记值记录，例如 #
 * 给定一串以逗号分隔的序列，验证它是否是正确的二叉树的前序序列化。编写一个在不重构树的条件下的可行算法
 * 保证 每个以逗号分隔的字符或为一个整数或为一个表示 null 指针的 '#'
 * 你可以认为输入格式总是有效的
 * 例如它永远不会包含两个连续的逗号，比如"1,,3"
 * 1 <= preorder.length <= 10^4
 * preorder 由以逗号 “，” 分隔的 [0,100] 范围内的整数和 “#” 组成
 *
 * 思路：
 * 这个题目就是给出一个二叉树完整的前序遍历，即如果当前节点有值，则拼接值，否则拼接#号，这样叶子节点后面一定会拼接2个#号
 * 想了很久，不能重构，所以要找前序的结果的特性，提示是叶子节点后面一定至少跟2个#号。
 * 所以核心点就是把遍历结果，只要遇到数字+#+#组合的，全部替换为#
 * 每次遍历应该是全数组遍历，遇到数字 + # + #的替换，遍历完成后再进入下次递归
 * 然后一次次重复这个过程，即使用递归，直到最后发现不能替换了，就返回。
 * 如果最后能替换，则最后结果一定是一个#，反之就不是
 * 只要这样递归下去不是#的，就一定不是合规的前序结果
 * 整个过程其实就是模拟把两个##用于消除一个叶子节点的过程，叶子节点在被消除时用新的#代替，这样就可以递归了，实际上是循环完成的，性能更好
 */