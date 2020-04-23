# NOTE: 
this is a file for recording funny business and errors we find in this project.

# cant use destructuring arrays to swap array elements, that are a dom array list
this does not work
<!-- const arr = document.getElementsByClassName(`array-bar`)
([arr[0], arr[1]] = [arr[0], arr[1]]) -->
Throws this error: "TypeError: Failed to set an indexed property on 'HTMLCollection': Index property setter is not supported."
* https://stackoverflow.com/questions/46544189/failed-to-set-an-indexed-property-on-filelist-index-property-setter-is-not-su
