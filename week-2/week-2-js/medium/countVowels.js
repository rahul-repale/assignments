/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').
*/

function countVowels(str) {
    // Your code here
  let arr = str.toLowerCase().split('')
    let count = arr.filter((e) => {
      if(e == 'a' || e == 'e' || e == 'i' || e  == 'o' || e == 'u'){
        return e 
      }
    })
    return count.length
}

module.exports = countVowels;
