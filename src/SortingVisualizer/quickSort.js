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
  animations=[]
  QuickSort(arr)
  return animations
}

// var testArray = [ 260, 255, 250, 245, 240, 235, 230, 225, 220, 215, 210, 205, 200, 195, 190, 185, 180, 175, 170, 165, 160, 155, 150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20, 15, 10, 5, 500, 495, 490, 485, 480, 475, 470, 465, 460, 455, 450, 445, 440, 435, 430, 425, 420, 415, 410, 405, 400, 395, 390, 385, 380, 375, 370, 365, 360, 355, 350, 345, 340, 335, 330, 325, 320, 315, 310, 305, 300, 295, 290, 285, 280, 275, 270, 265];
// console.log(QuickSort(testArray));
