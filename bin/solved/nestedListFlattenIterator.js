/**
 * @constructor
 * @param {NestedInteger[]} nestedList
 */
var NestedIterator = function(nestedList) {
  this._flattenResult = [];
  nestedList.forEach(obj => {
    flatten(obj, this._flattenResult);
  });
  this._index = -1;
};

/**
 * 把一个嵌套元素（可以是N层嵌套的）直接铺平
 * @param {NestedInteger} obj
 * @param {number[]} flattenResult
 */
function flatten(obj, flattenResult) {
  if (!obj.isInteger() && obj.getList().length > 0) {
    obj.getList().forEach(ele => {
      flatten(ele, flattenResult);
    });
  } else if (obj.isInteger()){
    flattenResult.push(obj.getInteger());
  }
}


/**
 * @this NestedIterator
 * @returns {boolean}
 */
NestedIterator.prototype.hasNext = function() {
  const nextIndex = this._index + 1;
  return nextIndex < this._flattenResult.length;
};

/**
 * @this NestedIterator
 * @returns {integer}
 */
NestedIterator.prototype.next = function() {
  this._index++;
  return this._flattenResult[this._index];
};

/**
 * 给你一个嵌套的整数列表 nestedList 。每个元素要么是一个整数，要么是一个列表；该列表的元素也可能是整数或者是其他列表。请你实现一个迭代器将其扁平化，使之能够遍历这个列表中的所有整数。
 *
 * 实现扁平迭代器类 NestedIterator ：
 *
 * NestedIterator(List<NestedInteger> nestedList) 用嵌套列表 nestedList 初始化迭代器。
 * int next() 返回嵌套列表的下一个整数。
 * boolean hasNext() 如果仍然存在待迭代的整数，返回 true ；否则，返回 false 。
 * 提示：
 * 1 <= nestedList.length <= 500
 * 嵌套列表中的整数值在范围 [-10^6, 10^6] 内
 * 思路：
 * 注意这个东西是可以嵌套的，即它的结构不是二维数组，可以是N维数组
 * 另外注意判断getList的值，不是null，而是空数组，所以还要判断长度
 * 所以先用暴力解，直接在构造的时候铺平，然后判断的时候简单处理
 * 这道题在力扣里面会出现问题，比如一个对象，包含一个空数组，此时它既不是需要继续展开的，也不能直接把值存入扁平集合，比较恶心
 */