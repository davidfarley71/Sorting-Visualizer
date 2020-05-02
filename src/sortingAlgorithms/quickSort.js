var animations = []

export function quickSort(originalArray) {
    if (originalArray.length <= 1) {
        return originalArray;
    } else {
        var left = [];
        var right = [];
        var newArray = [];
        var pivot = originalArray.pop();
        var length = originalArray.length;

        for (var i = 0; i < length; i++) {
            animations.push([i, originalArray.length])
            animations.push([i, originalArray.length])
            if (originalArray[i] <= pivot) {
                left.push(originalArray[i]);
                animations.push([i, originalArray[i]]);
            } else {
                right.push(originalArray[i]);
                animations.push([i, originalArray[i]]);
            }
        }
        newArray.concat(quickSort(left), pivot, quickSort(right));
    }
}

export function quickSortHelper(array) {
    animations = [];
    quickSort(array)
    return animations;
}

//quickSortHelper([3, 0, 2, 5, -1, 4, 1]);


