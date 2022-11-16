function mergeArr(...arrs) {
  const indexes = new Array(arrs.length).fill(0);
  let canLoop = false;
  arrs.forEach((arr, index) => {
    canLoop = canLoop || indexes[index] < arr.length;
  });
  const merged = [];
  while (canLoop) {
    canLoop = false;
    arrs.forEach((arr, index) => {
      if (indexes[index] < arr.length) {
        merged.push(arr[indexes[index]]);
        indexes[index]++;
        canLoop = canLoop || indexes[index] < arr.length;
      }
    });
  }
  return merged;
}

const arr1 = [1,2];
const arr2 = [3,4];
const arr3 = [5,6];
const arr4 = [7];
const arr5 = [8,9,10,11];
console.log(mergeArr(arr1,arr2,arr3,arr4, arr5));