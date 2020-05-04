var animations = []

// export function quickSort(originalArray) {
//     if (originalArray.length <= 1) {
//         return originalArray;
//     } else {
//         var left = [];
//         var right = [];
//         var newArray = [];
//         var pivot = originalArray.pop();
//         var length = originalArray.length;

//         for (var i = 0; i < length; i++) {
//             animations.push([i, originalArray.length])
//             animations.push([i, originalArray.length])
//             if (originalArray[i] <= pivot) {
//                 left.push(originalArray[i]);
//                 animations.push([i, originalArray[i]]);
//             } else {
//                 right.push(originalArray[i]);
//                 animations.push([i, originalArray[i]]);
//             }
//         }
//       return newArray.concat(quickSort(left), pivot, quickSort(right));
//     }
// }

// export function quickSortHelper(array) {
//     animations = [];
//     quickSort(array)
//     return animations;
// }
// export function checker(){
//     console.log(quickSort([3, 0, 2, 5, -1, 4, 1]))
// }







// var items = [5, 3, 7, 6, 2, 9];
// function swap(items, leftIndex, rightIndex) {
//     var temp = items[leftIndex];
//     items[leftIndex] = items[rightIndex];
//     items[rightIndex] = temp;
// }
// function partition(items, left, right) {
//     var pivot = items[Math.floor((right + left) / 2)], //middle element
//         i = left, //left pointer
//         j = right; //right pointer
//     while (i <= j) {
//         while (items[i] < pivot) {
//             i++;
//         }
//         while (items[j] > pivot) {
//             j--;
//         }
//         if (i <= j) {
//             // animations.push([i, j])
//             // animations.push([i, j])
//             animations.push([i, j])
//             swap(items, i, j); //sawpping two elements
//             i++;
//             j--;
//         }
//     }
//     return i;
// }

// export function quickSort(items, left, right) {
//     var index;
//     if (items.length > 1) {
//         index = partition(items, left, right); //index returned from partition
//         if (left < index - 1) { //more elements on the left side of the pivot
//             quickSort(items, left, index - 1);
//         }
//         if (index < right) { //more elements on the right side of the pivot
//             quickSort(items, index, right);
//         }
//     }
//     console.log(items)
//     return animations;
//     //return items;
// }
// // first call to quick sort
// var sortedArray = quickSort(items, 0, items.length - 1);
// console.log(sortedArray); //prints [2,3,5,6,7,9]

// const pivot = (arr, start = 0, end = arr.length + 1) => {
//     const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];
  
//     let pivot = arr[start],
//         pointer = start;
  
//     for (let i = start; i < arr.length; i++) {
//       if (arr[i] < pivot  ) {
//         pointer++;
//         swap(arr, pointer, i);
//       }
//     };
//     swap(arr, start, pointer);
  
//     return pointer;
//   }

//   const quickSort = (arr, start = 0, end = arr.length) => {
//     let pivotIndex = pivot(arr, start, end);
  
//     if (start >= end) return arr;
//     quickSort(arr, start, pivotIndex);
//     quickSort(arr, pivotIndex + 1, end);
  
//     return arr;
//   };
   var items = [5, 3, 7, 6, 2, 9];
//   console.log(quickSort(items));

function QuickSort(arr, left = 0, right = arr.length - 1) {
    let len = arr.length,
        index
  
    if(len > 1) {
  
      index = partition(arr, left, right)
  
      if(left < index - 1) {
        QuickSort(arr, left, index - 1)
      } 
      if(index < right) {
        QuickSort(arr, index, right)
      }
    }
    return arr
  }
  console.log(QuickSort(items));

 export function quicksortHelper(arr){
    QuickSort(arr)
    return animations
  }
  
  function partition(arr, left, right) {
    let middle = Math.floor((right + left) / 2),
        pivot = arr[middle],
        i = left,                 // Start pointer at the first item in the array
        j = right                 // Start pointer at the last item in the array
  
    while(i <= j) {
      while(arr[i] < pivot) {
        i++
      }
      while(arr[j] > pivot) {
        j--
      }
      if(i <= j) {
          
        [arr[i], arr[j]] = [arr[j], arr[i]]  // ES6 destructuring swap
        animations.push([i, j])
        i++
        j--
      }
    }
  
    return i
  
  }