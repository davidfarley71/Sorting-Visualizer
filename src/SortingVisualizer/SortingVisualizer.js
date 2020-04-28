import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

let VariableAnimationSpeed = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

// have to promisify the setTimeout Method so we can use it with async await.
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({ array });
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    async selectionSort() {
        const arr = document.getElementsByClassName('array-bar')
        const len = arr.length
        //setting up an array deconstructor to swap the places passed in
        const swap = (arr, indx1, indx2) =>
            //array deconstructor to define what will be swapped
            ([arr[indx1].style.height, arr[indx2].style.height] = [arr[indx2].style.height, arr[indx1].style.height])

        //create a loop for the array
        for (let i = 0; i < len; i++) {
            //setting a postion for the index's smallest location
            let indxOfMin = i
            //looping through the rest of the array on top of first position
            for (let j = i + 1; j < len; j++) {
                // checking if the next number in the array is less than our current position and if so setting the index equal to that number 
                if (parseInt(arr[j].style.height) < parseInt(arr[indxOfMin].style.height)) {
                    arr[indxOfMin].style.backgroundColor = SECONDARY_COLOR
                    arr[i].style.backgroundColor = PRIMARY_COLOR
                    indxOfMin = j
                }
            }
            //if the index isn't less than our current number then we do the switch
            if (indxOfMin !== i) {
                console.log(`switch hit`)
                swap(arr, indxOfMin, i)
                arr[indxOfMin].style.backgroundColor = PRIMARY_COLOR
                arr[i].style.backgroundColor = SECONDARY_COLOR
                await sleep(1000)
            }
        }
        //returns the array newly sorted
        return
    }



    quickSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
    }

    async heapSort() {
        // We leave it as an exercise to the viewer of this code to implement this method.
    }

    async bubbleSort() {
        var arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length - 1; i++) {
            let b = 0;
            console.log(`outer loop: ${i}`)
            while (b < arrayBars.length - i - 1) {
                console.log(`inner loop: ${b}`)
                if (parseInt(arrayBars[b].style.height) > parseInt(arrayBars[b + 1].style.height)) {
                    let temp1 = arrayBars[b].style.height;
                    let temp2 = arrayBars[b + 1].style.height;
                    arrayBars[b + 1].style.height = temp1;
                    arrayBars[b].style.height = temp2;
                }
                arrayBars[b + 1].style.backgroundColor = SECONDARY_COLOR;
                arrayBars[b].style.backgroundColor = PRIMARY_COLOR;
                await sleep(VariableAnimationSpeed)
                ++b;
            }
        };
        arrayBars[0].style.backgroundColor = 'green'
    }




    // NOTE: This method will only work if your sorting algorithms actually return
    // the sorted arrays; if they return the animations (as they currently do), then
    // this method will be broken.
    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const length = randomIntFromInterval(1, 1000);
            for (let i = 0; i < length; i++) {
                array.push(randomIntFromInterval(-1000, 1000));
            }
            const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
        }
    }

    render() {
        const { array } = this.state;

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
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.selectionSort()}>selectionSort</button>
                <button onClick={() => this.testSortingAlgorithms()}>
                    Test Sorting Algorithms (BROKEN)
        </button>
            </div>
        );
    }
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
