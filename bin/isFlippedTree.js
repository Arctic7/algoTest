/**
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var flipEquiv = function(root1, root2) {
  if (root1 && root2) {
    const sameVal = root1.val === root2.val;
    if (sameVal) {
      const leftFlip = flipEquiv(root1.left, root2.right);
      const rightFlip = flipEquiv(root1.right, root2.left);
      if (leftFlip && rightFlip) {
        return true;
      } else {
        const leftNoFlip = flipEquiv(root1.left, root2.left);
        const rightNoFlip = flipEquiv(root1.right, root2.right);
        return leftNoFlip && rightNoFlip;
      }
    } else {
      return false;
    }
  } else {
    // 两个节点都不存在时，返回true，任意一方存在则返回false
    return !(root1 || root2);
  }
};

/**
 * 我们可以为二叉树 T 定义一个翻转操作，选择任意节点，然后交换它的左子树和右子树。
 * 只要经过一定次数的翻转操作后，能使 X 等于 Y，我们就称二叉树X翻转 等价于二叉树Y。
 * 思路：
 * 非常经典的递归思路，如果A树的右子是B树的左子镜像，且A树的左子是B树的右子镜像，则两者就构成翻转
 * 这个逻辑可以一直重复下去
 * 注意，这里的true判断不是完全翻转，部分翻转也可以，比如A树只是把左子和右子交换了，左子和右子本身和B树的对应子相同，也是可以的
 * 所以对于两个根，要判断A左等于B右，和A左等于B左两种情况，以及A右等于B左，或者A右等于B右，但是如果A左等于B左，则只能是A右等于B右
 */