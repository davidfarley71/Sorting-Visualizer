import React, { useState, useRef, useEffect } from "react"


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 310;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';



export default function VisualzeSortHook() {
  const resetArray = function () {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 730));
    }
    return array;
  }
  const [array, setArray] = useState(resetArray());


  const mergeSort = function () {
    // const animations = getMergeSortAnimations(state.array);
    // for (let i = 0; i < animations.length; i++) {
    //   const arrayBars = document.getElementsByClassName('array-bar');
    //   const isColorChange = i % 3 !== 2;
    //   if (isColorChange) {
    //     const [barOneIdx, barTwoIdx] = animations[i];
    //     const barOneStyle = arrayBars[barOneIdx].style;
    //     const barTwoStyle = arrayBars[barTwoIdx].style;
    //     const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    //     setTimeout(() => {
    //       barOneStyle.backgroundColor = color;
    //       barTwoStyle.backgroundColor = color;
    //     }, i * ANIMATION_SPEED_MS);
    //   } else {
    //     setTimeout(() => {
    //       const [barOneIdx, newHeight] = animations[i];
    //       const barOneStyle = arrayBars[barOneIdx].style;
    //       barOneStyle.height = `${newHeight}px`;
    //     }, i * ANIMATION_SPEED_MS);
    //   }
    // }
  }

  const quickSort = function () {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  const heapSort = function () {
    // We leave it as an exercise to the viewer of this code to implement this method.
  }

  const bubbleSort = () => {
    // var arrayBars = document.getElementsByClassName('array-bar');
    // var i = 0;
    // let interval = setInterval(function () {
    //   if (i < arrayBars.length - 1) {
    //     for(var b =0; b< arrayBars.length -i-1; b++){
    //     console.log(arrayBars[b].style.height)
    //     console.log(b);
    //     if (parseInt(arrayBars[b].style.height) < parseInt(arrayBars[b + 1].style.height)) {
    //       let temp1 = arrayBars[b].style.height
    //       let temp2 = arrayBars[b + 1].style.height
    //       arrayBars[b + 1].style.height = temp1
    //       arrayBars[b].style.height = temp2
    //     }
    //   }
    //     i++
    //   } else {
    //     clearInterval(interval)
    //   }
    // }, 10);

    //const update = (newstate) => {  setState({ array: newstate })}


    var arrayBars = array;
    var i = 0;
    var arrayreturn = array;
    let interval = setInterval(() => {

      //  setArray(arrayBars)
      // setArray([5,6,7,8,9,1,2,3,4,5,6,7,8,9,1,2,3,4,5,6,7,8,9])


      if (i < arrayBars.length - 1) {
        for (var b = 0; b < arrayBars.length - i - 1; b++) {
          console.log(arrayBars[b])
          console.log(b);
          if (arrayBars[b] < arrayBars[b + 1]) {
            let temp1 = arrayBars[b]
            let temp2 = arrayBars[b + 1]
            arrayBars[b + 1] = temp1
            arrayBars[b] = temp2
          }

          update(arrayBars)
        }
        i++
      } else {
        clearInterval(interval)
      }
    }, 10);
  }

  const update = function (params) {
    setArray(params)
  }



  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  // const testSortingAlgorithms = function() {
  //   for (let i = 0; i < 100; i++) {
  //     const array = [];
  //     const length = randomIntFromInterval(1, 1000);
  //     for (let i = 0; i < length; i++) {
  //       array.push(randomIntFromInterval(-1000, 1000));
  //     }
  //     const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
  //     const mergeSortedArray = getMergeSortAnimations(array.slice());
  //     console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
  //   }
  // }


  return (
    <div className="array-container">

      {array.map((value, idx) => (
        <div
          className="array-bar"
          key={idx}
          style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${value}px`,
          }}></div>
      ))}
      <div >
        <button className="button" onClick={() => resetArray()}>Generate New Array</button>
        <button className="button" onClick={() => mergeSort()}>Merge Sort</button>
        <button className="button" onClick={() => quickSort()}>Quick Sort</button>
        <button onClick={() => heapSort()}>Heap Sort</button>
        <button onClick={() => bubbleSort()}>Bubble Sort</button>
      </div>
    </div>
  );
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}



function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
