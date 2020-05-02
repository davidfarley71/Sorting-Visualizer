let annimations = []

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
            // These are the values that we're comparing; we push them once
            // to change their color.
            annimations.push([i, originalArray])
            // These are the values that we're comparing; we push them a second
            // time to revert their color.
            annimations.push([i, originalArray])
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
    annimations = [];
    quickSort(array)
    return annimations;
}
