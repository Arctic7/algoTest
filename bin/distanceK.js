/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {number} k
 * @return {number[]}
 */
var distanceK = function(root, target, k) {
  const path = [];
  fillPath(root, target, path);
  // 先尝试找从根到目标的路径（不含目标自身），如果找不到则视为目标就是根，此时根据k返回结果
  if (path.length === 0) {
    if (k === 0) {
      return [root.val];
    } else {
      // k不为0的时候就是基于根节点找它的后代中距离等于k的
      const result = [];
      findRemoteChildren(root, k, result);
      return result;
    }
  } else {
    // 有距离的时候，分两步，一个是遍历路径，一个是从目标节点开始往下探索
    const result = [];
    findRemoteChildren(target, k, result);
    path.forEach((singlePath, index) => {
      const node = singlePath.node;
      // path是后续存入的，因此最接近目标的父节点最先存入，已走距离当然是1
      const walked = index + 1;
      if (k === walked) {
        result.push(node.val);
      } else if (k > walked) {
        const startNode = singlePath.isLeft ? node.right : node.left;
        findRemoteChildren(startNode, k - walked - 1, result);
      }
    });
    return result;
  }
};

/**
 * @param {TreeNode} root
 * @param {TreeNode} target
 * @param {{node: TreeNode; isLeft: boolean}[]} path
 * @returns {boolean}
 */
function fillPath(root, target, path) {
  if (root && root !== target) {
    const r1 = fillPath(root.left, target, path);
    if (r1) {
      path.push({node: root, isLeft: true});
      return r1;
    } else {
      const r2 = fillPath(root.right, target, path);
      if (r2) {
        path.push({node: root, isLeft: false});
      }
      return r2;
    }
  } else if (root && root === target) {
    return true;
  }
}

/**
 * @param {TreeNode} node
 * @param {number} remainDistance
 * @param {number[]} resultArr
 */
function findRemoteChildren(node, remainDistance, resultArr) {
  if (node && remainDistance === 0) {
    resultArr.push(node.val);
  } else if (node && remainDistance > 0) {
    findRemoteChildren(node.left, remainDistance - 1, resultArr);
    findRemoteChildren(node.right, remainDistance - 1, resultArr);
  }
}

function test() {
  const target = {val: 2, right: {val: 3, right: {val: 4}}};
  const root = {
    val: 0,
    right: {
      val: 1,
      right: target,
    },
  };
  console.log(distanceK(root, root, 2));
}

test();
/**
 * 给定一个二叉树（具有根结点root），一个目标结点target，和一个整数值 k 。
 * 返回到目标结点 target 距离为 k 的所有结点的值的列表。 答案可以以 任何顺序 返回。
 * 节点数在[1, 500]范围内
 * 0 <= Node.val <= 500
 * Node.val中所有值 不同
 * 目标结点target是树上的结点。
 * 0 <= k <= 1000
 * 思路：
 * 分两步考虑，由于所有值都不同，因此目标节点是唯一的
 * 对于目标节点，可以看作以它为原点，往上回溯和继续往下探索，找到移动步数等于固定值的节点
 * 往下探索比较好理解，即DFS遍历找出所有距离它为k的节点
 * 往上探索时，需要拿到从根节点到它的所有节点集合，并且每个节点的路径选择，然后遍历这些节点，除了它自身之外，每个节点的路径选择都要剔除掉到它的选择
 * 然后考虑到另一条路径，以及减去k，剩下的可移动步数。
 * 比如目标的直接父节点，到它的距离是1，目标作为一个分支，后续只能考虑另一个分支，假设有另一个分支，则以这个分支为基点往下探索，能用的距离是k - 2
 */