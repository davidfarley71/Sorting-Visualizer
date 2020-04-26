# cant use destructuring arrays to swap array elements, that are a dom array list
The folowing does not work:
<!-- const arr = document.getElementsByClassName(`array-bar`)
([arr[0], arr[1]] = [arr[0], arr[1]]) -->
Throws this error: "TypeError: Failed to set an indexed property on 'HTMLCollection': Index property setter is not supported."
* https://stackoverflow.com/questions/46544189/failed-to-set-an-indexed-property-on-filelist-index-property-setter-is-not-su

# have had some trouble with jsx file extensions
for example, trying to promisify setTimout like this
 <!-- const sleep = ms => new Promise(resolve => setTimeout(resolve, ms)) -->
 works but stops all execution after it runs the first time, took me a long time to figure out the problem because it did not throw an error.
 Switching to a js file fixed it.
