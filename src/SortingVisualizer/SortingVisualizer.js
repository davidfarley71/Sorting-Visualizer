import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { quicksortHelper, checker, quickSort } from '../sortingAlgorithms/quickSort'
import './SortingVisualizer.css';

// Change this value for the speed of the animations.

let executing = true;

// console.log(slider)
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
            AnimationSpeed: 10,
            title: <h1 className="description">
                Select a sort to get started!
            </h1>,
            NUMBER_OF_ARRAY_BARS: 50,
            barHeight: 700
        }
    }

    async barAmount(params) {
        await this.setState({
            NUMBER_OF_ARRAY_BARS: params.target.value
        })
        this.resetArray()
    }

    async barHeight(params) {
        await this.setState({
            barHeight: params.target.value
        })
        this.resetArray()
    }

    async SetAnimationSpeed(params) {
        console.log(params.target.value)
        await this.setState({
            AnimationSpeed: params.target.value * 5
        })
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        executing = false;
        const array = [];
        for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, this.state.barHeight));
        }
        this.setState({ array });
    }

    async checkExecution() {
        executing = false
        await sleep(500)
        executing = true
        console.log('executing' + executing)
    }

    async mergeSort() {
        await this.checkExecution()
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            if (!executing) return
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * this.state.AnimationSpeed);
            } else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.AnimationSpeed);
            }
        }
    }

    async selectionSort() {
        this.checkExecution()
        await sleep(500)
        const arr = document.getElementsByClassName('array-bar')
        const len = arr.length

        //displaying a descrition of the type of sort
        this.setState({
            title: (<div className="description">
                <p className="title">Selection Sort</p>
                <p className="explanation">Finds the smallest element in the array and putting it at the beginning of the list and then repeating that process on the unsorted remainder of the data.</p>
                <p className="color1">Green: Sorted</p>
                <p className="color2">Grey: Current index being sorted</p>
                <p className="color3">Yellow: Current scan</p>
                <p className="color4">Purple: Possible hits</p>
            </div>)
        })

        //setting up an array deconstructor to swap the places passed in
        const swap = (arr, indx1, indx2) =>
            //array deconstructor to define what will be swapped
            ([arr[indx1].style.height, arr[indx2].style.height] = [arr[indx2].style.height, arr[indx1].style.height])

        //create a loop for the array
        for (let i = 0; i < len; i++) {
            //setting a postion for the index's smallest location
            arr[i].style.backgroundColor = `grey`
            let indxOfMin = i
            //looping through the rest of the array on top of first position
            for (let j = i + 1; j < len; j++) {
                if (!executing) return
                arr[j].style.backgroundColor = `yellow`
                await sleep(5)
                arr[j].style.backgroundColor = PRIMARY_COLOR
                // checking if the next number in the array is less than our current position and if so setting the index equal to that number 
                if (parseInt(arr[j].style.height) < parseInt(arr[indxOfMin].style.height)) {
                    arr[j].style.backgroundColor = `purple`
                    indxOfMin = j
                }
            }

            if (indxOfMin !== i) {
                console.log(`switch hit`)
                swap(arr, indxOfMin, i)
                //await sleep(100)
            }
            arr[i].style.backgroundColor = `green`
        }
        //returns the array newly sorted
        return
    }


    async quickSort() {
        await this.checkExecution()
        const arrayBars = document.getElementsByClassName('array-bar');
        // const animations = quickSortHelper(this.state.array);
        const animations = quicksortHelper(this.state.array)
        console.log(animations)
        for (let i = 0; i < animations.length; i++) {
            if (!executing) return
            console.log('swap');
            const [left, right] = animations[i];
            const leftStyle = arrayBars[left].style.height;
            const rightStyle = arrayBars[right].style.height;

            arrayBars[left].style.height = rightStyle;
            arrayBars[right].style.height = leftStyle;
            await sleep(this.state.AnimationSpeed)
        }
    }


    
    async heapSort() {

        const arr = document.getElementsByClassName('array-bar')
        let array_length = arr.length

        
        /* to create MAX  array */  
        function heap_root(input, i) {
            var left = 2 * i + 1;
            var right = 2 * i + 2;
            var max = i;
        
            if (left < array_length && input[left] > input[max]) {
                max = left;
            }
        
            if (right < array_length && input[right] > input[max])     {
                max = right;
            }
        
            if (max != i) {
                swap(input, i, max);
                heap_root(input, max);
            }
        }
        
        function swap(input, index_A, index_B) {
            var temp = input[index_A];
        
            input[index_A] = input[index_B];
            input[index_B] = temp;
        }
        
        function heapSort(input) {
            
            array_length = input.length;
        
            for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
                heap_root(input, i);
              }
        
            for (i = input.length - 1; i > 0; i--) {
                swap(input, 0, i);
                array_length--;
              
              
                heap_root(input, 0);
            }
        }
        
        
        heapSort(arr);
        console.log(arr);
    }

    async insertionSort() {
        await this.checkExecution()
        var arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 1; i < arrayBars.length; i++) {
            let j = i - 1;
            console.log('outer' + i)
            while (j >= 0 && parseInt(arrayBars[j + 1].style.height) < parseInt(arrayBars[j].style.height)) {
                if (!executing) return
                let temp1 = arrayBars[j + 1].style.height;
                let temp2 = arrayBars[j].style.height;
                arrayBars[j + 1].style.height = temp2;
                arrayBars[j].style.height = temp1;
                arrayBars[j].style.backgroundColor = 'red'
                j -= 1
                await sleep(50)
            }
        }
        arrayBars[arrayBars.length - 1].style.backgroundColor = 'red'
    }

    async bubbleSort() {
        await this.checkExecution()
        var arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length - 1; i++) {
            let b = 0;
            console.log(`outer loop: ${i}`)
            while (b < arrayBars.length - i - 1) {
                if (!executing) return
                console.log(`inner loop: ${b}`)
                if (parseInt(arrayBars[b].style.height) > parseInt(arrayBars[b + 1].style.height)) {
                    let temp1 = arrayBars[b].style.height;
                    let temp2 = arrayBars[b + 1].style.height;
                    arrayBars[b + 1].style.height = temp1;
                    arrayBars[b].style.height = temp2;
                }
                arrayBars[b + 1].style.backgroundColor = SECONDARY_COLOR;
                arrayBars[b].style.backgroundColor = PRIMARY_COLOR;
                await sleep(this.state.AnimationSpeed)
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
            <div className="container">
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
                </div>

                {this.state.title}

                <div className="slide-container">
                    <p className="barAmount">How many bars do you want?</p>
                    <input id="myRange" className="number-of-bars" type="range" min="0" max="100" step="1" defaultValue="50" onChange={(e) => { this.barAmount(e) }} />

                    <p className="barHeight">How high bars do you want?</p>
                    <input id="myRange" className="height-of-bars" type="range" min="0" max="700" step="1" defaultValue="50" onChange={(e) => { this.barHeight(e) }} />
                    <p className="animationSpeed">Animation Speed:</p>
                    <input id="myRange" className="speed-of-animation" type="range" min="100" max="700" step="1" defaultValue="50" onChange={(e) => { this.SetAnimationSpeed(e) }} />
                </div>

                <div className="button-container">
                    <button className="button" onClick={() => this.resetArray()}>Generate New Array</button>
                    <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
                    <button className="button" onClick={() => this.heapSort()}>Heap Sort</button>
                    <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button className="button" onClick={() => this.selectionSort()}>selectionSort</button>
                    <button className="button" onClick={() => this.insertionSort()}>insertionSort</button>
                    <button className="button" onClick={() => this.testSortingAlgorithms()}>
                        Test Sorting Algorithms (BROKEN)
                    </button>
                </div>

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
