import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { quicksortHelper } from '../sortingAlgorithms/quickSort'
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
            title: <h1 className="description">Select a sort!</h1>,
            NUMBER_OF_ARRAY_BARS: 50,
            barHeight: 700,
            disabledSlider: false
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
            AnimationSpeed: params.target.value
        })
    }

    componentDidMount() {
        this.resetArray();
    }

    async resetArray() {
        executing = false
        let array = []
        for (let i = 0; i < this.state.NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, this.state.barHeight));
        }
        this.setState({
            array,
            disabledSlider: false,
            title: <h1 className="description">Select a sort!</h1>
        });
        this.setState({})
        const arrayBars = document.getElementsByClassName('array-bar');
        for (let a = 0; a < arrayBars.length; a++) {
            arrayBars[a].style.backgroundColor = "turquoise"
        }
    }

    async checkExecution() {
        executing = false
        this.setState({ disabledSlider: true })
        await sleep(500)
        executing = true
        console.log('executing: ' + executing)
    }

    async mergeSort() {
        await this.checkExecution()
        this.setState({
            title: (<div className="description">
                <h1 className="title">Merge Sort</h1>
                <p className="explanation">This sort recursively splits the unsorted array in half until it cant anymore. Then it <i>merges</i> all the halves back together in reverse order, sorting as it goes.</p>
                <h3>Worst complexity:O(n*log(n))</h3>
                <h3>Average complexity: O(n*log(n))</h3>
                <h3>Best complexity: O(n*log(n))</h3>
                <h3>Space complexity: O(n) </h3>
            </div>)
        })

        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            if (!executing) {
                this.setState({ disabledSlider: false })
                return
            }
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                await sleep(this.state.AnimationSpeed)
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
            } else {
                await sleep(this.state.AnimationSpeed)
                const [barOneIndex, newHeight] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                barOneStyle.height = `${newHeight}px`;
            }
            if (i === animations.length - 1) this.setState({ disabledSlider: false })
        }
    }

    async selectionSort() {
        await this.checkExecution()
        await sleep(this.state.AnimationSpeed)
        const arr = document.getElementsByClassName('array-bar')
        const len = arr.length

        //displaying a descrition of the type of sort
        this.setState({
            title: (<div className="description">
                <h1 className="title">Selection Sort</h1>
                <p className="explanation">Finds the smallest element in the array, and putts it at the beginning of the array. Its called selection sort because it marks the lowest value on each pass <i>here in purple</i> then when it reaches the end of each loop, the lowest value is "selected" to be swaped to the begining.</p>
                <h3>Color legend</h3>
                Green: Sorted, Grey: Current index being sorted, Yellow: Current scan, Purple: Possible hits
               
                <h3>Worst complexity:O(n^2)</h3>
                <h3>Average complexity: O(n^2)</h3>
                <h3>Best complexity: O(n^2)</h3>
                <h3>Space complexity: O(1) </h3>
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
            let indxOfMin = i;
            //looping through the rest of the array on top of first position
            for (let j = i + 1; j < len; j++) {
                if (!executing) {
                    console.log('got hit')
                    this.setState({ disabledSlider: false })
                    return
                }
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
        this.setState({ disabledSlider: false })
        //returns the array newly sorted
        return
    }

    async quickSort() {
        await this.checkExecution()
        this.setState({
            title: (<div className="description">
                <h1 className="title">Quick Sort</h1>
                <p className="explanation">This sort recursively swaps values on either side of an arbitrary pivot index, in smaller and smaller increments until the whole array is sorted. This sort is the fastest on average, and is therefore considered the fastest sort.</p>
                <h3>Worst complexity:O(n2)</h3>
                <h3>Average complexity: O(n log n)</h3>
                <h3>Best complexity: O(n log n)</h3>
                <h3>Space complexity: O(n) </h3>
            </div>)
        })
        const arrayBars = document.getElementsByClassName('array-bar');
        const animations = quicksortHelper(this.state.array)
        for (let i = 0; i < animations.length; i++) {
            if (!executing) {
                this.setState({ disabledSlider: false })
                return
            }
            console.log('quickSortSwap');
            const [left, right] = animations[i];
            const leftStyle = arrayBars[left].style.height;
            const rightStyle = arrayBars[right].style.height;

            arrayBars[left].style.backgroundColor = 'red';
            arrayBars[right].style.backgroundColor = 'red';

            await sleep(this.state.AnimationSpeed)
            arrayBars[left].style.height = rightStyle;
            arrayBars[right].style.height = leftStyle;
            arrayBars[left].style.backgroundColor = 'turquoise';
            arrayBars[right].style.backgroundColor = 'turquoise';
        }
        this.setState({ disabledSlider: false })
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
            if (right < array_length && input[right] > input[max]) {
                max = right;
            }
            if (max !== i) {
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
            for (var i = Math.floor(array_length / 2); i >= 0; i -= 1) {
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
        this.setState({ disabledSlider: false })
    }

    async insertionSort() {
        await this.checkExecution()
        this.setState({
            title: (<div className="description">
                <h1 className="title">Insertion Sort</h1>
                <p className="explanation">This sort swaps each value backwards until it is less than the value previous, <i>inserting</i> it there. Then it starts over again with the next unsorted value until the array is sorted.</p>
                <h3>Worst complexity:O(n^2)</h3>
                <h3>Average complexity: O(n^2)</h3>
                <h3>Best complexity: O(n)</h3>
                <h3>Space complexity: O(1) </h3>
            </div>)
        })
        var arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 1; i < arrayBars.length; i++) {
            let j = i - 1;
            console.log('outer' + i)
            while (j >= 0 && parseInt(arrayBars[j + 1].style.height) < parseInt(arrayBars[j].style.height)) {
                if (!executing) {
                    this.setState({ disabledSlider: false })
                    return
                }
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
        this.setState({ disabledSlider: false })
    }

    async bubbleSort() {
        await this.checkExecution()
        this.setState({
            title: (<div className="description">
                <h1 className="title">Bubble Sort</h1>
                <p className="explanation">This sort loops through the array, every time it finds a value that is greater than the one previous, it swaps it forward. This <i>bubbles</i> the largest value up the to the top of the array.</p>
                <h3>Worst complexity:O(n^2)</h3>
                <h3>Average complexity: O(n^2)</h3>
                <h3>Best complexity: O(n)</h3>
                <h3>Space complexity: O(1) </h3>
            </div>)
        })
        var arrayBars = document.getElementsByClassName('array-bar');
        for (let i = 0; i < arrayBars.length - 1; i++) {
            let b = 0;
            console.log(`outer loop: ${i}`)
            while (b < arrayBars.length - i - 1) {
                if (!executing) {
                    this.setState({ disabledSlider: false })
                    return
                }
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
        arrayBars[0].style.backgroundColor = 'red'
        this.setState({ disabledSlider: false })
    }

    render() {
        return (
            <div className="gridContainer">
                <div className='display'>
                    {this.state.title}
                    <div className="slide-container">
                        <span className="slider">
                            <h2 className="slider-text barAmount">Size of array to sort: {this.state.NUMBER_OF_ARRAY_BARS}</h2>
                            <input className="slider-input number-of-bars" type="range" min="30" max="200" step="1" disabled={this.state.disabledSlider} value={this.state.NUMBER_OF_ARRAY_BARS} onChange={(e) => { this.barAmount(e) }} />
                        </span>
                        <span className="slider">
                            <h2 className="slider-text barHeight">Height of the array to sort: {this.state.barHeight}</h2>
                            <input className="slider-input height-of-bars" type="range" min="100" max="800" step="1" disabled={this.state.disabledSlider} value={this.state.barHeight} onChange={(e) => { this.barHeight(e) }} />
                        </span>
                        <span className="slider">
                            <h2 className="slider-text animationSpeed">Animation Delay in miliseconds: {this.state.AnimationSpeed}</h2>
                            <input className="slider-input animationSpeed" type="range" min="10" max="500" step="1" disabled={this.state.disabledSlider} value={this.state.AnimationSpeed} onChange={(e) => { this.SetAnimationSpeed(e) }} />
                        </span>
                    </div>

                    <div className="button-container">
                        <button className="generateNewArrayButton" onClick={() => this.resetArray()}>Stop and Generate New Array</button>
                        <button className="button" onClick={() => this.bubbleSort()}>Bubble Sort</button>
                        <button className="button" onClick={() => this.insertionSort()}>insertionSort</button>
                        <button className="button" onClick={() => this.selectionSort()}>selectionSort</button>
                        <button className="button" onClick={() => this.mergeSort()}>Merge Sort</button>
                        <button className="button" onClick={() => this.quickSort()}>Quick Sort</button>
                        {/* <button className="button" onClick={() => this.heapSort()}>Heap Sort</button> */}
                    </div>
                </div>


                <div className="array-container">
                    {this.state.array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                backgroundColor: "turquoise",
                                height: `${value}px`,
                            }}></div>
                    ))}
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
