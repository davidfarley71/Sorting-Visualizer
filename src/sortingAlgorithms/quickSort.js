var animations = []

function QuickSort(arr, left = 0, right = arr.length - 1) {
  let len = arr.length,
    index

  if (len > 1) {

    index = partition(arr, left, right)

    if (left < index - 1) {
      QuickSort(arr, left, index - 1)
    }
    if (index < right) {
      QuickSort(arr, index, right)
    }
  }
  return arr
}

function partition(arr, left, right) {
  let middle = Math.floor((right + left) / 2)
  let pivot = arr[middle]
  let i = left
  let j = right

  while (i <= j) {
    while (arr[i] < pivot) {
      i++
    }
    while (arr[j] > pivot) {
      j--
    }
    if (i <= j) {
      [arr[i], arr[j]] = [arr[j], arr[i]]  // ES6 destructuring swap
      animations.push([i, j])
      i++
      j--
    }
  }
  return i
}

export function quicksortHelper(arr) {
  QuickSort(arr)
  return animations
}

var items = [5, 3, 7, 6, 2, 9];
console.log(QuickSort(items));
