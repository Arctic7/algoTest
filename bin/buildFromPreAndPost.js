/**
 * @param {number[]} preorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var constructFromPrePost = function(preorder, postorder) {
  if (preorder.length > 1) {
    const preorderMap = new Map();
    const postorderMap = new Map();
    fillNodeMap(preorder, preorderMap);
    fillNodeMap(postorder, postorderMap);
    const common = {preorderMap, postorderMap, preorder, postorder};
    return buildChild({
      rootIndex: 0,
      endIndex: preorder.length - 1
    }, {
      rootIndex: preorder.length - 1,
      endIndex: 0
    }, common);
  }
  return {val: preorder[0], left: null, right: null};
};

/**
 * @param {number[]} traverseOrder
 * @param {Map<string, number>} nodeMap
 */
function fillNodeMap(traverseOrder, nodeMap) {
  traverseOrder.forEach((ele, index) => {
    nodeMap.set(String(ele), index);
  });
}

/**
 * @param {{rootIndex: number; endIndex: number}} preIndexObj
 * @param {{rootIndex: number; endIndex: number}} postIndexObj
 * @param {{preorderMap: Map<string, number>; postorderMap: Map<string, number>; preorder: number[]; postorder: number[]}} common
 * @returns {TreeNode | null}
 */
function buildChild(preIndexObj, postIndexObj, common) {
  const preRoot = preIndexObj.rootIndex;
  const preEnd = preIndexObj.endIndex;
  const postRoot = postIndexObj.rootIndex;
  const postEnd = postIndexObj.endIndex;
  const rootVal = common.preorder[preRoot];
  const root = {val: rootVal, left: null, right: null};
  if (preRoot <= preEnd && postRoot >= postEnd) {
    // 算一下前序的范围和后序的范围，两者中小的才是有效的
    const distance = Math.min( preEnd - preRoot, postRoot - postEnd);
    if (distance > 0) {
      const child1Val = common.preorder[preRoot + 1];
      const child2Val = common.postorder[postRoot - 1];
      // 先假设它是双子（后面会判断），拿到所有节点的影响范围
      const child2PreRoot = common.preorderMap.get(String(child2Val));
      const child1PostRoot = common.postorderMap.get(String(child1Val));
      // 然后再判断是不是双子节点，如果是，就会影响第一个节点的取值范围
      const isSingle = child1Val === child2Val;
      // 先把一个子节点的构造处理好
      const child1 = buildChild({
        rootIndex: preRoot + 1,
        endIndex: isSingle ? preEnd : child2PreRoot - 1,
      }, {
        rootIndex: child1PostRoot,
        endIndex: postEnd
      }, common);
      root.left = child1;
      // 另一个节点也要处理了
      if (!isSingle) {
        const child2 = buildChild({
          rootIndex: child2PreRoot,
          endIndex: preEnd
        }, {
          rootIndex: postRoot - 1,
          endIndex: child1PostRoot + 1
        }, common);
        root.right = child2;
      }
    }
    return root;
  } else {
    return null;
  }
}

function test() {
  const preorder = [1,2,3,4,5,6,7];
  const postorder = [2,4,6,7,5,3,1];
  console.log(constructFromPrePost(preorder, postorder));
}

test();


/**
 * 给定两个整数数组，preorder和postorder ，其中preorder是一个具有无重复值的二叉树的前序遍历，postorder 是同一棵树的后序遍历，重构并返回二叉树。
 * 如果存在多个答案，您可以返回其中任何一个。
 * 1 <= preorder.length <= 30
 * 1 <= preorder[i] <= preorder.length
 * preorder中所有值都不同
 * postorder.length == preorder.length
 * 1 <= postorder[i] <= postorder.length
 * postorder中所有值都 不同
 * 保证 preorder和 postorder是同一棵二叉树的前序遍历和后序遍历
 *
 * 思路：
 * 前序结构：根--左子--左子后代--右子--右子后代
 * 后序结构：左子后代--左子--右子后代--右子--根
 * 单子的情况下，前序结构简化为：根--单子--单子后代，后序结构简化为：单子后代--单子--根
 * 步骤：
 * 取得根节点和它在前序，后续的下标
 * 根据子节点的范围，判断根节点是否是叶子节点，如果是，返回叶子节点
 * 如果不是，则前序根的后一个是它的子，后序根的前一个是它的子
 * 构造根节点，并对比这两个子，如果相同，视为左子，如果不同，视为前序的是左子，后序的是右子
 * 递归地构造左子和右子，并且限定它们的取值范围，如果超出这个范围，应该返回null
 * 任何一个子的取值范围是它到兄弟子的区间，或者到数据边界，每次构造子时，它的前序根，前序范围，后序根，后序范围都要传入
 * 最后把构造好的子节点赋值到新的根节点内，返回根节点
 */